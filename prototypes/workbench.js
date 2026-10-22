(() => {
  'use strict';
  const root=document.querySelector('.lab');
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
  }
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>changeMode(tab.dataset.mode,false));
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
  const episodes=[
    {name:'从代码开始',text:'示例记录：编辑器窗口、项目资源与时间范围。只显示元数据，不含任何文件正文。',resource:'RESOURCE / PROJECT'},
    {name:'打开参考资料',text:'示例记录：浏览器出现某个公开文档的资源标识。不会记录页面截图或所输入的内容。',resource:'RESOURCE / URL'},
    {name:'运行基本检查',text:'示例记录：终端窗口及一个工作时间片段。实际的完整命令、输出与终端文字不在此演示中采集。',resource:'RESOURCE / SESSION'}
  ];
  const episodesButtons=[...document.querySelectorAll('.episode')];
  function selectEpisode(n){
    episodesButtons.forEach((b,i)=>{const active=i===n;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
    document.querySelector('#episode-no').textContent=String(n+1).padStart(2,'0')+' / 03';
    document.querySelector('#episode-title').textContent=episodes[n].name;
    document.querySelector('#episode-description').textContent=episodes[n].text;
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
    link1.setAttribute('x2',middle.x);link1.setAttribute('y2',middle.y);
    link2.setAttribute('x1',middle.x);link2.setAttribute('y1',middle.y);
    link2.setAttribute('x2',tip.x);link2.setAttribute('y2',tip.y);
    for(const x of [joint,jointDot]){x.setAttribute('cx',middle.x);x.setAttribute('cy',middle.y)}
    for(const x of [endpoint,endDot]){x.setAttribute('cx',tip.x);x.setAttribute('cy',tip.y)}
    document.querySelector('#shoulder-value').textContent=shoulder.value+'°';
    document.querySelector('#elbow-value').textContent=elbow.value+'°';
    tipCoord.textContent='X: '+Math.round(tip.x-base.x)+' / Y: '+Math.round(base.y-tip.y);
    endpoint.setAttribute('aria-valuenow',shoulder.value);
    endpoint.setAttribute('aria-valuetext','肩关节 '+shoulder.value+' 度，肘关节 '+elbow.value+' 度');
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
})();
