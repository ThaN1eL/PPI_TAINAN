// route.js - Clean URL Router for PPI Tainan
class Router {
    constructor(routes) {
      this.routes = routes;
      this.currentPath = '';
      this.init();
    }
  
    init() {
      // Store the initial path to prevent reload loops
      this.currentPath = window.location.pathname;
      if (this.currentPath === '/' || this.currentPath === '') {
        this.currentPath = '/home';
      }
      
      // Handle initial page load based on current pathname
      this.handleInitialLoad();
  
      // Handle browser back/forward buttons
      window.addEventListener('popstate', (e) => {
        const path = window.location.pathname;
        if (path !== this.currentPath) {
          this.currentPath = path;
          this.handleNavigation(path);
        }
      });
  
      // Intercept link clicks for managed routes
      this.setupLinkInterception();
    }
  
    handleInitialLoad() {
      const path = window.location.pathname;
      
      // Special case for root path
      if (path === '/' || path === '') {
        window.history.replaceState({}, '', '/home');
        return;
      }
      
      // Check if we're on an actual HTML page
      if (path.endsWith('.html')) {
        // Convert to clean URL format
        const cleanPath = this.getCleanPathFromHtml(path);
        // Update URL without reloading
        window.history.replaceState({}, '', cleanPath);
      }
      
      // No navigation needed for initial load - we're already on the right page
    }
  
    getCleanPathFromHtml(htmlPath) {
      // Extract filename from path
      const filename = htmlPath.split('/').pop();
      
      // Map HTML filenames to clean paths
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
      // Return the HTML file that corresponds to this clean path
      return this.routes[cleanPath] || this.routes['/404'];
    }
    
    isCurrentPage(path) {
      // Check if the given path matches the current page we're on
      const targetHtml = this.getHtmlFromCleanPath(path);
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      
      // Special case for home page and root
      if (path === '/home' && (currentPage === 'index.html' || currentPage === '')) {
        return true;
      }
      
      return currentPage === targetHtml;
    }
  
    setupLinkInterception() {
      document.addEventListener('click', (e) => {
        // Handle primary navigation links
        if (this.handleSpecialLinks(e)) {
          return; // Special link was handled
        }
        
        // Handle standard anchor links
        const anchor = e.target.closest('a');
        if (anchor) {
          const href = anchor.getAttribute('href');
          
          // Skip external links, hash links, and DANUS link
          if (!href || 
              href.startsWith('http') || 
              href.startsWith('#') || 
              href.startsWith('https://') ||
              href.includes('TAINAN_STORE')) {
            return;
          }
          
          e.preventDefault();
          
          // Convert HTML references to clean paths
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
      // Handle special cases for links without a tags (buttons, spans, etc.)
      const target = e.target;
      const targetId = target.id || '';
      
      // Home links
      if (targetId === 'landing' || targetId === 'landing2' || 
          (target.closest('a') && target.closest('a').id === 'landing') ||
          (target.closest('a') && target.closest('a').id === 'landing2')) {
        e.preventDefault();
        this.navigateTo('/home');
        return true;
      }
      
      // About links
      if (targetId === 'about' || targetId === 'about-btn' || targetId === 'about-footer' ||
          (target.closest('button') && target.closest('button').id === 'about-btn') ||
          (target.closest('a') && target.closest('a').id === 'about')) {
        e.preventDefault();
        this.navigateTo('/about');
        return true;
      }
      
      // News links
      if (targetId === 'news' || targetId === 'news-btn' || targetId === 'news-footer' ||
          (target.closest('button') && target.closest('button').id === 'news-btn') ||
          (target.closest('a') && target.closest('a').id === 'news')) {
        e.preventDefault();
        this.navigateTo('/news');
        return true;
      }

      // DANUS button (special case for external link)
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
        // We're already on the correct page, don't reload
        return;
      }
      
      // Get the HTML file to load
      const htmlFile = this.getHtmlFromCleanPath(path);
      
      // Navigate to the page without creating a new history entry
      window.location.href = htmlFile;
    }
  
    navigateTo(path) {
      // Skip if we're already on this page
      if (path === this.currentPath || this.isCurrentPage(path)) {
        return;
      }
      
      // Update the current path
      this.currentPath = path;
      
      // Update browser history to show clean URL
      window.history.pushState({}, '', path);
      
      // Navigate to the actual HTML page
      this.handleNavigation(path);
    }
  }
  
  // Define routes mapping: clean URLs to actual HTML files
  const routes = {
    '/home': 'index.html',
    '/about': 'about.html',
    '/news': 'news.html',
    '/404': '404.html'
  };
  
  // Initialize the router when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    window.siteRouter = new Router(routes);
  });