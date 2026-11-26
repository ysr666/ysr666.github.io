(() => {
'use strict';
const roots=[...document.querySelectorAll('[data-archive]')];
const t=(zh,en)=>({zh,en});
function mount(root){
const kind=root.dataset.archive;
if(!['music','travel'].includes(kind))return Promise.resolve();
let lang=document.documentElement.lang==='en'?'en':'zh';
function localize(el,value){if(!value)return el;if(typeof value==='string'){el.textContent=value;return el;}el.dataset.zh=value.zh;el.dataset.en=value.en;el.textContent=value[lang]||value.zh;return el;}
function node(tag,cls,value){const el=document.createElement(tag);if(cls)el.className=cls;return localize(el,value);}
function translate(){root.querySelectorAll('[data-zh][data-en]').forEach(el=>el.textContent=el.dataset[lang]);root.querySelectorAll('[data-alt-zh][data-alt-en]').forEach(el=>el.alt=el.dataset[lang==='zh'?'altZh':'altEn']);root.querySelectorAll('[data-placeholder-zh]').forEach(el=>{el.placeholder=el.dataset[lang==='zh'?'placeholderZh':'placeholderEn'];el.setAttribute('aria-label',el.dataset[lang==='zh'?'labelZh':'labelEn']);});}
document.addEventListener('portfolio:language',e=>{lang=e.detail==='en'?'en':'zh';translate();});
function svgEl(tag,attrs={}){const e=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,String(v));return e;}
function sectionHeader(title,detail){const h=node('div','atlas-header');h.append(node('h2','',title),node('p','',detail));return h;}
function featured(data,stageRecords){
 const section=node('section','featured-works');section.id='music-featured';
 const main=node('div','featured-grid');const rest=node('div','featured-list');
 const dialog=node('dialog','work-dialog');dialog.setAttribute('aria-labelledby','work-dialog-title');
 const panel=node('div','work-dialog-panel');dialog.append(panel);
 let returnFocus=null;
 dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=panel.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 function openWork(r,trigger){
   returnFocus=trigger;panel.replaceChildren();
   const close=node('button','work-close',t('关闭 ×','Close ×'));close.type='button';close.addEventListener('click',()=>dialog.close());
   const top=node('div','work-dialog-top');
   const title=node('h2','',r.title);title.id='work-dialog-title';
   const otherTitle=node('p','work-other-title',t(r.title.en,r.title.zh));
   if(r.title.en===r.title.zh)otherTitle.hidden=true;
   top.append(node('p','work-eyebrow',r.context||r.subtitle),title,otherTitle);
   panel.append(close,top,node('p','work-version',r.subtitle));
   if(r.performances?.length){const list=node('div','work-performances');for(const performance of r.performances){const row=node('div','work-performance');row.append(node('h3','',performance.title),node('p','',performance.subtitle),node('p','',performance.detail));list.append(row);}panel.append(list);}
   if(r.tracks?.length){
     const list=node('ul','work-tracks');for(const track of r.tracks)list.append(node('li','',track));
     panel.append(node('h3','work-track-heading',t('收藏唱段','Selected recordings')),list);
   }
   panel.append(node('p','work-detail-note',['westend','lesmis','phantom'].includes(r.style)?t('伦敦西区剧场记忆与音乐收藏。','A West End theatre memory and listening collection.'):t('音乐收藏中的一部作品；不代表现场观看记录。','A work from the collection; not a claim of live attendance.')));
   translate();dialog.showModal();document.body.classList.add('dialog-open');close.focus();
 }
 function makeCard(r,primary){
   const article=node('article',primary?'feature-work feature-'+r.style:'feature-row');
   const btn=node('button',primary?'feature-button':'feature-row-button');btn.type='button';btn.setAttribute('aria-haspopup','dialog');
   const body=node('div','feature-body');
   if(primary)body.append(node('span','feature-kicker',r.context||r.subtitle));
   const title=node('span','feature-title',r.title);
   const subtitle=node('span','feature-subtitle',primary?t(r.title.en,r.title.zh):r.subtitle);
   if(primary&&r.title.zh===r.title.en)subtitle.hidden=true;
   body.append(title,subtitle);
   if(primary&&r.performances?.length)body.append(node('span','feature-tracks',t(r.performances.map(p=>p.title.zh).join(' · '),r.performances.map(p=>p.title.en).join(' · '))));
   else if(primary&&r.tracks?.length)body.append(node('span','feature-tracks',r.tracks.join(' · ')));
   const arrow=node('span','feature-arrow','↗');arrow.setAttribute('aria-hidden','true');
   btn.append(body,arrow);btn.addEventListener('click',()=>openWork(r,btn));article.append(btn);return article;
 }
 const westEnd={style:'westend',title:t('伦敦西区','West End'),context:t('剧场记忆 · 2026 年夏','Theatre memories · Summer 2026'),subtitle:t('伦敦的两场现场音乐剧','Two live musicals in London'),performances:stageRecords||[],tracks:[]};
 main.append(makeCard(westEnd,true));
 for(const r of data){if(r.style==='hadestown')main.append(makeCard(r,true));else rest.append(makeCard(r,false));}
 section.append(main);
 if(rest.children.length){const disclosure=node('details','collection-disclosure');disclosure.append(node('summary','',t('浏览其他作品 · '+rest.children.length+' 部','Browse other works · '+rest.children.length+' titles')),rest);section.append(disclosure);}
 section.append(dialog);return section;
}
function routeAtlas(data){
 const section=node('section','route-atlas');section.id='travel-routes';section.append(sectionHeader(data.title,data.note));
 const frame=node('div','atlas-frame');const svg=svgEl('svg',{viewBox:'0 0 820 540',role:'img','aria-label':'Illustrative flight routes across Eurasia and Oceania'});const title=svgEl('title');title.textContent='Travel overview, illustrative routes';svg.append(title,svgEl('image',{href:'./life/world.svg',width:820,height:540}));
 const nodes=new Map(data.nodes.map(n=>[n.id,n]));const xy=n=>[(n.lon+25)*4,(80-n.lat)*4];
 const layers=new Map();for(const j of data.journeys){const layer=svgEl('g',{'data-journey':j.id});for(const [a,b,offset] of j.paths){const [x1,y1]=xy(nodes.get(a)),[x2,y2]=xy(nodes.get(b));const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy);const bend=Math.min(95,len*.28)*(offset<0?-.55:offset===2?1.4:1);const cx=(x1+x2)/2-dy/len*bend,cy=(y1+y2)/2+dx/len*bend;layer.append(svgEl('path',{d:'M'+x1+' '+y1+' Q'+cx+' '+cy+' '+x2+' '+y2,class:'route-line'+(j.id==='europe'?' route-region':'')}));}svg.append(layer);layers.set(j.id,layer);}
 for(const n of data.nodes){const [x,y]=xy(n);svg.append(svgEl('circle',{cx:x,cy:y,r:n.id==='cn'?5:3.1,class:'atlas-node'}));const text=svgEl('text',{x:x+n.dx,y:y+n.dy,'text-anchor':n.anchor||'start',class:'atlas-label'});localize(text,n.title);svg.append(text);}
 frame.append(svg);section.append(frame,node('p','map-credit','Map outline: Natural Earth · public domain'));
 const controls=node('div','route-controls');const all=node('button','route-button',t('全部旅行','All journeys'));all.type='button';controls.append(all);const buttons=[all];const info=node('p','route-selection',t('选择一段旅程查看示意航迹。','Select a journey to highlight its routes.'));
 function select(id){for(const [key,layer] of layers)layer.classList.toggle('route-muted',!!id&&id!==key);for(const b of buttons)b.setAttribute('aria-pressed',String(b.dataset.route===id));const selected=data.journeys.find(j=>j.id===id);localize(info,selected?(selected.note?t(selected.count.zh+' · '+selected.note.zh,selected.count.en+' · '+selected.note.en):selected.count):t('选择一段旅程查看示意航迹。','Select a journey to highlight its routes.'));}
 all.dataset.route='';all.addEventListener('click',()=>select(''));
 for(const j of data.journeys){const btn=node('button','route-button');btn.type='button';btn.dataset.route=j.id;btn.append(node('strong','',j.title),node('span','',j.count));btn.addEventListener('click',()=>select(j.id));buttons.push(btn);controls.append(btn);}
 section.append(controls,info);select('');return section;
}
const categoryLabels={museum:t('博物馆 / 美术馆','Museum / gallery'),theatre:t('剧院','Theatre'),landmark:t('地标','Landmark'),district:t('街区 / 体验','District / experience')};
function ukAtlas(data){
 const section=node('section','uk-atlas');section.id='travel-uk';const total=data.cities.reduce((n,c)=>n+c.points.length,0);section.append(sectionHeader(data.title,data.note),node('p','uk-count',t(data.cities.length+' 座城市 · '+total+' 个公共地点',data.cities.length+' cities · '+total+' public places')));
 const cityNav=node('div','city-nav');const filters=node('div','city-nav');const pane=node('div','uk-pane');const mapWrap=node('div','uk-map');const list=node('div','uk-list');pane.append(mapWrap,list);section.append(cityNav,filters,pane);
 let cityIndex=0,type='all';const cityButtons=[],typeButtons=[];
 for(const [i,city] of data.cities.entries()){const b=node('button','route-button');b.type='button';b.append(node('strong','',city.title),node('span','',String(city.points.length)));b.addEventListener('click',()=>{cityIndex=i;type='all';draw();});cityButtons.push(b);cityNav.append(b);}
 for(const key of ['all','museum','theatre','landmark','district']){const b=node('button','route-button',key==='all'?t('全部地点','All places'):categoryLabels[key]);b.type='button';b.addEventListener('click',()=>{type=key;draw()});typeButtons.push([key,b]);filters.append(b);}
 function draw(){cityButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(cityIndex===i)));typeButtons.forEach(([k,b])=>b.setAttribute('aria-pressed',String(k===type)));const city=data.cities[cityIndex];const all=city.points;const shown=all.filter(p=>type==='all'||p.type===type);mapWrap.replaceChildren();list.replaceChildren();const svg=svgEl('svg',{viewBox:'0 0 520 340',role:'img','aria-label':'Relative geographic position of public places'});const minX=Math.min(...all.map(p=>p.lon)),maxX=Math.max(...all.map(p=>p.lon)),minY=Math.min(...all.map(p=>p.lat)),maxY=Math.max(...all.map(p=>p.lat));const midX=(minX+maxX)/2,midY=(minY+maxY)/2,cos=Math.cos(midY*Math.PI/180);const scale=Math.min(430/Math.max(.003,(maxX-minX)*cos),250/Math.max(.003,maxY-minY));const px=p=>[260+(p.lon-midX)*cos*scale,170-(p.lat-midY)*scale];
 for(let x=40;x<=480;x+=44)svg.append(svgEl('line',{x1:x,y1:25,x2:x,y2:315,class:'uk-gridline'}));for(let y=35;y<=305;y+=45)svg.append(svgEl('line',{x1:25,y1:y,x2:495,y2:y,class:'uk-gridline'}));
 const north=svgEl('text',{x:480,y:20,class:'uk-north'});north.textContent='N ↑';svg.append(north);
 shown.forEach((p,i)=>{const [x,y]=px(p);const g=svgEl('g',{class:'uk-pin pin-'+p.type});const c=svgEl('circle',{cx:x,cy:y,r:10});const num=svgEl('text',{x,y:y+3.5,'text-anchor':'middle'});num.textContent=String(i+1);const title=svgEl('title');localize(title,p.title);g.append(title,c,num);svg.append(g);const a=node('a','uk-place');a.href='https://www.openstreetmap.org/?mlat='+p.lat+'&mlon='+p.lon+'#map=17/'+p.lat+'/'+p.lon;a.target='_blank';a.rel='noopener noreferrer';a.append(node('span','uk-place-number',String(i+1)),node('strong','',p.title),node('span','uk-place-category',categoryLabels[p.type]));list.append(a);});
 if(!shown.length)list.append(node('p','archive-empty',t('此城市暂无该分类记录。','No places in this category for this city.')));
 mapWrap.append(svg,node('p','archive-note',t('地点相对坐标图（非街道底图）。点击右侧地点可打开实际地图。','Relative-coordinate plot, not a street basemap. Open a place for the actual map.')));translate();
 }
 draw();return section;
}

