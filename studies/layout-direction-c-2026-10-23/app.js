(()=>{
'use strict';
const viewButtons=[...document.querySelectorAll('[data-view]')];
const views={a:document.getElementById('a'),b:document.getElementById('b'),c:document.getElementById('c')};
function show(view,save=true){
 const choice=view in views?view:'c';
 for(const [name,node] of Object.entries(views))node.hidden=name!==choice;
 viewButtons.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.view===choice)));
 const names={a:'原版精修',b:'创意探索',c:'自然布局'};
 document.title='叶石瑞 · 视觉研究 / '+choice.toUpperCase()+' — '+names[choice];
 if(save){
  const url=new URL(location.href);url.searchParams.set('v',choice);url.hash='';
  history.replaceState(null,'',url);
 }
}
viewButtons.forEach(btn=>btn.addEventListener('click',()=>{
 show(btn.dataset.view);
 window.scrollTo({top:0,behavior:'instant'});
}));
const frames={
 compare:{src:'./assets/vision-demo.png',link:'https://github.com/ysr666/ysr666.github.io/blob/main/assets/vision-demo.png',alt:'Vision Router 真实项目界面：图像像素比对',caption:'项目中的实际像素比对示例，并非平均性能指标。'},
 settings:{src:'./assets/vision-settings.png',link:'https://github.com/ysr666/ysr666.github.io/blob/main/assets/vision-settings.png',alt:'Vision Router 实际设置界面截图',caption:'真实项目设置界面。部分后端涉及云服务，使用前需要了解数据流向。'}
};
const previewImage=document.getElementById('c-evidence-img');
const imageLink=document.getElementById('c-evidence-open');
const caption=document.getElementById('c-evidence-caption');
const frameButtons=[...document.querySelectorAll('[data-c-frame]')];
function setFrame(key){
 const frame=frames[key];if(!frame)return;
 previewImage.src=frame.src;previewImage.alt=frame.alt;
 imageLink.href=frame.link;
 caption.textContent=frame.caption;
 frameButtons.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.cFrame===key)));
}
frameButtons.forEach(btn=>btn.addEventListener('click',()=>setFrame(btn.dataset.cFrame)));
setFrame('compare');
show(new URLSearchParams(location.search).get('v'),false);
})();