class Router {
    constructor(routes) {
      this.routes = routes;
      this.currentPath = '';
      this.init();
    }
  
    init() {
      //prevent reload loops
      this.currentPath = window.location.pathname;
      if (this.currentPath === '/' || this.currentPath === '') {
        this.currentPath = '/home';
      }
      
      // Handle initial page load
      this.handleInitialLoad();
  
      // Handle browser back/forward buttons
      window.addEventListener('popstate', (e) => {
        const path = window.location.pathname;
        if (path !== this.currentPath) {
          this.currentPath = path;
          this.handleNavigation(path);
        }
      });
  
      
      this.setupLinkInterception();
    }
  
    handleInitialLoad() {
      const path = window.location.pathname;
      
      
      if (path === '/' || path === '') {
        window.history.replaceState({}, '', '/home');
        return;
      }
      
      
      if (path.endsWith('.html')) {
        
        const cleanPath = this.getCleanPathFromHtml(path);
       
        window.history.replaceState({}, '', cleanPath);
      }
      
     
    }
  
    getCleanPathFromHtml(htmlPath) {
      
      const filename = htmlPath.split('/').pop();
      
      
      switch (filename) {
        case 'index.html':
          return '/home';
        case 'about.html':
          return '/about';
        case 'news.html':
          return '/news';
        default:
          return '/404';
      }
    }

    getHtmlFromCleanPath(cleanPath) {
      return this.routes[cleanPath] || this.routes['/404'];
    }
    
    isCurrentPage(path) {
      const targetHtml = this.getHtmlFromCleanPath(path);
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      
      if (path === '/home' && (currentPage === 'index.html' || currentPage === '')) {
        return true;
      }
      
      return currentPage === targetHtml;
    }
  
    setupLinkInterception() {
      document.addEventListener('click', (e) => {
        if (this.handleSpecialLinks(e)) {
          return; 
        }
        
        const anchor = e.target.closest('a');
        if (anchor) {
          const href = anchor.getAttribute('href');
          
          if (!href || 
              href.startsWith('http') || 
              href.startsWith('#') || 
              href.startsWith('https://') ||
              href.includes('TAINAN_STORE')) {
            return;
          }
          
          e.preventDefault();
          
          if (href.endsWith('.html')) {
            const cleanPath = this.getCleanPathFromHtml(href);
            this.navigateTo(cleanPath);
          } else {
            this.navigateTo(href);
          }
        }
      });
    }
  
    handleSpecialLinks(e) {
      const target = e.target;
      const targetId = target.id || '';
      
      // Home
      if (targetId === 'landing' || targetId === 'landing2' || 
          (target.closest('a') && target.closest('a').id === 'landing') ||
          (target.closest('a') && target.closest('a').id === 'landing2')) {
        e.preventDefault();
        this.navigateTo('/');
        return true;
      }
      
      // About
      if (targetId === 'about' || targetId === 'about-btn' || targetId === 'about-footer' ||
          (target.closest('button') && target.closest('button').id === 'about-btn') ||
          (target.closest('a') && target.closest('a').id === 'about')) {
        e.preventDefault();
        this.navigateTo('/about');
        return true;
      }
      
      // News
      if (targetId === 'news' || targetId === 'news-btn' || targetId === 'news-footer' ||
          (target.closest('button') && target.closest('button').id === 'news-btn') ||
          (target.closest('a') && target.closest('a').id === 'news')) {
        e.preventDefault();
        this.navigateTo('/news');
        return true;
      }

      // DANUS
      if (targetId === 'danus-btn' || 
          (target.closest('button') && target.closest('button').id === 'danus-btn')) {
        e.preventDefault();
        window.location.href = 'https://than1el.github.io/PPI_TAINAN_STORE';
        return true;
      }
  
      return false;
    }
  
    handleNavigation(path) {
      if (this.isCurrentPage(path)) {
        return;
      }
      
      const htmlFile = this.getHtmlFromCleanPath(path);
      
      window.location.href = htmlFile;
    }
  
    navigateTo(path) {
      if (path === this.currentPath || this.isCurrentPage(path)) {
        return;
      }
      
      this.currentPath = path;
      
      window.history.pushState({}, '', path);
      
      this.handleNavigation(path);
    }
  }
  
  // Define routes mapping
  const routes = {
    '/home': 'index.html',
    '/about': 'about.html',
    '/news': 'news.html',
    '/404': '404.html'
  };
  
  
  document.addEventListener('DOMContentLoaded', () => {
    window.siteRouter = new Router(routes);
  });