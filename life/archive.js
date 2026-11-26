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
 for(const r of data){if(r.style==='hamilton')main.append(makeCard(r,true));else rest.append(makeCard(r,false));}
 section.append(main);
 if(rest.children.length){const disclosure=node('details','collection-disclosure');disclosure.append(node('summary','',t('浏览其他作品 · '+rest.children.length+' 部','Browse other works · '+rest.children.length+' titles')),rest);section.append(disclosure);}
 section.append(dialog);return section;
}
function osmLink(lat,lon,zoom=6){return 'https://www.openstreetmap.org/?mlat='+lat+'&mlon='+lon+'#map='+zoom+'/'+lat+'/'+lon;}
function mapFallback(container,lat,lon,zoom){const p=node('p','map-fallback',t('地图服务暂不可用。','Map service is temporarily unavailable.'));const a=node('a','map-open-link',t('在 OpenStreetMap 中查看 ↗','Open in OpenStreetMap ↗'));a.href=osmLink(lat,lon,zoom);a.target='_blank';a.rel='noopener noreferrer';container.replaceChildren(p,a);}
function setupMap(container,options,center,zoom){
 if(!window.L){mapFallback(container,center[0],center[1],zoom);return null;}
 const map=L.map(container,{scrollWheelZoom:false,zoomControl:true,attributionControl:true,...options}).setView(center,zoom);
 const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
 let errors=0;const notice=node('div','map-tile-notice',t('底图加载失败，可使用下方地点链接查看。','Basemap unavailable. Use the place links below.'));
 notice.hidden=true;container.parentElement?.append(notice);
 tiles.on('tileerror',()=>{if(++errors>=3)notice.hidden=false;});tiles.on('tileload',()=>{errors=0;notice.hidden=true;});
 tiles.addTo(map);
 if('ResizeObserver' in window){const resize=new ResizeObserver(()=>map.invalidateSize({pan:false}));resize.observe(container);}
 return map;
}
// Spherical interpolation of symbolic endpoints. No invented airport/transit legs.
function greatCircle(a,b){
 const rad=Math.PI/180,vec=n=>[Math.cos(n.lat*rad)*Math.cos(n.lon*rad),Math.cos(n.lat*rad)*Math.sin(n.lon*rad),Math.sin(n.lat*rad)];
 const u=vec(a),v=vec(b),theta=Math.acos(Math.max(-1,Math.min(1,u.reduce((s,x,i)=>s+x*v[i],0)))),s=Math.sin(theta);
 if(s<1e-8)return [[a.lat,a.lon],[b.lat,b.lon]];
 return Array.from({length:65},(_,i)=>{const q=i/64,x=u.map((p,k)=>(Math.sin((1-q)*theta)*p+Math.sin(q*theta)*v[k])/s);return [Math.atan2(x[2],Math.hypot(x[0],x[1]))/rad,Math.atan2(x[1],x[0])/rad];});
}
function routeAtlas(data){
 const section=node('section','route-atlas');section.id='travel-routes';section.append(sectionHeader(data.title,data.note));
 const frame=node('div','atlas-frame');const mapEl=node('div','geo-map route-map');mapEl.setAttribute('aria-label','Flight overview map');frame.append(mapEl);section.append(frame);
 const controls=node('div','route-controls');const all=node('button','route-button',t('全部旅行','All journeys'));all.type='button';all.dataset.route='';controls.append(all);const buttons=[all];const info=node('p','route-selection');const nodes=new Map(data.nodes.map(n=>[n.id,n]));const layers=new Map();let map=null,selected='';
 function select(id){selected=id;for(const [key,layer] of layers)layer.eachLayer(line=>line.setStyle({opacity:(!id||id===key)?0.8:0.08,weight:id===key?3:2}));for(const b of buttons)b.setAttribute('aria-pressed',String(b.dataset.route===id));const j=data.journeys.find(x=>x.id===id);localize(info,j?(j.note?t(j.count.zh+' · '+j.note.zh,j.count.en+' · '+j.note.en):j.count):t('点击旅程查看对应航迹。','Select a journey to highlight its routes.'));}
 all.addEventListener('click',()=>select(''));for(const j of data.journeys){const btn=node('button','route-button');btn.type='button';btn.dataset.route=j.id;btn.append(node('strong','',j.title),node('span','',j.count));btn.addEventListener('click',()=>select(j.id));buttons.push(btn);controls.append(btn);}
 section.append(controls,info);select('');
 requestAnimationFrame(()=>{
 map=setupMap(mapEl,{worldCopyJump:true,minZoom:2},[25,86],2);if(!map)return;
 for(const j of data.journeys){const layer=L.layerGroup().addTo(map);const seen=new Set();for(const [a,b] of j.paths){const key=[a,b].sort().join(':');if(seen.has(key))continue;seen.add(key);L.polyline(greatCircle(nodes.get(a),nodes.get(b)),{color:'#2450d8',weight:2,opacity:.8,dashArray:j.id==='europe'?'5 5':null}).addTo(layer);}layers.set(j.id,layer);}
 for(const n of data.nodes){const marker=L.circleMarker([n.lat,n.lon],{radius:n.id==='cn'?6:4,color:'#fff',weight:1.5,fillColor:'#172b39',fillOpacity:1}).addTo(map);const label=node('span','',n.title);marker.bindTooltip(label,{direction:'top'});}
 map.fitBounds(data.nodes.map(n=>[n.lat,n.lon]),{padding:[24,24],maxZoom:3,animate:false});select(selected);translate();
 });return section;
}
const categoryLabels={museum:t('博物馆 / 美术馆','Museum / gallery'),theatre:t('剧院','Theatre'),landmark:t('地标','Landmark'),district:t('街区 / 体验','District / experience')};
function ukAtlas(data){
 const section=node('section','uk-atlas');section.id='travel-uk';const total=data.cities.reduce((n,c)=>n+c.points.length,0);section.append(sectionHeader(data.title,data.note),node('p','uk-count',t(data.cities.length+' 座城市 · '+total+' 个公共地点',data.cities.length+' cities · '+total+' public places')));
 const cityNav=node('div','city-nav'),filters=node('div','city-nav'),pane=node('div','uk-pane'),mapWrap=node('div','uk-map'),mapEl=node('div','geo-map city-map'),list=node('div','uk-list');mapWrap.append(mapEl);pane.append(mapWrap,list);section.append(cityNav,filters,pane);
 let cityIndex=0,type='all',map=null,layer=null;const cityButtons=[],typeButtons=[];
 for(const [i,city] of data.cities.entries()){const b=node('button','route-button');b.type='button';b.append(node('strong','',city.title),node('span','',String(city.points.length)));b.addEventListener('click',()=>{cityIndex=i;type='all';draw();});cityButtons.push(b);cityNav.append(b);}
 for(const key of ['all','museum','theatre','landmark','district']){const b=node('button','route-button',key==='all'?t('全部地点','All places'):categoryLabels[key]);b.type='button';b.addEventListener('click',()=>{type=key;draw()});typeButtons.push([key,b]);filters.append(b);}
 function draw(){cityButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(cityIndex===i)));typeButtons.forEach(([k,b])=>b.setAttribute('aria-pressed',String(k===type)));const city=data.cities[cityIndex];const shown=city.points.filter(p=>type==='all'||p.type===type);list.replaceChildren();if(layer)layer.clearLayers();
 shown.forEach((p,i)=>{const a=node('a','uk-place');a.href=osmLink(p.lat,p.lon,17);a.target='_blank';a.rel='noopener noreferrer';a.append(node('span','uk-place-number',String(i+1)),node('strong','',p.title),node('span','uk-place-category',categoryLabels[p.type]));list.append(a);
 if(layer){const colors={museum:'#855224',theatre:'#7b3f60',landmark:'#346b64',district:'#475d81'};const marker=L.circleMarker([p.lat,p.lon],{radius:7,color:'#fff',weight:1.5,fillColor:colors[p.type],fillOpacity:1}).addTo(layer);const popup=node('div','map-popup');popup.append(node('strong','',p.title),node('p','',categoryLabels[p.type]));const link=node('a','',t('打开地图 ↗','Open map ↗'));link.href=a.href;link.target='_blank';link.rel='noopener noreferrer';popup.append(link);marker.bindPopup(popup);}
 });
 if(!shown.length)list.append(node('p','archive-empty',t('此城市暂无该分类记录。','No places in this category for this city.')));
 if(map)map.fitBounds((shown.length?shown:city.points).map(p=>[p.lat,p.lon]),{padding:[28,28],maxZoom:16,animate:false});
 else if(mapEl.children.length)mapFallback(mapEl,city.points[0].lat,city.points[0].lon,13);translate();
 }
 draw();requestAnimationFrame(()=>{map=setupMap(mapEl,{},[51.5,-.12],12);if(map)layer=L.layerGroup().addTo(map);draw();});return section;
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
