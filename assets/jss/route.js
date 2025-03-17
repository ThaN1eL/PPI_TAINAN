document.addEventListener('DOMContentLoaded', function() {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
    
    setupRoutes();
    setupSidebarLinks();
  });
  
  /**
   */
  function setupRoutes() {
    if (window.location.pathname.endsWith('.html')) {
      const cleanPath = window.location.pathname.replace(/\.html$/, '');
      window.history.replaceState({}, document.title, cleanPath);
    }
    
    if (!isValidRoute(window.location.pathname) && !window.location.pathname.endsWith('.html')) {
      if (!window.location.pathname.endsWith('/404')) {
        navigateTo('/404');
      }
    }
  }
  
  /**
   */
  function setupSidebarLinks() {
    const landingLinks = document.querySelectorAll('#landing, #landing2');
    landingLinks.forEach(link => {
      if (link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          navigateTo('/');
        });
      }
    });
    
    const aboutLinks = document.querySelectorAll('#about, #about-btn');
    aboutLinks.forEach(link => {
      if (link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          navigateTo('/about');
        });
      }
    });
    
    const newsLinks = document.querySelectorAll('#news, #news-btn');
    newsLinks.forEach(link => {
      if (link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          navigateTo('/news');
        });
      }
    });
    
    const danusBtn = document.getElementById('danus-btn');
    if (danusBtn) {
      danusBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'https://than1el.github.io/PPI_TAINAN_STORE';
      });
    }
    
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.querySelector('.sidebar, .desktop-sidebar');
    const overlay = document.getElementById('overlay');
    
    if (menuBtn && closeBtn && sidebar) {
      menuBtn.addEventListener('click', function() {
        sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        menuBtn.style.display = 'none';
        closeBtn.style.display = 'block';
      });
      
      closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        menuBtn.style.display = 'block';
        closeBtn.style.display = 'none';
      });
      
      if (overlay) {
        overlay.addEventListener('click', function() {
          sidebar.classList.remove('active');
          overlay.classList.remove('active');
          menuBtn.style.display = 'block';
          closeBtn.style.display = 'none';
        });
      }
    }
    
    const homeLinks = document.querySelectorAll('a[href="#home"]');
    homeLinks.forEach(link => {
      if (link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          navigateTo('/');
        });
      }
    });
    
    const homeBtn = document.querySelector('.home-btn');
    if (homeBtn) {
      homeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        navigateTo('/');
      });
    }
  }
  
  /**
   * @param {string} route 
   */
  function navigateTo(route) {
    let baseUrl = window.location.origin;
    let targetUrl;
    
    switch (route) {
      case '/':
        targetUrl = baseUrl + '/index.html';
        break;
      case '/about':
        targetUrl = baseUrl + '/about.html';
        break;
      case '/news':
        targetUrl = baseUrl + '/news.html';
        break;
      case '/404':
        targetUrl = baseUrl + '/404.html';
        break;
      default:
        targetUrl = baseUrl + route + '.html';
    }
    
    window.location.href = targetUrl;
  }
  
  /**
   * @param {string} route 
   * @returns {boolean} 
   */
  function isValidRoute(route) {
    const validRoutes = ['/', '/index', '/about', '/news', '/404'];
    return validRoutes.includes(route) || validRoutes.includes(route + '/');
  }
  
  /**
   * @param {string} path 
   * @returns {string} 
   */
  function getPageName(path) {
    let pageName = path.split('/').pop();
    
    if (pageName === '' || pageName === '/') {
      return 'index';
    }
    
    return pageName.replace('.html', '');
  }
  
  window.addEventListener('popstate', function() {
    if (!isValidRoute(window.location.pathname)) {
      navigateTo('/404');
    }
  });