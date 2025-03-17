class Router {
    constructor(routes) {
      this.routes = routes;
      this.currentPath = '';
      this.init();
    }
  
    init() {
      // Get the current path from the URL
      this.currentPath = window.location.pathname;
      
      // Set default path if at root
      if (this.currentPath === '/' || this.currentPath === '') {
        this.currentPath = '/home';
        window.history.replaceState({}, '', '/home');
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
  
      // Setup link interception
      this.setupLinkInterception();
    }
  
    handleInitialLoad() {
      const path = window.location.pathname;
      
      // Map clean paths to actual HTML files
      const htmlFile = this.getHtmlFromCleanPath(path);
      
      // If we're already on the correct HTML file for this path, do nothing
      if (this.isCurrentHtmlFile(htmlFile)) {
        return;
      }
      
      // If we're at a path that doesn't match our current HTML file,
      // we need to redirect to the correct HTML file
      if (htmlFile) {
        window.location.href = htmlFile;
      }
    }
  
    // Check if we're currently on the specified HTML file
    isCurrentHtmlFile(htmlFile) {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      return currentPage === htmlFile;
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
      // Strip any leading and trailing slashes and get just the path
      const path = cleanPath.replace(/^\/+|\/+$/g, '');
      
      // Map path to HTML file
      switch (path) {
        case '':
        case 'home':
          return 'index.html';
        case 'about':
          return 'about.html';
        case 'news':
          return 'news.html';
        default:
          return '404.html';
      }
    }
    
    isCurrentPage(path) {
      // Get the target HTML file for this path
      const targetHtml = this.getHtmlFromCleanPath(path);
      
      // Get the current HTML file
      const currentFile = window.location.pathname.split('/').pop() || 'index.html';
      
      // Special case for home page
      if (path === '/home' && (currentFile === 'index.html' || currentFile === '')) {
        return true;
      }
      
      return currentFile === targetHtml;
    }
  
    setupLinkInterception() {
      document.addEventListener('click', (e) => {
        if (this.handleSpecialLinks(e)) {
          return; 
        }
        
        const anchor = e.target.closest('a');
        if (anchor) {
          const href = anchor.getAttribute('href');
          
          // Don't intercept external links, hash links, or DANUS links
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
        this.navigateTo('/home');
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
  
  // Define routes mapping (not actually used in this implementation)
  const routes = {
    '/home': 'index.html',
    '/about': 'about.html',
    '/news': 'news.html',
    '/404': '404.html'
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    window.siteRouter = new Router(routes);
  });