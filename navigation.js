(() => {
'use strict';
const nav=document.querySelector('#site-navigation');
const header=document.querySelector('.topbar');
if(!nav||!header)return;
const groups=[...nav.querySelectorAll('.nav-group')];
const triggers=groups.map(g=>g.querySelector('.nav-trigger'));
const panels=groups.map(g=>g.querySelector('.nav-dropdown'));
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const hover=matchMedia('(hover: hover) and (pointer: fine)');
const isHome=!!document.getElementById('home');
const chapters=['home','work','journey','life','contact'];
const destinations={work:['work','vision','history','wrapped','more'],journey:['journey','honors','skills','about'],life:['music','travel']};
let opened=-1,closeTimer=0,frame=0,requestId=0,highlightFrame=0,userNavigated=false,lastPointer='';
let archivesReady=!document.querySelector('[data-archive][aria-busy="true"]');
let readyResolve;
const ready=archivesReady?Promise.resolve():new Promise(resolve=>{readyResolve=resolve;});
document.addEventListener('portfolio:archives-ready',()=>{archivesReady=true;readyResolve?.();scheduleHighlight();},{once:true});
function close(restore=false){
 clearTimeout(closeTimer);
 const previous=opened;opened=-1;
 groups.forEach((group,i)=>{group.classList.remove('is-open');triggers[i].setAttribute('aria-expanded','false');panels[i].inert=true;});
 if(restore&&previous>=0)triggers[previous].focus({preventScroll:true});
}
function open(i,focus=false){
 clearTimeout(closeTimer);
 opened=i;
 groups.forEach((group,n)=>{const on=n===i;group.classList.toggle('is-open',on);triggers[n].setAttribute('aria-expanded',String(on));panels[n].inert=!on;});
 if(focus)panels[i].querySelector('a')?.focus({preventScroll:true});
}
groups.forEach((group,i)=>{
 group.addEventListener('pointerenter',e=>{if(hover.matches&&e.pointerType==='mouse')open(i);});
 group.addEventListener('pointerleave',e=>{if(hover.matches&&e.pointerType==='mouse'){clearTimeout(closeTimer);closeTimer=setTimeout(()=>{if(opened===i&&!group.contains(document.activeElement))close();},130);}});
 triggers[i].addEventListener('pointerdown',e=>{lastPointer=e.pointerType;});
 triggers[i].addEventListener('click',e=>{
   // A mouse click after hover keeps the menu open; touch and keyboard click toggle it.
   if(hover.matches&&lastPointer==='mouse'&&e.detail>0&&opened===i)return;
   if(opened===i)close();else open(i);
 });
 triggers[i].addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();open(i,true);if(e.key==='ArrowUp'){const links=panels[i].querySelectorAll('a');links[links.length-1]?.focus({preventScroll:true});}}});
 group.addEventListener('keydown',e=>{
   const links=[...panels[i].querySelectorAll('a')];const n=links.indexOf(document.activeElement);
   if(n<0)return;
   if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?links.length-1:(n+(e.key==='ArrowDown'?1:-1)+links.length)%links.length;links[next].focus({preventScroll:true});}
 });
});
document.addEventListener('pointerdown',e=>{if(opened>=0&&!groups[opened].contains(e.target))close();});
nav.addEventListener('focusout',e=>{if(opened>=0&&e.relatedTarget&&!groups[opened].contains(e.relatedTarget))close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&opened>=0){e.preventDefault();close(true);}});
function stopScroll(){
 requestId++;
 if(frame){cancelAnimationFrame(frame);frame=0;document.dispatchEvent(new Event('portfolio:scroll-end'));}
}
function targetY(el){return Math.max(0,Math.min(scrollY+el.getBoundingClientRect().top-header.getBoundingClientRect().height-20,document.documentElement.scrollHeight-innerHeight));}
function jump(y){window.scrollTo({top:y,behavior:'instant'});}
function animate(el,instant=false){
 const start=scrollY;const distance=targetY(el)-start;
 if(instant||reduce.matches||Math.abs(distance)<3){jump(targetY(el));scheduleHighlight();document.dispatchEvent(new Event('portfolio:scroll-end'));return;}
 const duration=Math.min(920,Math.max(440,440+Math.sqrt(Math.abs(distance))*6));
 const token=requestId;let startTime=null;
 function tick(now){
   if(token!==requestId)return;
   if(startTime===null)startTime=now;
   const p=Math.min(1,(now-startTime)/duration);
   const ease=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
   jump(start+(targetY(el)-start)*ease);
   if(p<1)frame=requestAnimationFrame(tick);
   else{frame=0;jump(targetY(el));scheduleHighlight();document.dispatchEvent(new Event('portfolio:scroll-end'));}
 }
 frame=requestAnimationFrame(tick);
}
async function navigate(id,{push=true,instant=false,initial=false}={}){
 const el=document.getElementById(id);
 if(!el)return;
 if(!initial)userNavigated=true;
 const moveFocus=push&&!initial;
 close();stopScroll();const token=requestId;
 if(push&&location.hash!=='#'+id)history.pushState(null,'','#'+id);
 // Only targets whose vertical position depends on async archive content wait.
 if(!archivesReady&&(id==='travel'||id==='contact'))await ready;
 if(token!==requestId)return;
 if(moveFocus){if(!el.hasAttribute('tabindex'))el.setAttribute('tabindex','-1');el.focus({preventScroll:true});}
 animate(el,instant);
}
document.addEventListener('click',e=>{
 const a=e.target.closest?.('a[href^="#"]');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.classList.contains('skip-link'))return;
 const id=a.hash.slice(1);if(!id||!document.getElementById(id))return;
 e.preventDefault();navigate(id);
});
document.addEventListener('portfolio:navigate',e=>navigate(e.detail));
window.addEventListener('wheel',()=>{userNavigated=true;stopScroll();},{passive:true});
window.addEventListener('touchstart',()=>{userNavigated=true;stopScroll();},{passive:true});
window.addEventListener('keydown',e=>{if(['PageDown','PageUp','Home','End','ArrowUp','ArrowDown',' '].includes(e.key)&&!e.defaultPrevented&&!e.target.closest?.('input,textarea,button,summary,[contenteditable]')){userNavigated=true;stopScroll();}});
if(isHome&&'scrollRestoration' in history)history.scrollRestoration='manual';
window.addEventListener('popstate',()=>{const id=location.hash.slice(1)||(isHome?'home':'case-main');navigate(id,{push:false});});
function highlight(){
 highlightFrame=0;
 if(!isHome){const marker=header.getBoundingClientRect().height+100;let active=null;const local=[...document.querySelectorAll('.detail-toc a[href^="#"]')];for(const a of local){const el=document.getElementById(a.hash.slice(1));if(el&&el.getBoundingClientRect().top<=marker)active=a;}for(const a of local){if(a===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}return;}
 const marker=header.getBoundingClientRect().height+Math.min(110,innerHeight*.17);
 let current='home';
 for(const id of chapters){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=marker)current=id;}
 if(scrollY>0&&scrollY+innerHeight>=document.documentElement.scrollHeight-4)current='contact';
 document.querySelectorAll('[data-chapter]').forEach(el=>{
   const on=el.dataset.chapter===current;
   if(el.tagName==='BUTTON'){el.toggleAttribute('data-active',on);}
   else if(on)el.setAttribute('aria-current','location');else el.removeAttribute('aria-current');
 });
 for(const [owner,ids] of Object.entries(destinations)){
   let active=null;if(current===owner)for(const id of ids){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=marker)active=id;}
   document.querySelectorAll('#nav-'+owner+' [data-nav-destination]').forEach(a=>{if(a.dataset.navDestination===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
 }
 for(const group of document.querySelectorAll('.chapter-nav')){
   const owner=group.closest('[data-section-chapter]')?.dataset.sectionChapter;
   let active=null;const links=[...group.querySelectorAll('a[href^="#"]')];
   if(!owner||owner===current)for(const a of links){const el=document.getElementById(a.hash.slice(1));if(el&&el.getBoundingClientRect().top<=marker)active=a;}
   links.forEach(a=>{if(a===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
 }
}
function scheduleHighlight(){if(!highlightFrame)highlightFrame=requestAnimationFrame(highlight);}
window.addEventListener('scroll',scheduleHighlight,{passive:true});
let viewportWidth=innerWidth;
window.addEventListener('resize',()=>{if(innerWidth!==viewportWidth){viewportWidth=innerWidth;close();}scheduleHighlight();},{passive:true});
document.addEventListener('portfolio:archive-ready',scheduleHighlight);
const initial=location.hash.slice(1);
if(initial&&document.getElementById(initial)){
 const restore=()=>{if(!userNavigated&&location.hash==='#'+initial)navigate(initial,{push:false,instant:true,initial:true});};
 if(initial==='travel'||initial==='contact')ready.then(restore);
 else requestAnimationFrame(restore);
}
scheduleHighlight();
})();