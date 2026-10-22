(() => {
  'use strict';
  const toggle = document.querySelector('#lang-toggle');
  let lang='zh';
  try { lang=localStorage.getItem('portfolio-lang')==='en'?'en':'zh'; } catch (_) {}
  function render() {
    document.documentElement.lang=lang==='zh'?'zh-CN':'en';
    document.querySelectorAll('[data-zh][data-en]').forEach(el => {
      el.textContent=el.getAttribute('data-'+lang);
    });
    document.querySelectorAll('[data-alt-zh][data-alt-en]').forEach(img => {
      img.alt=img.getAttribute('data-alt-'+lang);
    });
    document.querySelectorAll('[data-aria-label-zh][data-aria-label-en]').forEach(el => {
      el.setAttribute('aria-label',el.getAttribute('data-aria-label-'+lang));
    });
    toggle.textContent=lang==='zh'?'EN':'中文';
    toggle.title=lang==='zh'?'Switch to English':'切换为中文';
    document.title=document.body.dataset.pageTitle+' · '+(lang==='zh'?'叶石瑞':'Shirui Ye');
  }
  toggle.addEventListener('click',() => {
    lang=lang==='zh'?'en':'zh';
    try {localStorage.setItem('portfolio-lang',lang)} catch(_){}
    render();
  });
  render();
})();
