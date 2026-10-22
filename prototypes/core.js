(() => {
'use strict';
const direction=document.body.dataset.direction || 'a';
const content=document.querySelector('#app');
const T=(zh,en)=>'<span data-zh="'+zh.replace(/"/g,'&quot;')+'" data-en="'+en.replace(/"/g,'&quot;')+'">'+zh+'</span>';
const link=(path,zh,en,ext=false,cls='')=>'<a class="'+cls+'" href="'+path+'"'+(ext?' target="_blank" rel="noopener noreferrer"':'')+'>'+T(zh,en)+' <span aria-hidden="true">↗</span></a>';
const project=[
 {name:'Vision Router',tag:['开源插件 · v3.0.5','Open source · v3.0.5'],kind:'vision',img:'../assets/vision-qa-evidence.png',scene:'../assets/vision-demo.png',
  desc:['让文字 Agent 真正拥有视觉工具：图像问答、OCR、坐标定位、裁剪和像素比对。','Visual tools for text-first AI agents: image Q&A, OCR, grounding, cropping and pixel comparison.'],
  foot:['TypeScript · DeepSeek Harness · 默认后备为云端服务','TypeScript · DeepSeek Harness · Cloud fallback by default'],
  detail:'../projects/vision-router/index.html',source:'https://github.com/ysr666/dsh-vision-router'},
 {name:'Computer History',tag:['已发布 · v1.1.0','Released · v1.1.0'],kind:'history',img:'../assets/history-timeline.png',scene:'../assets/history-timeline-evidence.png',
  desc:['把本地应用与资源元数据整理成 Work Episodes，让下一次 Agent 会话能接着做。默认关闭采集，数据存储于本地。','Local app/resource metadata becomes Work Episodes so an agent can resume work. Capture starts off and records remain local.'],
  foot:['TypeScript · SQLite · Work continuity','TypeScript · SQLite · Work continuity'],
  detail:'../projects/computer-history/index.html',source:'https://github.com/ysr666/dsh-computer-history'},
 {name:'Agent Wrapped',tag:['实验项目','Experimental'],kind:'wrapped',img:'',scene:'',
  desc:['给冗长的编程 Agent 会话做一份有证据、有人物和转折的回顾；仍在探索阶段。','An evidence-linked recap of coding-agent sessions, tracing the key moments and unexpected turns. Still experimental.'],
  foot:['Agent tooling · Storytelling · In progress','Agent tooling · Storytelling · In progress'],
  detail:'',source:'https://github.com/ysr666/agent-wrapped'}
];
const smaller=[
 ['错事 / Cuoshi','uni-app · Vue','安静、不评判的私人记录工具。Web 和微信小程序版本继续开发中。','A quiet personal tracker. Web and WeChat versions remain in development.','https://github.com/ysr666/cuoshi'],
 ['TripMap / 旅图','React · MapLibre','整理路线、地图、票据和旅行资料；同步与协作功能仍在迭代。','Maps, itineraries, tickets, and documents; sync and collaboration are evolving.','https://github.com/ysr666/travelmap-planner'],
 ['Agent Picket','Agent UX · Prototype','关于 AI 劳动权益的自愿参与模拟，尚未正式发布。','An opt-in, symbolic AI labor-rights simulation. Not released.','https://github.com/ysr666/agent-picket'],
 ['A-Share Trader','Python · Research','本地 A 股市场研究与风险提醒，不连接券商执行交易。','Local A-share market research and risk reminders; no brokerage execution.','https://github.com/ysr666/a-share-trader'],
];
const engineering=[
 ['共轴双桨飞行器','Coaxial dual-rotor aircraft','国家级大创 · 项目成员','National innovation project · Team member','Fusion 360 建模、3D 打印、装配以及推力／平衡测试。','Fusion 360 CAD, 3D printing, assembly and thrust/balance tests.'],
 ['火星陆空协同采样','Air–ground sample collection','方案设计中','Concept in progress','移动底盘、机械臂与无人机选型及样品交接方案，尚未完成整机联调。','Rover, arm and drone selection plus sample handoff concept; integration not complete.'],
 ['六舵机机械臂','Six-servo robotic arm','SolidWorks · 课程实践','SolidWorks · Coursework','舵机、连杆与夹爪的装配；基础配合和关节运动仍在核查。','Servo, linkage and gripper assembly; mechanical-mate validation is ongoing.'],
 ['神经信号采集实验','Neural-signal sampling','基础实验','Basic experiment','传感器接线、信号采集、调试与模拟手臂响应演示。','Sensor wiring, acquisition, debugging and a simulated-arm response demo.']
];
const awards=[
 ['全国大学生物理实验（创新）竞赛','National College Physics Experiment Competition','西北赛区一等奖','Northwest regional first prize'],
 ['全国青年科普创新实验暨作品大赛','National Youth Science Innovation Competition','省一等奖','Provincial first prize'],
 ['国创赛「萌芽赛道」','China International College Students Innovation Competition','省创新潜力奖','Provincial Innovation Potential Award'],
 ['2025 西安交大「腾飞杯」（飞行器项目团队）','2025 XJTU Tengfei Cup (aircraft team)','一等奖','First prize — team'],
 ['学校三好学生','School merit student','校级','School-level']
];
const orbit='<svg class="signature-svg" viewBox="0 0 470 450" role="img" aria-label="原创动态图形：机械铰接点与视觉定位轨迹" xmlns="http://www.w3.org/2000/svg">'+
 '<g class="orbit-grid" stroke="currentColor" stroke-width=".7" opacity=".24">'+Array.from({length:10},(_,i)=>'<path d="M'+(38+i*43)+' 15V445"/>').join('')+Array.from({length:10},(_,i)=>'<path d="M15 '+(25+i*43)+'H455"/>').join('')+'</g>'+
 '<circle cx="236" cy="225" r="157" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 8" opacity=".75"/>'+
 '<circle cx="236" cy="225" r="105" fill="none" stroke="currentColor" stroke-width=".8" opacity=".45"/>'+
 '<path d="M83 299Q226 82 401 181" stroke="currentColor" fill="none" stroke-width="1.5" stroke-dasharray="4 6"/>'+
 '<g class="kinematic-group"><path d="M115 329L231 225L345 115" stroke="#D9FF6F" stroke-width="18" stroke-linecap="round" fill="none"/><path d="M115 329L231 225L345 115" stroke="#191A44" stroke-width="1.5" fill="none"/>'+
 '<circle cx="115" cy="329" r="34" fill="#D9FF6F" stroke="#1a1c44" stroke-width="2"/><circle cx="115" cy="329" r="8" fill="#2525B6"/>'+
 '<circle cx="231" cy="225" r="34" fill="#D9FF6F" stroke="#1a1c44" stroke-width="2"/><circle cx="231" cy="225" r="7" fill="#2525B6"/>'+
 '<circle cx="345" cy="115" r="25" fill="#FA675A" stroke="#1a1c44" stroke-width="1.5"/><circle cx="345" cy="115" r="4" fill="#17193b"/></g>'+
 '<circle cx="335" cy="326" r="10" fill="#FA675A"/><path d="M335 287V366M296 326H374" stroke="#FA675A" stroke-width="1"/>'+
 '<text x="33" y="39" fill="currentColor" font-size="12" font-family="monospace">SHIRUI / MOTION STUDY</text>'+
 '<text x="365" y="417" fill="currentColor" font-size="12" font-family="monospace">001 — XY</text></svg>';
const header='<header class="site-header"><a href="#top" class="wordmark">Shirui Ye <span>✳</span></a><nav aria-label="Main" class="main-nav">'+
  link('#projects','项目','Work')+link('#more','更多','More')+link('#engineering','经历','Experience')+link('#contact','联系','Contact')+'</nav>'+
  '<button class="lang-button" type="button" aria-label="Switch language">EN</button></header>';
function renderProject(p,i){
 return '<article class="project project-'+p.kind+'">'+
  '<div class="project-visual '+p.kind+'-visual">'+(p.img?'<img src="'+p.img+'" alt="'+p.name+' 公开项目仓库的真实界面截图" loading="lazy"/>':
  '<div class="wrapped-visual"><span>AGENT</span><strong>WRAPPED<span class="wrap-star">✳</span></strong><small>THE SESSION HAD A PLOT.</small></div>')+
  '<span class="visual-index" aria-hidden="true">0'+(i+1)+'</span></div>'+
  '<div class="project-text"><div class="project-heading"><div><span class="project-state">'+T(...p.tag)+'</span><h3>'+p.name+'</h3></div><span class="project-count" aria-hidden="true">0'+(i+1)+'/03</span></div>'+
  '<p class="project-description">'+T(...p.desc)+'</p><span class="project-tech">'+T(...p.foot)+'</span><div class="project-links">'+
  (p.detail?link(p.detail,'完整案例','Case study',false,'project-link'):'')+link(p.source,'GitHub 源码','Source code',true,'project-link')+'</div></div></article>';
}
const projectsHTML=project.map(renderProject).join('');
const moreHTML=smaller.map(x=>'<article class="mini"><div class="mini-top"><h3>'+x[0]+'</h3><a target="_blank" rel="noopener noreferrer" href="'+x[4]+'" aria-label="Open '+x[0]+' on GitHub">↗</a></div><p>'+T(x[2],x[3])+'</p><span>'+x[1]+'</span></article>').join('');
const engHTML=engineering.map((x,i)=>'<article class="eng-item"><div class="eng-index">0'+(i+1)+'</div><div><h3>'+T(x[0],x[1])+'</h3><small>'+T(x[2],x[3])+'</small><p>'+T(x[4],x[5])+'</p></div></article>').join('');
const awardsHTML=awards.map(x=>'<li><span>'+T(x[0],x[1])+'</span><strong>'+T(x[2],x[3])+'</strong></li>').join('');
const aHero='<section class="hero a-hero"><div class="hero-copy"><p class="overline">'+T('西安交通大学 · 机械类','XJTU · Mechanical Engineering')+'</p><h1>'+T('你好，<br>我是<span class="highlight-name">叶石瑞</span>。','Hi, I’m<br><span class="highlight-name">Shirui Ye.</span>')+'</h1><p class="hero-sub">'+T('在机械与软件之间，做一些真正能运行的东西。','Making things work, somewhere between machines and software.')+'</p><p class="hero-intro">'+T('本科生 / 开源软件开发者。关注 AI Agent、视觉工具、工作上下文，也喜欢硬件与机器人。','Undergraduate and open-source builder exploring AI agents, vision tools, work context, and robotics.')+'</p><div class="hero-cta">'+link('#projects','看我的作品','Explore work',false,'cta-primary')+link('https://github.com/ysr666','GitHub','GitHub',true,'cta-secondary')+'</div><div class="hero-scroll">'+T('继续向下探索','Scroll to explore')+' <span>↓</span></div></div><div class="hero-art" tabindex="0" role="img" aria-label="原创机械运动与视觉坐标互动插画，可用鼠标移动改变姿态">'+orbit+'<div class="art-caption">SYSTEMS / MOTION / VISION</div></div></section>';
const bHero='<section class="hero b-hero"><div class="b-hero-top"><span>ISSUE 01 / PERSONAL INDEX</span><span>'+T('来自西安 · 正在制作','FROM XI’AN · IN PROGRESS')+'</span></div><div class="b-hero-main"><div class="hero-copy"><p class="hero-eyebrow">'+T('软件 × 机械 × 一点好奇心','SOFTWARE × MACHINES × CURIOSITY')+'</p><h1>'+T('你好。<em>我是</em><br><span>叶石瑞。</span>','Hello.<em> I’m</em><br><span>Shirui.</span>')+'</h1><p class="hero-sub">'+T('既写代码，也喜欢让东西动起来。','Code on the screen. Motion in the real world.')+'</p><p class="hero-intro">'+T('西安交通大学机械类本科生。最近在做开源 Agent 工具，也继续探索机器人、机械结构与个人软件产品。','A mechanical engineering undergraduate at XJTU, building open-source agent tools and exploring robotics, mechanisms, and useful software.')+'</p><div class="hero-cta">'+link('#projects','看我的项目','Selected work',false,'cta-primary')+link('https://github.com/ysr666','GitHub','GitHub',true,'cta-secondary')+'</div></div><div class="b-hero-media"><div class="media-tilt media-back"><img src="../assets/history-timeline.png" alt="Computer History 项目公开截图" /></div><div class="media-tilt media-front"><img src="../assets/vision-demo.png" alt="Vision Router 项目公开像素比对截图"/></div><div class="media-stamp">WORK<br>IN<br>PROGRESS<span>↗</span></div></div></div><div class="b-hero-bottom"><span>SELECTED PROJECTS AND PERSONAL NOTES</span><span>SCROLL ↓</span></div></section>';
const introHero=direction==='a'?aHero:bHero;
content.innerHTML=header+'<main id="top">'+introHero+
 '<section class="now-strip"><div><span class="now-marker"></span>'+T('此刻正在做','CURRENTLY')+'</div><p>'+T('继续维护 Vision Router 和 Computer History；学习 SolidWorks，参与陆空协同采样的方案设计。','Maintaining Vision Router and Computer History; learning SolidWorks and contributing to an air–ground sampling concept.')+'</p><span>OCT / 2026</span></section>'+
 '<section class="work-section" id="projects"><div class="section-header"><span class="eyebrow">01 / SELECTED WORK</span><h2>'+T('精选<span>作品</span>','Selected <span>work</span>')+'</h2><p>'+T('真实项目，不只是封面。完整的背景、实现与边界放在独立案例里。','Real projects with code, evidence and limitations. Deeper notes live in the case studies.')+'</p></div><div class="projects">'+projectsHTML+'</div></section>'+
 '<section class="more-section" id="more"><div class="section-header"><span class="eyebrow">02 / ALSO BUILDING</span><h2>'+T('更多<span>尝试</span>','Other <span>things</span>')+'</h2><p>'+T('除了基础设施，也做自己想用的工具。','Smaller ideas and useful everyday tools.')+'</p></div><div class="mini-grid">'+moreHTML+'</div></section>'+
 '<section class="engineering-section" id="engineering"><div class="section-header"><span class="eyebrow">03 / ENGINEERING</span><h2>'+T('不只<span>写代码</span>','Beyond <span>software</span>')+'</h2><p>'+T('机械和工程实践，按真实参与情况记录。','Hands-on mechanical work, described without overstating involvement.')+'</p></div><div class="eng-grid">'+engHTML+'</div></section>'+
 '<section class="recognition-section" id="recognition"><div class="section-header"><span class="eyebrow">04 / BACKGROUND</span><h2>'+T('经历与<span>荣誉</span>','Background <span>& honors</span>')+'</h2><p>'+T('西安交通大学少年班体系 · 机械类 2606','Youth Gifted Program · Mechanical Engineering 2606, Xi’an Jiaotong University')+'</p></div><div class="recognition-grid"><div class="awards"><h3>'+T('竞赛与学校荣誉','Competition & school distinctions')+'</h3><ul>'+awardsHTML+'</ul></div><div class="skills"><h3>'+T('技术与语言','Skills & languages')+'</h3><div class="skill-row"><span>'+T('开发','Development')+'</span><p>Python · C++ ('+T('基础','basics')+') · TypeScript · JavaScript · Git</p></div><div class="skill-row"><span>'+T('工程','Engineering')+'</span><p>Fusion 360 · 3D Printing · Arduino ('+T('基础','basics')+')</p></div><div class="skill-row"><span>'+T('学习中','Learning')+'</span><p>SolidWorks · Robotics · Intelligent Manufacturing</p></div><div class="skill-row"><span>'+T('英语','English')+'</span><p>CET-4 '+T('已通过','Passed')+' · CET-6 '+T('已通过','Passed')+'</p></div><small>'+T('获奖与资格依据此前个人简历整理；不额外推断名次、分数或个人贡献。','Awards and qualifications are based on a personal CV; no unsupported scores or individual credit are inferred.')+'</small></div></div></section>'+
 '<section class="about-section" id="about"><div class="about-brand">SY<span>.</span></div><div><p class="eyebrow">05 / HUMAN SIDE</p><h2>'+T('一点<span>关于我</span>','A little <span>about me</span>')+'</h2><p>'+T('我喜欢把想法做成可以试用的东西。也参与过辩论、社团和团支部工作。技术之外的生活和新的尝试，会慢慢留在这个网站里。','I like turning ideas into things worth trying. I’ve also spent time debating and organizing student activities. This space will grow with the things I make and learn.')+'</p></div></section>'+
 '<section class="contact-section" id="contact"><span class="eyebrow">06 / CONTACT</span><h2>'+T('要不要<span>聊聊？</span>','Have an <span>idea?</span>')+'</h2><p>'+T('开源项目、软件、机械、其他有意思的事，都欢迎交流。','Open source, software, machines, or anything interesting: let’s talk.')+'</p><div class="contact-actions">'+link('mailto:ysr182@qq.com','给我写信','Send an email',false,'contact-email')+link('https://github.com/ysr666','GitHub','GitHub',true,'contact-git')+'</div></section>'+
 '</main><footer class="site-footer"><span>SHIRUI YE © 2026</span><span>'+T('设计实验预览 · 不影响正式主页','DESIGN EXPLORATION · NOT THE LIVE SITE')+'</span><a href="#top">'+T('回到顶部','Back to top')+' ↑</a></footer>';
document.querySelectorAll('[data-zh],[data-en]').forEach(el=>{
 const v=el.getAttribute('data-zh');if(v?.includes('<br>')||v?.includes('<span')||v?.includes('<em')){el.innerHTML=v}
});
let lang='zh';
try{lang=localStorage.getItem('portfolio-lang')==='en'?'en':'zh'}catch(_){}
const switcher=document.querySelector('.lang-button');
function translate(){
 document.documentElement.lang=lang==='zh'?'zh-CN':'en';
 document.querySelectorAll('[data-zh][data-en]').forEach(el=>{
  const value=el.getAttribute('data-'+lang);
  if(el.matches('h1 span,h2 span')||/<(br|em|span)/.test(value))el.innerHTML=value;
  else el.textContent=value;
 });
 switcher.textContent=lang==='zh'?'EN':'中文';
 switcher.setAttribute('title',lang==='zh'?'Switch to English':'切换到中文');
 switcher.removeAttribute('aria-label');
 document.title=(direction==='a'?'A · Signal Studio':'B · Field Notes')+' — Shirui Ye';
}
switcher.addEventListener('click',()=>{lang=lang==='zh'?'en':'zh';try{localStorage.setItem('portfolio-lang',lang)}catch(_){}translate()});
translate();
// Meaningful interaction in direction A: motion path follows pointer and remains readable without it.
if(direction==='a'){
 const art=document.querySelector('.hero-art');
 if(art&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  art.addEventListener('pointermove',e=>{
   if(e.pointerType==='touch')return;
   const r=art.getBoundingClientRect(),dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5;
   art.style.setProperty('--art-rot',Math.round(dx*18)+'deg');
   art.style.setProperty('--art-y',Math.round(dy*15)+'px');
  });
  art.addEventListener('pointerleave',()=>{art.style.setProperty('--art-rot','0deg');art.style.setProperty('--art-y','0px')});
  art.addEventListener('focus',()=>{art.style.setProperty('--art-rot','8deg')});
  art.addEventListener('blur',()=>{art.style.setProperty('--art-rot','0deg')});
 }
}
})();
