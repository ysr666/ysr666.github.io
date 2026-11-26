(() => {
'use strict';
const root=document.querySelector('[data-music-view]');if(!root)return;
const view=root.dataset.musicView,t=(zh,en)=>({zh,en});let lang=document.documentElement.lang==='en'?'en':'zh';
function node(tag,cls,value){const el=document.createElement(tag);if(cls)el.className=cls;if(typeof value==='string')el.textContent=value;else if(value){el.dataset.zh=value.zh;el.dataset.en=value.en;el.textContent=value[lang]||value.zh;}return el;}
function translate(){root.querySelectorAll('[data-zh][data-en]').forEach(el=>el.textContent=el.dataset[lang]);const input=root.querySelector('.archive-search');if(input){input.placeholder=lang==='zh'?'搜索歌曲、专辑':'Search tracks or albums';input.setAttribute('aria-label',input.placeholder);}}
document.addEventListener('portfolio:language',e=>{lang=e.detail==='en'?'en':'zh';translate();});
function cover(album){const box=node('span','album-cover');const img=node('img','album-image');img.alt=album.name;img.src=album.artwork;img.width=600;img.height=600;img.loading='lazy';img.decoding='async';img.referrerPolicy='no-referrer';const fallback=node('span','album-fallback',t('封面暂不可用','Artwork unavailable'));img.addEventListener('error',()=>{img.hidden=true;box.classList.add('art-unavailable');});box.append(fallback,img);return box;}
function link(href,cls,label){const a=node('a',cls,label);a.href=href;return a;}
function render(data){
 const all=data.featured,byId=new Map(all.map(r=>[r.style,r])),frag=document.createDocumentFragment();
 const recordUrl=id=>'/life/music/recording/?album='+encodeURIComponent(id);
 function sectionHeading(zh,en,detail){const h=node('header','editorial-heading');h.append(node('h2','',t(zh,en)));if(detail)h.append(node('p','',detail));return h;}
 function workCard(r){const a=link(recordUrl(r.style),'record-card');a.append(cover(r.album),node('h3','',r.title),node('p','',r.description));return a;}
 if(view==='albums'){
  const feature=node('section','music-feature-grid');
  const west=node('article','theatre-feature');const pair=node('div','theatre-cover-pair');
  for(const id of ['lesmis','phantom']){const r=byId.get(id),a=link(recordUrl(id),'theatre-cover-link');a.append(cover(r.album));a.setAttribute('aria-label',r.album.name);pair.append(a);}
  const westCopy=node('div','theatre-feature-copy');westCopy.append(node('p','editorial-eyebrow',t('剧场记忆 · 伦敦','Theatre · London')),node('h2','',t('伦敦西区','West End')));
  const stageList=node('div','theatre-production-list');for(const r of data.sections.find(s=>s.id==='stage').records){const item=node('div','theatre-production');item.append(node('strong','',r.title),node('span','',r.subtitle));stageList.append(item);}westCopy.append(stageList,node('p','editorial-small',t('封面为相关录音，并非现场照片。','Related recordings, not photographs of the performances.')),link('/life/travel/#travel-uk','editorial-inline-link',t('更多旅行片段 ↗','Travel impressions ↗')));west.append(pair,westCopy);
  const h=byId.get('hamilton'),hero=node('article','hamilton-feature');const heroCover=link(recordUrl(h.style),'hamilton-cover');heroCover.append(cover(h.album));const hcopy=node('div','hamilton-copy');hcopy.append(node('p','editorial-eyebrow',t('音乐剧 · 百老汇','Musical theatre · Broadway')),link(recordUrl(h.style),'hamilton-title',h.title),node('p','',h.description),node('p','editorial-small',t('2015 年百老汇原卡录音','2015 original Broadway cast recording')));hero.append(heroCover,hcopy);feature.append(west,hero);frag.append(feature);
  const works=node('section','editorial-works');works.append(sectionHeading('更多音乐剧','More musicals',t('从黄金时代到当代作品，选取几部作为介绍。','A selection spanning the golden age and contemporary musical theatre.')));const grid=node('div','record-grid public-selection');for(const id of ['fairlady','oklahoma','guys-dolls','bridges'])grid.append(workCard(byId.get(id)));works.append(grid);frag.append(works);
  const beyond=node('section','beyond-stage');beyond.append(sectionHeading('舞台之外','Beyond the stage',t('不同类型的音乐，也构成日常的声音。','Different kinds of music are part of everyday listening.')));const themes=node('div','music-theme-line');for(const theme of data.editorial.themes)themes.append(node('span','music-theme',theme));beyond.append(themes);frag.append(beyond,node('p','catalog-credit',t('专辑封面来自 Apple Music 目录，用于介绍作品与相关录音。','Album artwork from the Apple Music catalogue, used to introduce works and related recordings.')));
 }else if(view==='recording'){
  const r=byId.get(new URLSearchParams(location.search).get('album'));
  if(!r)frag.append(link('/life/music/','album-source',t('返回音乐与剧场','Back to Music & Theatre')));
  else{const detail=node('article','record-detail'),body=node('div','');body.append(node('p','page-kicker',t('音乐剧选介','Musical theatre')),node('h1','',r.title),node('p','recording-description',r.description),node('p','',r.album.name),node('p','',r.album.year));const source=link(r.album.source,'album-source',t('在 Apple Music 查看 ↗','View on Apple Music ↗'));source.target='_blank';source.rel='noopener noreferrer';body.append(source,link('/life/music/','editorial-inline-link',t('返回音乐与剧场 ↗','Back to Music & Theatre ↗')));detail.append(cover(r.album),body);frag.append(detail);}
 }
 root.replaceChildren(frag);root.setAttribute('aria-busy','false');translate();
}
fetch('/life/music.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('music');return r.json();}).then(render).catch(()=>{root.replaceChildren(node('p','archive-status',t('暂时无法读取，请刷新。','Unable to load. Please refresh.')));root.setAttribute('aria-busy','false');});
})();
