(() => {
'use strict';
const entries=[
['vision','agents','Vision Router','文字 Agent 的图像问答、定位与视觉验证','Image Q&A, grounding and visual verification','开源插件','Open-source plugin','#vision','https://ysr666.github.io/projects/vision-router/','deepseek harness ocr pixel 截图'],
['history','agents','Computer History','本地工作上下文与会话连续性','Local context between work sessions','已发布','Published','#history','https://ysr666.github.io/projects/computer-history/','sqlite privacy metadata memory 工作记录'],
['wrapped','agents','Agent Wrapped','从 Agent 会话中提取可回看的事件','Evidence-backed recaps of agent sessions','实验中','Experimental','#wrapped','https://github.com/ysr666/agent-wrapped','agent session narrative'],
['cuoshi','products','错事 / Cuoshi','安静、不评判的个人记录工具','A quiet, nonjudgmental personal tracker','开发中','In development','#cuoshi','https://github.com/ysr666/cuoshi','uniapp vue 微信小程序'],
['tripmap','products','TripMap','路线、票据与旅行资料的工作台','A workspace for routes, tickets and travel documents','迭代中','In progress','#tripmap','https://github.com/ysr666/travelmap-planner','旅图 react maplibre supabase'],
['picket','products','Agent Picket','可选参与的 AI 劳动议题模拟','An opt-in symbolic exploration of AI work','原型','Prototype','#picket','https://github.com/ysr666/agent-picket','labor simulation'],
['atrader','products','A-Share Trader','本地市场研究与风险提醒','Local market research and risk alerts','辅助分析','Research tool','#atrader','https://github.com/ysr666/a-share-trader','finance python akshare 股票'],
['coaxial','engineering','共轴双桨飞行器','Fusion 360 建模、装配与测试；团队项目','Fusion 360, printing and assembly; team project','项目成员','Team member','#coaxial','','coaxial aircraft 飞行器'],
['mars','engineering','火星陆空协同采样','移动平台、机械臂与无人机选型方案','Rover, arm and drone selection; concept design','方案阶段','Concept only','#mars','','mars drone sample rover 火星'],
['robotarm','engineering','六舵机机械臂装配','SolidWorks 建模装配与关节练习','SolidWorks assemblies and motion checks','课程实践','Coursework','#robotarm','','机械臂 solidworks servo'],
['signals','engineering','神经信号采集与模拟响应','传感器、采集与基础模拟响应','Sensors, acquisition and basic response demo','基础实验','Hands-on experiment','#signals','','neural signal 传感器']
];
const input=document.querySelector('#finder-query'),results=document.querySelector('#finder-results'),counter=document.querySelector('#finder-count'),empty=document.querySelector('#finder-empty');
const filters=[...document.querySelectorAll('[data-filter]')];
const en=()=>document.documentElement.lang.startsWith('en');
const trans=(zh,eng)=>en()?eng:zh;
const cats={agents:['Agent 工具','Agent tools'],products:['个人产品','Personal tools'],engineering:['工程实践','Engineering']};
const engNames={coaxial:'Coaxial dual-rotor aircraft',mars:'Mars air–ground sampling',robotarm:'Six-servo robotic arm assembly',signals:'Signal acquisition and simulated response'};
let current='all';
function render(){
 const query=input.value.trim().toLocaleLowerCase().normalize('NFKC');
 const visible=entries.filter(e=>(current==='all'||e[1]===current)&&[e[2],e[3],e[4],e[5],e[6],e[9],engNames[e[0]]||''].join(' ').toLocaleLowerCase().normalize('NFKC').includes(query));
 const fragment=document.createDocumentFragment();
 visible.forEach(e=>{
   const row=document.createElement('div');row.className='finder-item';
   const target=document.createElement('a');target.href=e[7];target.className='finder-item-main';
   const num=document.createElement('span');num.className='finder-item-number';num.textContent=String(entries.indexOf(e)+1).padStart(2,'0');
   const title=document.createElement('strong');title.textContent=en()&&engNames[e[0]]?engNames[e[0]]:e[2];
   const desc=document.createElement('span');desc.textContent=en()?e[4]:e[3];
   const stack=document.createElement('span');stack.className='finder-item-text';stack.append(title,desc);
   const arrow=document.createElement('span');arrow.className='finder-item-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';
   target.append(num,stack,arrow);
   const aside=document.createElement('div');aside.className='finder-item-side';
   const cat=document.createElement('span');cat.textContent=cats[e[1]][en()?1:0];
   const status=document.createElement('span');status.className='finder-status';status.textContent=en()?e[6]:e[5];
   aside.append(cat,status);
   if(e[8]){
      const source=document.createElement('a');source.href=e[8];source.target='_blank';source.rel='noopener noreferrer';source.className='finder-source';
      source.textContent=e[8].includes('/projects/')?trans('项目案例 ↗','Case study ↗'):trans('查看源码 ↗','Source code ↗');
      source.setAttribute('aria-label',trans('查看'+e[2]+'的案例或源码','Open case or source for '+e[2]));
      aside.append(source);
   }
   row.append(target,aside);fragment.append(row);
 });
 results.replaceChildren(fragment);
 empty.hidden=visible.length!==0;
 counter.textContent=en()?(visible.length+' of '+entries.length+' entries'):('找到 '+visible.length+' / '+entries.length+' 项');
}
filters.forEach(btn=>btn.addEventListener('click',()=>{
 current=btn.dataset.filter;filters.forEach(x=>x.setAttribute('aria-pressed',String(x===btn)));render();
}));
input.addEventListener('input',render);
document.querySelector('#finder-clear').addEventListener('click',()=>{
 input.value='';current='all';filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter==='all')));render();input.focus();
});
document.addEventListener('keydown',e=>{
 if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!document.activeElement.isContentEditable){
   e.preventDefault();input.focus();input.scrollIntoView({block:'center'});
 }else if(e.key==='Escape'&&document.activeElement===input){input.value='';render();input.blur();}
});
const stageLink=document.querySelector('#stage-action'),stageName=document.querySelector('#stage-name');
function updateStageLink(){
 const map={'Vision Router':'#vision','Computer History':'#history','Agent Wrapped':'#wrapped'};
 stageLink.href=map[stageName.textContent.trim()]||'#work';
}
new MutationObserver(updateStageLink).observe(stageName,{childList:true,characterData:true,subtree:true});updateStageLink();
const copy=document.querySelector('#copy-email'),copyStatus=document.querySelector('#copy-status');
copy.addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText('ysr182@qq.com');copyStatus.textContent=trans('已复制邮箱地址','Email address copied');}
 catch(e){copyStatus.textContent=trans('无法自动复制，请选择上方邮箱地址','Could not copy; select the address above');}
});
new MutationObserver(()=>{
 input.placeholder=trans('搜索项目、技术或方向','Search projects, technologies, or topics');
 input.setAttribute('aria-label',input.placeholder);
 document.querySelector('.finder-filters').setAttribute('aria-label',trans('按类别筛选','Filter by category'));
 copyStatus.textContent='';render();
}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
input.placeholder=trans('搜索项目、技术或方向','Search projects, technologies, or topics');
render();
})();