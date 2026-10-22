    (() => {
      const button = document.getElementById('langButton');
      const titleEN = 'Shirui Ye — Developer & Open Source';
      const titleZH = '叶石瑞 — 开发者与开源项目';
      const rows = [...document.querySelectorAll('.archive-row')];
      const filters = [...document.querySelectorAll('.filter-button')];
      const archiveCount = document.getElementById('archive-count');
      let activeFilter = 'all';
      function updateCount() {
        const visible = rows.filter(row => !row.hidden).length;
        archiveCount.textContent = document.documentElement.lang === 'zh-CN' ? `${visible} 个项目` : `${visible} project${visible === 1 ? '' : 's'}`;
      }
      const apply = (lang) => {
        document.documentElement.lang = lang;
        document.title = lang === 'zh-CN' ? titleZH : titleEN;
        button.setAttribute('aria-label', lang === 'zh-CN' ? '切换为英文' : 'Switch to Chinese');
        document.getElementById('archive-filters').setAttribute('aria-label',lang === 'zh-CN' ? '筛选项目类别' : 'Filter projects by category');
        updateCount();
        try { localStorage.setItem('shirui-portfolio-lang',lang); } catch(e) {}
      };
      let saved;
      try { saved = localStorage.getItem('shirui-portfolio-lang'); } catch(e) {}
      const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
      apply(saved === 'zh-CN' || saved === 'en' ? saved : (browserLang.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en'));
      button.addEventListener('click', () => apply(document.documentElement.lang === 'en' ? 'zh-CN' : 'en'));
      document.getElementById('archive-toolbar').hidden = false;
      filters.forEach(filter => filter.addEventListener('click', () => {
        activeFilter = filter.dataset.filter;
        filters.forEach(item => item.setAttribute('aria-pressed', String(item === filter)));
        rows.forEach(row => { row.hidden = activeFilter !== 'all' && row.dataset.category !== activeFilter; });
        updateCount();
      }));
      document.getElementById('copyrightYear').textContent = String(new Date().getFullYear());
      if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('motion-ready');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => { if(entry.isIntersecting){ entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
        }, {threshold: .06});
        document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
      } else { document.querySelectorAll('.fade-up').forEach(el => el.classList.add('is-visible')); }
    })();
