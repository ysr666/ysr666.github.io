(()=>{
const all=[...document.querySelectorAll('[data-view]')];const a=document.getElementById('a'),b=document.getElementById('b');
function show(view,save=true){
 const choice=view==='b'?'b':'a';
 a.hidden=choice!=='a';b.hidden=choice!=='b';
 all.forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.view===choice)));
 document.title='叶石瑞 · 视觉研究 / '+choice.toUpperCase()+' — '+(choice==='a'?'原版精修':'创意探索');
 if(save){const next=new URL(location.href);next.searchParams.set('v',choice);history.replaceState(null,'',next);}
}
all.forEach(btn=>btn.addEventListener('click',()=>{show(btn.dataset.view);window.scrollTo({top:0,behavior:'instant'})}));
show(new URLSearchParams(location.search).get('v'),false);
})();