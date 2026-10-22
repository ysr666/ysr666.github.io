(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const button=document.querySelector('#lang-toggle');
  let lang='zh';
  try{lang=localStorage.getItem('portfolio-lang')==='en'?'en':'zh';}catch(_){}
  const render=()=>{
    document.documentElement.lang=lang==='zh'?'zh-CN':'en';
    document.querySelectorAll('[data-zh][data-en]').forEach(el=>{
      el.textContent=el.getAttribute('data-'+lang);
    });
    button.textContent=lang==='zh'?'EN':'中文';
    button.title=lang==='zh'?'Switch to English':'切换为中文';
    document.title=lang==='zh'?'叶石瑞 / Shirui Ye · 个人主页':'Shirui Ye · Personal website';
  };
  button.addEventListener('click',()=>{
    lang=lang==='zh'?'en':'zh';
    try{localStorage.setItem('portfolio-lang',lang)}catch(_){}
    render();
  });
  render();
})();
