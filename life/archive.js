(() => {
'use strict';
const root=document.querySelector('#archive-content');
const button=document.querySelector('#lang-toggle');
const kind=document.body.dataset.archive;
if (!root || !button || !['music','travel'].includes(kind)) return;
let lang='zh';
try { lang=localStorage.getItem('portfolio-lang')==='en'?'en':'zh'; } catch (_) {}
const t=(zh,en)=>({zh,en});
function localize(el,value){if(!value)return el; if(typeof value==='string'){el.textContent=value;return el;} el.dataset.zh=value.zh;el.dataset.en=value.en;el.textContent=value[lang]||value.zh;return el;}
function node(tag,cls,value){const el=document.createElement(tag);if(cls)el.className=cls;return localize(el,value);}
function translate(){document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.querySelectorAll('[data-zh][data-en]').forEach(el=>el.textContent=el.dataset[lang]);document.querySelectorAll('[data-alt-zh][data-alt-en]').forEach(el=>el.alt=el.dataset[lang==='zh'?'altZh':'altEn']);button.textContent=lang==='zh'?'EN':'中文';button.title=lang==='zh'?'Switch to English':'切换为中文';}
button.addEventListener('click',()=>{lang=lang==='zh'?'en':'zh';try{localStorage.setItem('portfolio-lang',lang)}catch(_){}translate();});
translate();
function render(data){
 if(data.schemaVersion!==1||data.kind!==kind||!Array.isArray(data.sections))throw Error('Invalid archive data');
 const fragment=document.createDocumentFragment();
 if(data.summary){const block=node('section','archive-summary');block.setAttribute('aria-label','Flight statistics');const meta=node('p','archive-meta',t('飞行日志概览 · '+data.summary.asOf,'Flight log snapshot · '+data.summary.asOf));block.append(meta);const grid=node('div','archive-metrics');for(const metric of data.summary.metrics){const item=node('div','archive-metric');item.append(node('strong','',metric.value),node('span','',metric.label));grid.append(item);}block.append(grid,node('p','archive-note',data.summary.note));fragment.append(block);}
 for(const group of data.sections){
  const section=node('section','archive-group');section.id=group.id;
  const intro=node('div','archive-group-intro');intro.append(node('h2','',group.title),node('p','',group.description));section.append(intro);
  const content=node('div','archive-records');
  if(!group.records.length)content.append(node('p','archive-empty',group.empty||t('暂无已整理记录。','No records added yet.')));
  for(const record of group.records){
    const item=node('article','archive-record');item.append(node('h3','',record.title));
    if(record.subtitle)item.append(node('p','archive-sub',record.subtitle));
    if(record.detail)item.append(node('p','archive-detail',record.detail));
    if(record.image && typeof record.image.src==='string' && /^\.\.\/media\/[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp|avif)$/i.test(record.image.src)){const img=node('img','archive-photo');img.src=record.image.src;img.alt=(record.image.alt||{})[lang]||'';if(record.image.alt){img.dataset.altZh=record.image.alt.zh;img.dataset.altEn=record.image.alt.en;}img.loading='lazy';item.append(img);}
    content.append(item);
  }
  section.append(content);fragment.append(section);
 }
 root.replaceChildren(fragment);root.setAttribute('aria-busy','false');translate();
}
fetch('../'+kind+'.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Archive unavailable');return r.json();}).then(render).catch(()=>{root.replaceChildren(node('p','archive-status',t('档案暂时无法读取，请刷新页面重试。','The archive could not load. Please refresh to try again.')));root.setAttribute('aria-busy','false');});
})();
