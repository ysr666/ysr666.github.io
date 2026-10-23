(() => {
'use strict';
// Factual notes from FACT_AUDIT.md, published case studies and source repositories.
// Only public or clearly scoped example data; never imply unverified performance.
const proof={
 vision:{
  zh:{stage:'已发布 · v3.0.5',source:'GITHUB RELEASE + 真实截图',
   problem:'文字 Agent 能调用工具，却不能直接完成图片定位与像素验证。',
   method:'为 DeepSeek Harness 开发按需视觉工具，包括图像问答、OCR、局部裁剪、定位与像素比对。默认免密钥后备可能使用云端服务。',
   evidence:'公开的 v3.0.5 Release、源码和真实界面截图；2.54% 是一次像素比对示例，不代表平均性能。'},
  en:{stage:'RELEASED · v3.0.5',source:'GITHUB RELEASE + ACTUAL UI',
   problem:'Text-first agents can call tools, but cannot directly locate or verify details in images.',
   method:'Built on-demand vision tools for DeepSeek Harness: image Q&A, OCR, crops, grounding and pixel comparison. The default keyless fallback may use cloud services.',
   evidence:'Public v3.0.5 release, source and real interface captures. The 2.54% pixel-diff figure is one example, not aggregate performance.'},
  detail:'#vision',src:'https://github.com/ysr666/dsh-vision-router/releases/tag/v3.0.5'
 },
 history:{
  zh:{stage:'已发布 · v1.1.0',source:'RELEASE + 三平台记录',
   problem:'切换会话后，编辑器、终端、文件与浏览器中的工作线索容易丢失。',
   method:'实现默认关闭、用户自选应用的本地元数据记录，整理工作片段并存入 SQLite；不采集按键、截图或文档正文。',
   evidence:'公开的 v1.1.0 Release 及三平台验证文档。展示中的时间线图片含示例数据，不是本人的私人活动记录。'},
  en:{stage:'RELEASED · v1.1.0',source:'RELEASE + PLATFORM NOTES',
   problem:'Session changes can lose the context connecting editors, terminals, files and browsers.',
   method:'Built opt-in local metadata tracking and Work Episodes stored in SQLite. Capture is off by default; no keystrokes, screenshots or document bodies.',
   evidence:'Public v1.1.0 release and three-platform validation notes. Timeline screenshots contain example data, not private activity records.'},
  detail:'#history',src:'https://github.com/ysr666/dsh-computer-history/blob/main/docs/validation-three-platforms.md'
 },
 wrapped:{
  zh:{stage:'实验中 · 未正式发布',source:'公开仓库 · 进行中的代码',
   problem:'长时间的 Agent 编程会话很难直接回看关键决策与转折。',
   method:'实验性整理事件、构建关系并为人工核对保留依据；叙事化呈现仍属于探索功能。',
   evidence:'可以查看公开源码、架构与进度；不把设计目标或生成故事当成已验证的产品效果。'},
  en:{stage:'EXPERIMENTAL · NOT RELEASED',source:'PUBLIC REPO · WORK IN PROGRESS',
   problem:'Important decisions and turning points are hard to revisit in long coding-agent sessions.',
   method:'Exploring event extraction, relationships and evidence for human review. Narrative presentation remains experimental.',
   evidence:'Public source, architecture and work in progress; neither intent nor generated stories are presented as verified product outcomes.'},
  detail:'#wrapped',src:'https://github.com/ysr666/agent-wrapped'
 }
};
const buttons=[...document.querySelectorAll('[data-proof]')];
const title=document.querySelector('#stage-name');
const stage=document.querySelector('#proof-stage'),authority=document.querySelector('#proof-authority');
const problem=document.querySelector('#proof-problem'),method=document.querySelector('#proof-method'),evidence=document.querySelector('#proof-evidence');
const detail=document.querySelector('#proof-detail'),source=document.querySelector('#proof-source');
const lang=()=>document.documentElement.lang.startsWith('en')?'en':'zh';
let selected='vision';
function render(){
 const x=proof[selected],v=x[lang()];
 stage.textContent=v.stage;authority.textContent=v.source;
 problem.textContent=v.problem;method.textContent=v.method;evidence.textContent=v.evidence;
 detail.href=x.detail;source.href=x.src;
 buttons.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.proof===selected)));
}
buttons.forEach(btn=>btn.addEventListener('click',()=>{
 selected=btn.dataset.proof;
 // The left panel is an actual project preview, not a decorative simulation.
 if(typeof window.portfolioSelectPreview==='function')window.portfolioSelectPreview(selected);
 render();
}));
const byName={'Vision Router':'vision','Computer History':'history','Agent Wrapped':'wrapped'};
new MutationObserver(()=>{
 const corresponding=byName[title.textContent.trim()];
 if(corresponding&&corresponding!==selected){selected=corresponding;render();}
}).observe(title,{childList:true,subtree:true,characterData:true});
new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
render();
})();