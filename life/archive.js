(() => {
'use strict';
const roots=[...document.querySelectorAll('[data-archive]')];
const t=(zh,en)=>({zh,en});
let leafletPromise;
function loadLeaflet(){
 if(window.L)return Promise.resolve(true);
 if(leafletPromise)return leafletPromise;
 leafletPromise=new Promise(resolve=>{
   let cssReady=false,jsReady=false,settled=false;
   const done=ok=>{if(settled)return;settled=true;clearTimeout(timeout);resolve(ok);};
   const check=()=>{if(cssReady&&jsReady)done(!!window.L);};
   const timeout=setTimeout(()=>done(false),9000);
   const css=document.createElement('link');css.rel='stylesheet';css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';css.integrity='sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';css.crossOrigin='anonymous';
   css.onload=()=>{cssReady=true;check();};css.onerror=()=>done(false);
   const script=document.createElement('script');script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';script.integrity='sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';script.crossOrigin='anonymous';
   script.onload=()=>{jsReady=true;check();};script.onerror=()=>done(false);
   document.head.append(css,script);
 });
 return leafletPromise;
}
function whenMapNear(el,init){
 const start=()=>{
   el.setAttribute('aria-busy','true');
   loadLeaflet().then(ok=>{el.setAttribute('aria-busy','false');init(ok);});
 };
 requestAnimationFrame(()=>{
   if(!('IntersectionObserver' in window)){start();return;}
   const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();start();}},{rootMargin:'700px 0px'});
   observer.observe(el);
 });
}
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
 const main=node('div','featured-grid'), shelf=node('div','album-shelf');
 const dialog=node('dialog','work-dialog');dialog.setAttribute('aria-labelledby','work-dialog-title');
 const panel=node('div','work-dialog-panel');dialog.append(panel);
 let returnFocus=null;
 const byKey=new Map(data.map(r=>[r.style,r]));
 function cover(album,priority=false){
   const box=node('span','album-cover');
   const fallback=node('span','album-fallback',t('封面暂不可用','Artwork unavailable'));
   const img=node('img','album-image');img.alt=album.name;img.width=600;img.height=600;img.loading=priority?'eager':'lazy';img.decoding='async';img.referrerPolicy='no-referrer';
   img.addEventListener('error',()=>{img.hidden=true;box.classList.add('art-unavailable');});
   img.src=album.artwork;box.append(fallback,img);return box;
 }
 function albumLink(album){
   const link=node('a','album-source',t('在 Apple Music 查看 ↗','View on Apple Music ↗'));
   link.href=album.source;link.target='_blank';link.rel='noopener noreferrer';return link;
 }
 dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=panel.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 function openWork(r,trigger){
   returnFocus=trigger;panel.replaceChildren();
   const close=node('button','work-close',t('关闭 ×','Close ×'));close.type='button';close.addEventListener('click',()=>dialog.close());panel.append(close);
   const top=node('div','work-dialog-top'),text=node('div','work-dialog-text');
   const title=node('h2','',r.title);title.id='work-dialog-title';
   text.append(node('p','work-eyebrow',r.context||r.subtitle),title);
   if(r.album){top.append(cover(r.album,true));text.append(node('p','work-version',r.album.name),node('p','work-year',r.album.year),albumLink(r.album));}
   else text.append(node('p','work-version',r.subtitle));
   top.append(text);panel.append(top);
   if(r.performances?.length){
     const list=node('div','work-performances');
     r.performances.forEach((performance,i)=>{
       const row=node('div','work-performance'),work=byKey.get(i===0?'phantom':'lesmis'),details=node('div','');
       if(work?.album)row.append(cover(work.album,true));
       details.append(node('h3','',performance.title),node('p','',performance.subtitle),node('p','',performance.detail));
       if(work?.album){details.append(albumLink(work.album));if(work.tracks?.length){const tracks=node('details','stage-recording');tracks.append(node('summary','',t('收藏唱段','Selected tracks')));const ul=node('ul','work-tracks');for(const track of work.tracks)ul.append(node('li','',track));tracks.append(ul);details.append(tracks);}}
       row.append(details);list.append(row);
     });
     panel.append(list,node('p','work-detail-note',t('封面对应相关录音版本，并非现场演出照片或当日卡司。','Album artwork represents related recordings, not photos or casts from the attended shows.')));
   }
   if(r.tracks?.length){const list=node('ul','work-tracks');for(const track of r.tracks)list.append(node('li','',track));panel.append(node('h3','work-track-heading',t('收藏唱段','Selected tracks')),list);}
   translate();dialog.showModal();document.body.classList.add('dialog-open');close.focus();
 }
 function feature(r){
   const article=node('article','feature-work feature-'+r.style);
   const btn=node('button','feature-button');btn.type='button';btn.setAttribute('aria-haspopup','dialog');
   const art=node('div','feature-artwork');
   if(r.performances){
     art.classList.add('westend-art');for(const key of ['phantom','lesmis']){const w=byKey.get(key);if(w?.album)art.append(cover(w.album,true));}
   }else if(r.album)art.append(cover(r.album,true));
   const body=node('div','feature-body');
   body.append(node('span','feature-kicker',r.context),node('span','feature-title',r.title));
   if(r.performances)body.append(node('span','feature-subtitle',t('歌剧魅影 · 悲惨世界','The Phantom of the Opera · Les Misérables')));
   else body.append(node('span','feature-subtitle',r.album?.name||r.subtitle));
   const footer=node('span','feature-action');footer.append(node('span','',r.performances?t('打开剧场记忆','View theatre memories'):t('打开唱片','View recording')));
   const arrow=node('span','feature-arrow','↗');arrow.setAttribute('aria-hidden','true');footer.append(arrow);
   btn.append(art,body,footer);btn.addEventListener('click',()=>openWork(r,btn));article.append(btn);return article;
 }
 function albumCard(r){
   const article=node('article','shelf-item'),btn=node('button','feature-row-button');btn.type='button';btn.setAttribute('aria-haspopup','dialog');
   if(r.album)btn.append(cover(r.album));
   const caption=node('span','shelf-caption');caption.append(node('span','',r.album?.year||''),node('span','shelf-arrow','↗'));btn.append(node('span','shelf-title',r.title),caption);
   btn.addEventListener('click',()=>openWork(r,btn));article.append(btn);return article;
 }
 const westEnd={style:'westend',title:t('伦敦西区','West End'),context:t('剧场记忆 · 2026 年夏','Theatre memories · Summer 2026'),subtitle:t('伦敦的两场现场音乐剧','Two live musicals in London'),performances:stageRecords||[],tracks:[]};
 main.append(feature(westEnd));const h=byKey.get('hamilton');if(h)main.append(feature(h));section.append(main);
 const shelfHeader=node('div','shelf-heading');shelfHeader.append(node('h4','',t('更多唱片收藏','More cast recordings')),node('span','',t('从西区、百老汇到中文音乐剧','From West End and Broadway to Chinese musicals')));section.append(shelfHeader);
 for(const key of ['fairlady','hadestown','chinese','chinese2','chinese3','chinese4']){const r=byKey.get(key);if(r)shelf.append(albumCard(r));}
 section.append(shelf,node('p','artwork-credit',t('唱片封面来自 Apple Music 目录，版权归相应权利人。','Album artwork from the Apple Music catalogue; rights remain with the respective owners.')),dialog);
 return section;
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
// Offset each directional leg from its great-circle reference in projected map space.
// The offset is purely cartographic, not a claim about the route flown.
function directionalArc(map,a,b,lane,regional){
 const pts=greatCircle(a,b).map(p=>map.project(p,0));
 const length=pts[0].distanceTo(pts[pts.length-1]);
 const bow=regional?0:Math.min(18,Math.max(1.2,length*(.12+lane*.085))+lane*.8);
 return pts.map((p,i)=>{
   if(i===0||i===pts.length-1)return map.unproject(p,0);
   const v=pts[i+1].subtract(pts[i-1]),mag=Math.hypot(v.x,v.y)||1;
   const offset=bow*Math.sin(Math.PI*i/(pts.length-1));
   return map.unproject(L.point(p.x-v.y/mag*offset,p.y+v.x/mag*offset),0);
 });
}
function arrowOnArc(map,points,index,color,kind){
 const i=Math.min(points.length-2,Math.max(1,index)),p=map.project(points[i-1],0),q=map.project(points[i+1],0);
 const angle=Math.atan2(q.y-p.y,q.x-p.x)*180/Math.PI;
 const icon=L.divIcon({className:'route-arrow-marker',html:'<span class="route-arrow-shape '+kind+'" style="--arrow-angle:'+angle+'deg;--arrow-color:'+color+'"></span>',iconSize:[12,12],iconAnchor:[6,6]});
 return L.marker(points[i],{icon,interactive:false,keyboard:false,zIndexOffset:20});
}
function routeAtlas(data){
 const section=node('section','route-atlas');section.id='travel-routes';section.append(sectionHeader(data.title,data.note));
 const frame=node('div','atlas-frame');const mapEl=node('div','geo-map route-map');mapEl.setAttribute('aria-label','Flight overview map');frame.append(mapEl);
 const legend=node('div','route-legend');
 for(const [key,label] of [['outbound',t('去程','Outbound')],['inbound',t('返程','Return')],['regional',t('多国旅行示意','Multi-country visits')]]){
   const item=node('span','route-legend-item');const swatch=node('span','route-legend-line '+key);swatch.setAttribute('aria-hidden','true');item.append(swatch,node('span','',label));legend.append(item);
 }
 const controls=node('div','route-controls');const all=node('button','route-button',t('全部旅行','All journeys'));all.type='button';all.dataset.route='';controls.append(all);const buttons=[all];const info=node('p','route-selection');const nodes=new Map(data.nodes.map(n=>[n.id,n]));const layers=new Map(),journeyBounds=new Map(),markers=new Map();let map=null,selected='',overview=null,overviewLabels=null;
 const pickerWrap=node('label','route-picker');pickerWrap.append(node('span','route-picker-label',t('选择旅程','Choose journey')));const picker=node('select','route-select');pickerWrap.append(picker);
 const option=(id,label)=>{const o=node('option','',label);o.value=id;picker.append(o);};option('',t('全部旅行','All journeys'));
 for(const j of data.journeys)option(j.id,t(j.title.zh+' · '+j.count.zh,j.title.en+' · '+j.count.en));
 picker.addEventListener('change',()=>select(picker.value,true));
 function renderOverviewLabels(){
   if(!map||!overviewLabels)return;
   overviewLabels.clearLayers();if(selected)return;
   const labels=[['cn','right',t('中国','China')],['jp','right',t('日本','Japan')],['sg','bottom',t('新加坡','Singapore')],['th','left',t('泰国','Thailand')],['nz','left',t('新西兰','New Zealand')],['fr','left',t('欧洲','Europe')]];
   for(const [key,direction,title] of labels){const n=nodes.get(key);if(!n)continue;const label=node('span','',title);L.tooltip({permanent:true,direction,className:'overview-label',opacity:1,offset:[0,0],interactive:false}).setLatLng([n.lat,n.lon]).setContent(label).addTo(overviewLabels);}
   translate();
 }
 function select(id,focus=false){
   selected=id;
   for(const [key,layer] of layers){
     const active=!id||id===key;
     layer.eachLayer(item=>{
       if(item instanceof L.Polyline)item.setStyle({opacity:active ? .88 : .10,weight:id===key?2.7:1.8});
       else if(item instanceof L.Marker)item.setOpacity(active ? .95 : 0);
     });
     if(id===key)layer.eachLayer(item=>{if(item instanceof L.Polyline)item.bringToFront();});
   }
   for(const b of buttons)b.setAttribute('aria-pressed',String(b.dataset.route===id));
   picker.value=id;
   const j=data.journeys.find(x=>x.id===id);
   const activeNodes=new Set(j?j.paths.flatMap(([a,b])=>[a,b]):[]);
   for(const [key,marker] of markers){marker.setStyle({fillOpacity:!id||activeNodes.has(key)?1:.22,opacity:!id||activeNodes.has(key)?1:.3});if(id&&activeNodes.has(key))marker.openTooltip();else marker.closeTooltip();}
   if(focus&&map&&overview){const bounds=id?journeyBounds.get(id):overview;if(bounds?.isValid())map.fitBounds(bounds,{padding:[30,36],maxZoom:id?5:3,animate:false});}renderOverviewLabels();localize(info,j?(j.note?t(j.count.zh+' · '+j.note.zh,j.count.en+' · '+j.note.en):j.count):t('点击旅程，突出显示相应的往返航线。','Select a journey to highlight its outbound and return arcs.'));
 }
 all.addEventListener('click',()=>select('',true));for(const j of data.journeys){const btn=node('button','route-button');btn.type='button';btn.dataset.route=j.id;btn.append(node('strong','',j.title),node('span','',j.count));btn.addEventListener('click',()=>select(j.id,true));buttons.push(btn);controls.append(btn);}
 info.setAttribute('aria-live','polite');
 section.append(pickerWrap,controls,frame,legend,info);select('');
 whenMapNear(mapEl,ok=>{
   if(!ok){mapFallback(mapEl,25,86,2);return;}
   map=setupMap(mapEl,{worldCopyJump:true,minZoom:0,zoomSnap:.25,zoomDelta:.5},[25,86],2);if(!map)return;
   const bounds=L.latLngBounds([]);overview=bounds;overviewLabels=L.layerGroup().addTo(map);
   for(const j of data.journeys){
     const layer=L.layerGroup().addTo(map),counts=new Map(),regional=j.id==='europe',localBounds=L.latLngBounds([]);
     for(const [a,b] of j.paths){
       const key=a+'>'+b,lane=counts.get(key)||0;counts.set(key,lane+1);
       const kind=regional?'regional':a==='cn'?'outbound':'inbound';
       const color=kind==='regional'?'#7a858e':kind==='outbound'?'#2359b8':'#168879';
       const points=directionalArc(map,nodes.get(a),nodes.get(b),lane,regional);
       points.forEach(p=>{bounds.extend(p);localBounds.extend(p);});
       const line=L.polyline(points,{className:'route-arc route-'+kind,color,weight:1.8,opacity:.88,lineCap:'round',lineJoin:'round',smoothFactor:1.15,dashArray:regional?'5 5':null,interactive:false}).addTo(layer);
       if(!regional)arrowOnArc(map,points,Math.round((points.length-1)*(.56+lane*.12)),color,kind).addTo(layer);
     }
     layers.set(j.id,layer);journeyBounds.set(j.id,localBounds);
   }
   for(const n of data.nodes){const marker=L.circleMarker([n.lat,n.lon],{radius:n.id==='cn'?6:4,color:'#fff',weight:1.5,fillColor:'#172b39',fillOpacity:1}).addTo(map);const label=node('span','',n.title);marker.bindTooltip(label,{direction:'top',offset:[0,-6],className:'flight-label',opacity:.95});markers.set(n.id,marker);bounds.extend([n.lat,n.lon]);}
   map.fitBounds(bounds,{padding:[35,50],maxZoom:3,animate:false});select(selected,!!selected);translate();
 });return section;
}
const categoryLabels={museum:t('博物馆 / 美术馆','Museum / gallery'),theatre:t('剧院','Theatre'),landmark:t('地标','Landmark'),district:t('街区 / 体验','District / experience')};
function ukAtlas(data){
 const section=node('section','uk-atlas');section.id='travel-uk';const total=data.cities.reduce((n,c)=>n+c.points.length,0);section.append(sectionHeader(data.title,data.note),node('p','uk-count',t(data.cities.length+' 座城市 · '+total+' 个公共地点',data.cities.length+' cities · '+total+' public places')));
 const cityNav=node('div','city-nav'),filters=node('div','city-nav'),pane=node('div','uk-pane'),mapWrap=node('div','uk-map'),mapEl=node('div','geo-map city-map'),list=node('div','uk-list');mapWrap.append(mapEl);pane.append(mapWrap,list);section.append(cityNav,filters,pane);
 let cityIndex=0,type='all',map=null,layer=null,failed=false;const cityButtons=[],typeButtons=[];
 for(const [i,city] of data.cities.entries()){const b=node('button','route-button');b.type='button';b.append(node('strong','',city.title),node('span','',String(city.points.length)));b.addEventListener('click',()=>{cityIndex=i;type='all';draw();});cityButtons.push(b);cityNav.append(b);}
 for(const key of ['all','museum','theatre','landmark','district']){const b=node('button','route-button',key==='all'?t('全部地点','All places'):categoryLabels[key]);b.type='button';b.addEventListener('click',()=>{type=key;draw()});typeButtons.push([key,b]);filters.append(b);}
 function draw(){
 cityButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(cityIndex===i)));typeButtons.forEach(([k,b])=>b.setAttribute('aria-pressed',String(k===type)));
 const city=data.cities[cityIndex],shown=city.points.filter(p=>type==='all'||p.type===type);
 list.replaceChildren();if(layer)layer.clearLayers();
 const selectPlace=(row,button,marker,point)=>{
   list.querySelectorAll('.uk-place.is-selected').forEach(el=>el.classList.remove('is-selected'));
   list.querySelectorAll('.uk-place-select').forEach(el=>el.setAttribute('aria-pressed','false'));
   row.classList.add('is-selected');button.setAttribute('aria-pressed','true');
   if(map&&marker){map.setView([point.lat,point.lon],Math.max(map.getZoom(),15),{animate:false});marker.openPopup();}
 };
 shown.forEach((p,i)=>{
   const row=node('div','uk-place'),button=node('button','uk-place-select');button.type='button';button.setAttribute('aria-pressed','false');
   const text=node('span','uk-place-text');text.append(node('strong','',p.title),node('span','uk-place-category',categoryLabels[p.type]));
   button.append(node('span','uk-place-number',String(i+1)),text);
   const a=node('a','uk-external','↗');a.href=osmLink(p.lat,p.lon,17);a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',lang==='zh'?'在地图中打开 '+p.title.zh:'Open '+p.title.en+' in map');row.append(button,a);list.append(row);
   let marker=null;
   if(layer){const colors={museum:'#855224',theatre:'#7b3f60',landmark:'#346b64',district:'#475d81'};marker=L.circleMarker([p.lat,p.lon],{radius:7,color:'#fff',weight:1.5,fillColor:colors[p.type],fillOpacity:1}).addTo(layer);
     const popup=node('div','map-popup');popup.append(node('strong','',p.title),node('p','',categoryLabels[p.type]));const link=node('a','',t('打开地图 ↗','Open map ↗'));link.href=a.href;link.target='_blank';link.rel='noopener noreferrer';popup.append(link);marker.bindPopup(popup);
     marker.on('click',()=>{selectPlace(row,button,marker,p);});
   }
   button.addEventListener('click',()=>{if(map&&marker)selectPlace(row,button,marker,p);else a.click();});
 });
 if(!shown.length)list.append(node('p','archive-empty',t('此城市暂无该分类记录。','No places in this category for this city.')));
 if(map)map.fitBounds((shown.length?shown:city.points).map(p=>[p.lat,p.lon]),{padding:[28,28],maxZoom:16,animate:false});
 else if(failed)mapFallback(mapEl,city.points[0].lat,city.points[0].lon,13);
 translate();
 }
 draw();whenMapNear(mapEl,ok=>{if(!ok){failed=true;draw();return;}map=setupMap(mapEl,{},[51.5,-.12],12);if(map)layer=L.layerGroup().addTo(map);else failed=true;draw();});return section;
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
    if(record.image && typeof record.image.src==='string' && /^\.\.\/media\/[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp|avif)$/i.test(record.image.src)){const img=node('img','archive-photo');img.src='/life/'+record.image.src.slice(3);img.alt=(record.image.alt||{})[lang]||'';if(record.image.alt){img.dataset.altZh=record.image.alt.zh;img.dataset.altEn=record.image.alt.en;}img.loading='lazy';item.append(img);}
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
return fetch('/life/'+kind+'.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Archive unavailable');return r.json();}).then(render).catch(()=>{root.replaceChildren(node('p','archive-status',t('档案暂时无法读取，请刷新页面重试。','The archive could not load. Please refresh to try again.')));root.setAttribute('aria-busy','false');}).finally(()=>document.dispatchEvent(new Event('portfolio:archive-ready')));
}
Promise.all(roots.map(mount)).then(()=>document.dispatchEvent(new Event('portfolio:archives-ready')));
})();
