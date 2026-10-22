(() => {
'use strict';
const button = document.querySelector('#lang-toggle');
const stage = document.querySelector('#stage-visual');
const stageImage = document.querySelector('#stage-image');
const stageName = document.querySelector('#stage-name');
const stageKicker = document.querySelector('#stage-kicker');
const stageDetail = document.querySelector('#stage-detail');
const controls = [...document.querySelectorAll('.stage-dot')];
const projects = {
  vision: { name: 'Vision Router', secondary:'./assets/vision-settings.png', image: './assets/vision-demo.png', alt: {zh:'Vision Router 真实像素比对与界面重建截图',en:'Vision Router actual pixel comparison'}, kicker: {zh:'从图片到行动',en:'From image to action'}, detail: {zh:'让文字 Agent 也能看见、定位与验证。',en:'Verifiable visual tasks for text-first agents.'}},
  history: { name: 'Computer History', secondary:'./assets/history-first-run.png', image: './assets/history-timeline.png', alt: {zh:'Computer History 时间线和继续工作界面',en:'Computer History real timeline and resume screen'}, kicker: {zh:'从活动到上下文',en:'From activity to context'}, detail: {zh:'只记录必要的元数据，让工作可以继续。',en:'Local, metadata-only work continuity.'}},
  wrapped: { name: 'Agent Wrapped', image: null, alt: {zh:'Agent Wrapped 项目文字视觉',en:'Agent Wrapped editorial project visual'}, kicker: {zh:'从会话到故事',en:'From sessions to stories'}, detail: {zh:'把调试会话里的转折，变成可以回看的故事。',en:'The plot twists hidden in long coding sessions.'}}
};
let lang = 'zh';
try { lang = localStorage.getItem('portfolio-lang') === 'en' ? 'en' : 'zh'; } catch (_) {}
let active = 'vision';
let swapping = false;
const translate = () => {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-zh][data-en]').forEach(el => {
    const value = el.getAttribute('data-' + lang);
    if(el.tagName === 'H1') el.innerHTML = value;
    else el.textContent = value;
  });
  button.textContent = lang === 'zh' ? 'EN' : '中';
  button.setAttribute('aria-label', lang === 'zh' ? 'Switch language to English' : '切换为中文');
  document.title = lang === 'zh' ? '叶石瑞 / Shirui Ye — 把想法做成能工作的软件' : 'Shirui Ye — Ideas are better when they work';
  const p = projects[active];
  stageName.textContent = p.name;
  stageKicker.textContent = p.kicker[lang];
  stageDetail.textContent = p.detail[lang];
  if (p.image && stage.querySelector('img')) stage.querySelector('img').alt = p.alt[lang];
};
function setStage(id){
  if (!projects[id] || id === active || swapping) return;
  const p = projects[id]; active = id;
  controls.forEach(el => { const on = el.dataset.go === id; el.classList.toggle('active', on); el.setAttribute('aria-pressed',String(on)); });
  stage.classList.add('is-changing'); swapping = true;
  const change = () => {
    if (p.image) { stage.innerHTML = '<img id="stage-image" src="' + p.image + '" width="1280" height="768" alt="' + p.alt[lang] + '">' + (p.secondary ? '<img class="stage-secondary" src="' + p.secondary + '" alt="Second real project interface screenshot">' : ''); }
    else { stage.innerHTML = '<div class="stage-wordmark" role="img" aria-label="Agent Wrapped editorial artwork"><span>Agent<br>Wrapped.</span><small>Turns in the story.</small></div>'; }
    stageName.textContent = p.name; stageKicker.textContent = p.kicker[lang]; stageDetail.textContent = p.detail[lang];
    stage.classList.remove('is-changing'); swapping = false;
  };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) change(); else setTimeout(change,210);
}
button.addEventListener('click', () => {
  lang = lang === 'zh' ? 'en' : 'zh';
  try { localStorage.setItem('portfolio-lang',lang); } catch (_) {}
  translate();
});
controls.forEach(el => el.addEventListener('click', () => {
  setStage(el.dataset.go);
  document.getElementById(el.dataset.go)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
}));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio).forEach(entry => setStage(entry.target.dataset.stage));
  }, {rootMargin:'-20% 0px -42% 0px',threshold:[0,0.2,0.4]});
  document.querySelectorAll('[data-stage]').forEach(el=>observer.observe(el));
}
window.addEventListener('scroll', () => { if (window.scrollY < 160 && active !== 'vision') setStage('vision'); }, {passive:true});
translate();
})();