function render(data){
 if(data.schemaVersion!==1||data.kind!==kind||!Array.isArray(data.sections))throw Error('Invalid archive data');
 const fragment=document.createDocumentFragment();
 if(data.summary){const block=node('section','archive-summary');block.setAttribute('aria-label','Flight statistics');const meta=node('p','archive-meta',t('飞行日志概览 · '+data.summary.asOf,'Flight log snapshot · '+data.summary.asOf));block.append(meta);const grid=node('div','archive-metrics');for(const metric of data.summary.metrics){const item=node('div','archive-metric');item.append(node('strong','',metric.value),node('span','',metric.label));grid.append(item);}block.append(grid,node('p','archive-note',data.summary.note));fragment.append(block);}
 if(data.featured)fragment.append(featured(data.featured,data.sections.find(s=>s.id==='stage')?.records));
 if(data.routes)fragment.append(routeAtlas(data.routes));
 if(data.uk)fragment.append(ukAtlas(data.uk));
 const secondaryGroups=node('details','collection-disclosure collection-records');secondaryGroups.append(node('summary','',t('其他音乐记录','More listening records')));
 for(const group of data.sections){
  if(kind==='music'&&group.id==='stage')continue;
  const section=node('section','archive-group');section.id=kind+'-'+group.id;
  if(kind==='music'&&group.id==='musicals')section.classList.add('archive-secondary');
  const intro=node('div','archive-group-intro');intro.append(node('h2','',group.title),node('p','',group.description));section.append(intro);
  const content=node('div','archive-records'); const list=node('div','archive-record-list');
  if(!group.records.length)list.append(node('p','archive-empty',group.empty||t('暂无已整理记录。','No records added yet.')));
  for(const record of group.records){
    const item=node('article','archive-record');item.append(node('h3','',record.title));
    if(record.subtitle)item.append(node('p','archive-sub',record.subtitle));
    if(record.detail)item.append(node('p','archive-detail',record.detail));
    if(record.image && typeof record.image.src==='string' && /^\.\.\/media\/[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp|avif)$/i.test(record.image.src)){const img=node('img','archive-photo');img.src='./life/'+record.image.src.slice(3);img.alt=(record.image.alt||{})[lang]||'';if(record.image.alt){img.dataset.altZh=record.image.alt.zh;img.dataset.altEn=record.image.alt.en;}img.loading='lazy';item.append(img);}
    list.append(item);
  }
  if(group.searchable && group.records.length){
    const details=node('details','archive-fold');
    const summary=node('summary','',t('展开歌单 · '+group.records.length+' 首','Browse playlist · '+group.records.length+' tracks'));
    const search=node('input','archive-search');search.type='search';
    search.dataset.placeholderZh='搜索歌曲或专辑';search.dataset.placeholderEn='Search tracks or albums';
    search.dataset.labelZh='搜索歌曲或专辑';search.dataset.labelEn='Search tracks or albums';
    const result=node('p','archive-note');result.setAttribute('aria-live','polite');
    function filter(){
      const query=search.value.trim().toLocaleLowerCase();
      let count=0;Array.from(list.children).forEach((item,i)=>{const r=group.records[i];const match=!query||JSON.stringify([r.title,r.subtitle]).toLocaleLowerCase().includes(query);item.hidden=!match;if(match)count++;});
      localize(result,t('显示 '+count+' / '+group.records.length+' 首','Showing '+count+' / '+group.records.length+' tracks'));
    }
    search.addEventListener('input',filter);filter();details.append(summary,search,result,list);content.append(details);
  }else if(kind==='music'&&group.id==='musicals'){const details=node('details','archive-fold');details.append(node('summary','',t('其他看过的作品','Other works I’ve watched')),list);content.append(details);}else{content.append(list);}
  section.append(content);if(kind==='music'&&group.id!=='playlist-musicals')secondaryGroups.append(section);else fragment.append(section);
 }
 if(secondaryGroups.children.length>1)fragment.append(secondaryGroups);
 root.replaceChildren(fragment);root.setAttribute('aria-busy','false');translate();
}
return fetch('./life/'+kind+'.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Archive unavailable');return r.json();}).then(render).catch(()=>{root.replaceChildren(node('p','archive-status',t('档案暂时无法读取，请刷新页面重试。','The archive could not load. Please refresh to try again.')));root.setAttribute('aria-busy','false');}).finally(()=>document.dispatchEvent(new Event('portfolio:archive-ready')));
}
Promise.all(roots.map(mount)).then(()=>document.dispatchEvent(new Event('portfolio:archives-ready')));
})();
