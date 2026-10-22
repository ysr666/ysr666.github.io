(() => {
  'use strict';
  const translation=window.WORKBENCH_TRANSLATIONS||{};
  const attributeTranslation=window.WORKBENCH_ATTRIBUTES||{};
  let language='zh';
  const tr=(value)=>{
    if(language==='zh')return value;
    if(translation[value])return translation[value];
    let m;
    if((m=/^观察点 (\d+)%, (\d+)%$/.exec(value)))return 'Observation '+m[1]+'%, '+m[2]+'%';
    if((m=/^抵达演示目标 · (.+)$/.exec(value)))return 'Moved to demo target · '+m[1];
    if((m=/^调整关节 · (.+)$/.exec(value)))return 'Adjusted joints · '+m[1];
    if((m=/^来自观察坐标 (\d+)% \/ (\d+)% 的演示目标已标出。/.exec(value)))return 'A synthetic target is marked from the observation at '+m[1]+'% / '+m[2]+'%. Select “Move to observed point” to try the inverse kinematics. These coordinate spaces are NOT physically calibrated.';
    return value;
  };

  const root=document.querySelector('.lab');
  const atlas=document.querySelector('.hero-assembly');
  const tabs=[...document.querySelectorAll('.module-tab')];
  const panels={see:document.querySelector('#panel-see'),memory:document.querySelector('#panel-memory'),motion:document.querySelector('#panel-motion')};
  const labels={see:'MODE 01 / OBSERVE',memory:'MODE 02 / RETAIN',motion:'MODE 03 / MOVE'};
  const footer=document.querySelector('#active-label');
  let mode='see';
  function changeMode(key,focus) {
    if(!panels[key])return;
    mode=key;
    tabs.forEach(tab=>{
      const active=tab.dataset.mode===key;
      tab.setAttribute('aria-selected',String(active));
      tab.tabIndex=active?0:-1;
      if(active&&focus)tab.focus();
    });
    Object.keys(panels).forEach(name=>{panels[name].hidden=name!==key});
    footer.textContent=labels[key];
    root.dataset.mode=key;
    if(atlas)atlas.dataset.mode=key;
  }
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>{changeMode(tab.dataset.mode,false);root.scrollIntoView({block:'start',behavior:'instant'});});
    tab.addEventListener('keydown',event=>{
      const k=event.key;
      let offset=k==='ArrowRight'?1:k==='ArrowLeft'?-1:k==='Home'?-i:k==='End'?tabs.length-i-1:0;
      if(k==='ArrowRight'||k==='ArrowLeft'||k==='Home'||k==='End'){
        event.preventDefault();changeMode(tabs[(i+offset+tabs.length)%tabs.length].dataset.mode,true);
      }
    });
  });
  changeMode('see',false);

  // OBSERVE: local image crop / coordinate demonstration, never claiming to call ML.
  const frame=document.querySelector('.vision-frame');
  const scanner=document.querySelector('#vision-scanner');
  const zoom=document.querySelector('#vision-zoom');
  const coord=document.querySelector('#vision-coord');
  function inspect(event){
    const r=frame.getBoundingClientRect();
    const x=Math.min(1,Math.max(0,(event.clientX-r.left)/r.width));
    const y=Math.min(1,Math.max(0,(event.clientY-r.top)/r.height));
    const halfX=Math.min(r.width-72,Math.max(72,x*r.width));
    const halfY=Math.min(r.height-52,Math.max(52,y*r.height));
    scanner.style.left=halfX+'px';scanner.style.top=halfY+'px';
    zoom.style.backgroundPosition=(x*100).toFixed(1)+'% '+(y*100).toFixed(1)+'%';
    coord.textContent='X: '+Math.round(x*100)+'% / Y: '+Math.round(y*100)+'%';
  }
  frame.addEventListener('pointermove',inspect);
  frame.addEventListener('pointerdown',inspect);

  // REMEMBER: synthetic example sequence with explicit project/resource metadata only.
  let selectedEpisode=0;
  const episodes=[
    {name:'从代码开始',text:'示例记录：编辑器窗口、项目资源与时间范围。只显示元数据，不含任何文件正文。',resource:'RESOURCE / PROJECT'},
    {name:'打开参考资料',text:'示例记录：浏览器出现某个公开文档的资源标识。不会记录页面截图或所输入的内容。',resource:'RESOURCE / URL'},
    {name:'运行基本检查',text:'示例记录：终端窗口及一个工作时间片段。实际的完整命令、输出与终端文字不在此演示中采集。',resource:'RESOURCE / SESSION'}
  ];
  const episodesButtons=[...document.querySelectorAll('.episode')];
  function selectEpisode(n){
    selectedEpisode=n;
    document.querySelectorAll('.atlas-memory-led').forEach((led,i)=>{
      led.setAttribute('fill',i===n?'#eaff83':'#786bca');
      led.setAttribute('r',i===n?'8':'6');
    });
    episodesButtons.forEach((b,i)=>{const active=i===n;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
    document.querySelector('#episode-no').textContent=String(n+1).padStart(2,'0')+' / 03';
    document.querySelector('#episode-title').textContent=tr(episodes[n].name);
    document.querySelector('#episode-description').textContent=tr(episodes[n].text);
    document.querySelector('#episode-resource').textContent=episodes[n].resource;
  }
  episodesButtons.forEach((b,i)=>b.addEventListener('click',()=>selectEpisode(i)));
  selectEpisode(0);

  // MOTION: planar two-link forward and inverse kinematics.
  // Motion of a two-link graphic is NOT a CAD simulation or a tested real robotic arm.
  const svg=document.querySelector('#arm-svg');
  const shoulder=document.querySelector('#shoulder');
  const elbow=document.querySelector('#elbow');
  const link1=document.querySelector('#arm-link-1'),link2=document.querySelector('#arm-link-2');
  const joint=document.querySelector('#joint-2'),jointDot=document.querySelector('#joint-2-center');
  const endpoint=document.querySelector('#arm-end'),endDot=document.querySelector('#arm-end-dot');
  const trail=document.querySelector('#motion-trail'),tipCoord=document.querySelector('#tip-coord');
  const base={x:154,y:298}, lengths=[154,127];
  const rad=Math.PI/180;
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  const history=[];
  function updateArm(shouldRecord){
    const a=Number(shoulder.value)*rad;
    const b=Number(elbow.value)*rad;
    const middle={x:base.x+lengths[0]*Math.cos(a),y:base.y-lengths[0]*Math.sin(a)};
    const tip={x:middle.x+lengths[1]*Math.cos(a+b),y:middle.y-lengths[1]*Math.sin(a+b)};
    // Artistic exploded-view coordinates, connected to real planar kinematics.
    const project=(v)=>({x:255+(v.x-base.x)*.36,y:255+(v.y-base.y)*.36});
    const atMiddle=project(middle),atTip=project(tip);
    const a1=document.querySelector('#atlas-arm1'),a2=document.querySelector('#atlas-arm2');
    if(a1&&a2){
      a1.setAttribute('x2',atMiddle.x);a1.setAttribute('y2',atMiddle.y);
      a2.setAttribute('x1',atMiddle.x);a2.setAttribute('y1',atMiddle.y);
      a2.setAttribute('x2',atTip.x);a2.setAttribute('y2',atTip.y);
      for(const x of [document.querySelector('#atlas-joint'),document.querySelector('#atlas-tip')]){
        const pt=x.id==='atlas-joint'?atMiddle:atTip;
        x.setAttribute('cx',pt.x);x.setAttribute('cy',pt.y);
      }
    }
    link1.setAttribute('x2',middle.x);link1.setAttribute('y2',middle.y);
    link2.setAttribute('x1',middle.x);link2.setAttribute('y1',middle.y);
    link2.setAttribute('x2',tip.x);link2.setAttribute('y2',tip.y);
    for(const x of [joint,jointDot]){x.setAttribute('cx',middle.x);x.setAttribute('cy',middle.y)}
    for(const x of [endpoint,endDot]){x.setAttribute('cx',tip.x);x.setAttribute('cy',tip.y)}
    document.querySelector('#shoulder-value').textContent=shoulder.value+'°';
    document.querySelector('#elbow-value').textContent=elbow.value+'°';
    tipCoord.textContent='X: '+Math.round(tip.x-base.x)+' / Y: '+Math.round(base.y-tip.y);
    endpoint.setAttribute('aria-valuenow',shoulder.value);
    endpoint.setAttribute('aria-valuetext',language==='en'?'Shoulder '+shoulder.value+' degrees, elbow '+elbow.value+' degrees':'肩关节 '+shoulder.value+' 度，肘关节 '+elbow.value+' 度');
    if(shouldRecord){
      if(!history.length||Math.hypot(history[history.length-1].x-tip.x,history[history.length-1].y-tip.y)>8){
        history.push(tip);if(history.length>32)history.shift();
      }
      trail.setAttribute('d',history.map((p,i)=>(i===0?'M':'L')+p.x.toFixed(1)+' '+p.y.toFixed(1)).join(' '));
    }
  }
  function dragTip(e){
    const r=svg.getBoundingClientRect();
    // SVG viewBox transforms can preserve aspect ratio; DOMPoint handles the actual CTM.
    const pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;
    const local=pt.matrixTransform(svg.getScreenCTM().inverse());
    const dx=local.x-base.x,dy=base.y-local.y;
    const distance=Math.max(0.01,Math.hypot(dx,dy));
    const c=clamp((distance*distance-lengths[0]*lengths[0]-lengths[1]*lengths[1])/(2*lengths[0]*lengths[1]),-1,1);
    const nextElbow=Math.acos(c);
    const nextShoulder=Math.atan2(dy,dx)-Math.atan2(lengths[1]*Math.sin(nextElbow),lengths[0]+lengths[1]*Math.cos(nextElbow));
    shoulder.value=String(Math.round(clamp(nextShoulder/rad,-70,110)));
    elbow.value=String(Math.round(clamp(nextElbow/rad,0,155)));
    updateArm(true);
  }
  for(const input of [shoulder,elbow])input.addEventListener('input',()=>updateArm(true));
  let isDragging=false;
  endpoint.addEventListener('pointerdown',e=>{isDragging=true;endpoint.setPointerCapture(e.pointerId);e.preventDefault();dragTip(e)});
  endpoint.addEventListener('pointermove',e=>{if(isDragging)dragTip(e)});
  endpoint.addEventListener('pointerup',()=>{isDragging=false});
  endpoint.addEventListener('pointercancel',()=>{isDragging=false});
  svg.addEventListener('pointerdown',e=>{if(e.target===endpoint)return;isDragging=true;svg.setPointerCapture(e.pointerId);dragTip(e)});
  svg.addEventListener('pointermove',e=>{if(isDragging&&e.target!==endpoint)dragTip(e)});
  svg.addEventListener('pointerup',()=>{isDragging=false});
  svg.addEventListener('pointercancel',()=>{isDragging=false});
  endpoint.addEventListener('keydown',e=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;
    e.preventDefault();
    if(e.key==='ArrowLeft')shoulder.value=String(clamp(Number(shoulder.value)-3,-70,110));
    if(e.key==='ArrowRight')shoulder.value=String(clamp(Number(shoulder.value)+3,-70,110));
    if(e.key==='ArrowUp')elbow.value=String(clamp(Number(elbow.value)+3,0,155));
    if(e.key==='ArrowDown')elbow.value=String(clamp(Number(elbow.value)-3,0,155));
    updateArm(true);
  });
  document.querySelector('#arm-reset').addEventListener('click',()=>{shoulder.value='25';elbow.value='65';history.length=0;trail.setAttribute('d','');updateArm(true)});
  updateArm(true);
  // ASSEMBLY TRACE: a local, transient interaction history, never a computer activity log.
  const tape=document.querySelector('#session-tape');
  const trace=[];
  let observation=null;
  let keyboardPoint={x:.5,y:.5};
  function renderTape(){
    tape.replaceChildren();
    if(!trace.length){
      const li=document.createElement('li');
      li.className='trace-empty';
      li.textContent=tr('还没有操作。试着点一次图像，或拖动机械臂。');
      tape.append(li);
      return;
    }
    for(const item of trace){
      const li=document.createElement('li');
      const btn=document.createElement('button');
      btn.type='button';
      const token=document.createElement('b');token.textContent=item.kind;
      btn.append(token,document.createTextNode(' '+tr(item.label)));
      btn.setAttribute('aria-label',(language==='en'?'Replay: ':'回看：')+tr(item.label));
      btn.addEventListener('click',item.restore);
      li.append(btn);tape.append(li);
    }
  }
  function record(kind,label,restore){
    trace.unshift({kind,label,restore});
    if(trace.length>6)trace.length=6;
    renderTape();
  }
  const target=document.createElementNS('http://www.w3.org/2000/svg','circle');
  target.setAttribute('r','12');
  target.setAttribute('fill','none');
  target.setAttribute('stroke','#ff947d');
  target.setAttribute('stroke-dasharray','3 4');
  target.setAttribute('stroke-width','4');
  target.setAttribute('pointer-events','none');
  target.hidden=true;
  target.setAttribute('visibility','hidden');
  svg.append(target);
  const linkedHint=document.querySelector('#linked-hint');
  const moveButton=document.querySelector('#move-to-observation');
  let targetPt=null;
  function setObservation(x,y){
    observation={x:clamp(x,0,1),y:clamp(y,0,1)};
    const atlasEye=document.querySelector('#atlas-eye-reticle');
    if(atlasEye){
      atlasEye.setAttribute('cx',102+(observation.x-.5)*48);
      atlasEye.setAttribute('cy',110+(observation.y-.5)*48);
    }
    keyboardPoint=observation;
    const r=frame.getBoundingClientRect();
    inspect({clientX:r.left+observation.x*r.width,clientY:r.top+observation.y*r.height});
    // An illustrative mapping between two unrelated normalized coordinate spaces.
    // This is emphatically not an image-to-robot calibration.
    let dx=35+185*observation.x, dy=55+115*observation.y;
    let d=Math.hypot(dx,dy);
    const dMin=74,dMax=269;
    if(d<dMin||d>dMax){const scale=clamp(d,dMin,dMax)/d;dx*=scale;dy*=scale}
    targetPt={x:base.x+dx,y:base.y-dy};
    target.setAttribute('cx',targetPt.x);target.setAttribute('cy',targetPt.y);
    target.setAttribute('visibility','visible');
    linkedHint.textContent=tr('来自观察坐标 '+Math.round(observation.x*100)+'% / '+Math.round(observation.y*100)+'% 的演示目标已标出。点击「前往观察点」，通过逆运动学尝试抵达。两种坐标系没有实际物理标定。');
    moveButton.disabled=false;
  }
  function aimAt(x,y){
    const dx=x-base.x,dy=base.y-y;
    const d=Math.hypot(dx,dy);
    const cosine=clamp((d*d-lengths[0]*lengths[0]-lengths[1]*lengths[1])/(2*lengths[0]*lengths[1]),-1,1);
    const jointAngle=Math.acos(cosine);
    const baseAngle=Math.atan2(dy,dx)-Math.atan2(lengths[1]*Math.sin(jointAngle),lengths[0]+lengths[1]*Math.cos(jointAngle));
    shoulder.value=String(Math.round(clamp(baseAngle/rad,-70,110)));
    elbow.value=String(Math.round(clamp(jointAngle/rad,0,155)));
    updateArm(true);
  }
  function commitObservation(x,y){
    setObservation(x,y);
    const x0=observation.x,y0=observation.y;
    record('01 / SEE','观察点 '+Math.round(x0*100)+'%, '+Math.round(y0*100)+'%',()=>{
      setObservation(x0,y0);changeMode('see',false);
    });
  }
  frame.setAttribute('tabindex','0');
  frame.setAttribute('role','button');
  frame.setAttribute('aria-label','点击选择观察点。按方向键移动观察点，按回车确定，随后可在运动模块访问该模拟目标。');
  frame.addEventListener('pointerup',e=>{
    const r=frame.getBoundingClientRect();
    commitObservation((e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height);
  });
  frame.addEventListener('keydown',e=>{
    const arrow={ArrowLeft:[-.05,0],ArrowRight:[.05,0],ArrowUp:[0,-.05],ArrowDown:[0,.05]}[e.key];
    if(arrow){e.preventDefault();keyboardPoint={x:clamp(keyboardPoint.x+arrow[0],0,1),y:clamp(keyboardPoint.y+arrow[1],0,1)};const r=frame.getBoundingClientRect();inspect({clientX:r.left+keyboardPoint.x*r.width,clientY:r.top+keyboardPoint.y*r.height});}
    if(e.key==='Enter'||e.key===' '){e.preventDefault();commitObservation(keyboardPoint.x,keyboardPoint.y)}
  });
  moveButton.addEventListener('click',()=>{
    if(!targetPt)return;
    aimAt(targetPt.x,targetPt.y);
    const a=shoulder.value,b=elbow.value;
    record('03 / MOVE','抵达演示目标 · '+a+'° / '+b+'°',()=>{
      changeMode('motion',false);shoulder.value=a;elbow.value=b;updateArm(true);
    });
  });
  function rememberAngles(){
    const a=shoulder.value,b=elbow.value;
    record('03 / MOVE','调整关节 · '+a+'° / '+b+'°',()=>{
      changeMode('motion',false);shoulder.value=a;elbow.value=b;updateArm(true);
    });
  }
  for(const control of [shoulder,elbow])control.addEventListener('change',rememberAngles);
  svg.addEventListener('pointerup',rememberAngles);
  episodesButtons.forEach((btn,i)=>btn.addEventListener('click',()=>{
    record('02 / NOTE',['编辑器示例','浏览器示例','终端示例'][i],()=>{
      changeMode('memory',false);selectEpisode(i);
    });
  }));
  document.querySelector('#arm-reset').addEventListener('click',()=>{
    record('03 / MOVE','机械臂复位',()=>{
      changeMode('motion',false);shoulder.value='25';elbow.value='65';updateArm(true);
    });
  });

  // Toggle language without changing project links, demo state, or the actual Chinese name.
  const originalTexts=[];
  const treeWalker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT);
  while(treeWalker.nextNode()){
    const node=treeWalker.currentNode,raw=node.nodeValue,key=raw.trim();
    if(translation[key]&&node.parentElement&&!['SCRIPT','STYLE'].includes(node.parentElement.tagName)){
      originalTexts.push([node,raw]);
    }
  }
  const originalAttrs=[];
  for(const element of document.querySelectorAll('[aria-label], [alt], meta[content]')){
    for(const name of ['aria-label','alt','content']){
      const original=element.getAttribute(name);
      if(original&&attributeTranslation[original])originalAttrs.push([element,name,original]);
    }
  }
  function setLanguage(next){
    language=next==='en'?'en':'zh';
    document.documentElement.lang=language==='en'?'en':'zh-CN';
    document.body.dataset.lang=language;
    for(const [node,source] of originalTexts){
      const word=source.trim();
      node.nodeValue=language==='en'?source.replace(word,translation[word]):source;
    }
    for(const [element,name,source] of originalAttrs)element.setAttribute(name,language==='en'?attributeTranslation[source]:source);
    const toggle=document.querySelector('#lang-switch');
    toggle.textContent=language==='en'?'中':'EN';
    toggle.setAttribute('aria-label',language==='en'?'切换到中文':'Switch to English');
    toggle.setAttribute('title',language==='en'?'切换到中文':'Switch to English');
    document.title=language==='en'?'Shirui Ye / Assembly Log 018':'叶石瑞 / Shirui Ye · 装配记录 018';
    selectEpisode(selectedEpisode);
    if(observation)setObservation(observation.x,observation.y);
    else linkedHint.textContent=tr('尚未观察图像。先去「看见」点选坐标，再来这里尝试让机械臂前往对应的演示目标。');
    updateArm(false);
    renderTape();
  }
  document.querySelector('#lang-switch').addEventListener('click',()=>setLanguage(language==='en'?'zh':'en'));
  setLanguage('zh');
})();
