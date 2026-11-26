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
 if(view==='albums'){
  const intro=node('div','catalog-intro');intro.append(node('p','',t('几部想分享的音乐剧与相关录音。','A few musicals and related recordings.')));frag.append(intro);
  const grid=node('div','record-grid public-selection');
  for(const r of all){const a=link('/life/music/recording/?album='+encodeURIComponent(r.style),'record-card');a.append(cover(r.album),node('h2','',r.title),node('p','',t(r.album.year+' · '+(r.album.name.includes('Motion Picture')?'电影原声':'录音版本'),r.album.year+' · '+(r.album.name.includes('Motion Picture')?'Soundtrack':'Recording'))));grid.append(a);}frag.append(grid);
  const stage=node('section','catalog-stage');stage.append(node('h2','',t('剧场记忆 · West End','Theatre memories · West End')));const stageGrid=node('div','stage-grid');for(const r of data.sections.find(s=>s.id==='stage').records){const card=node('article','');card.append(node('h3','',r.title),node('p','',r.subtitle),node('p','',r.detail));stageGrid.append(card);}stage.append(stageGrid);const other=node('div','other-stage-works');other.append(node('h3','',t('其他作品','Other works')));for(const r of data.sections.find(s=>s.id==='musicals').records.filter(r=>r.title.en!=='The Phantom of the Opera')){const row=node('div','other-stage-row');row.append(node('strong','',r.title),node('span','',r.detail||r.subtitle));other.append(row);}stage.append(other);frag.append(stage,node('p','catalog-credit',t('封面来自 Apple Music 目录，仅用于介绍录音版本。','Artwork from the Apple Music catalogue, used to identify the recordings.')));
 }else if(view==='recording'){
  const r=byId.get(new URLSearchParams(location.search).get('album'));if(!r){frag.append(link('/life/music/','album-source',t('返回音乐与剧场','Back to Music & Theatre')));}else{const detail=node('article','record-detail'),body=node('div','');body.append(node('p','page-kicker',t('音乐与剧场','Music & theatre')),node('h1','',r.title),node('p','',r.album.name),node('p','',r.album.year));const source=link(r.album.source,'album-source',t('在 Apple Music 查看 ↗','View on Apple Music ↗'));source.target='_blank';source.rel='noopener noreferrer';body.append(source);detail.append(cover(r.album),body);frag.append(detail);}
 }
 root.replaceChildren(frag);root.setAttribute('aria-busy','false');translate();
}
fetch('/life/music.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('music');return r.json();}).then(render).catch(()=>{root.replaceChildren(node('p','archive-status',t('暂时无法读取，请刷新。','Unable to load. Please refresh.')));root.setAttribute('aria-busy','false');});
})();
