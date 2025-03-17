document.addEventListener('DOMContentLoaded', function() {
    // Main page mapping for static site
    const pageMapping = {
        '/': 'index.html',
        '/index': 'index.html',
        '/about': 'about.html',
        '/news': 'news.html'
    };
    
    // Handle navigation without .html extension
    function handleNavigation() {
        const path = window.location.pathname;
        
        // If we're already showing a .html page, don't do anything
        if (path.endsWith('.html')) return;
        
        // If the path has a mapping, redirect to the correct HTML file
        if (pageMapping[path]) {
            window.location.replace(pageMapping[path]);
            return;
        }
        
        // For unknown paths, redirect to 404.html
        if (path !== '/404') {
            window.location.replace('404.html');
        }
    }
    
    // Run URL check on page load
    handleNavigation();
    
    // Redirect to index.html
    document.querySelectorAll('#landing, #landing2').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault(); 
            window.location.href = 'index.html';
        });
    });

    // About Us links
    document.querySelectorAll('#about, #about-btn, #about-footer').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault(); 
            window.location.href = 'about.html'; 
        });
    });

    // News links
    document.querySelectorAll('#news, #news-btn, #news-footer').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault(); 
            window.location.href = 'news.html'; 
        });
    });

    // DANUS Store link
    const danusBtn = document.getElementById('danus-btn');
    if (danusBtn) {
        danusBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'https://than1el.github.io/PPI_TAINAN_STORE';
        });
    }
    
    // Make sure scroll to top works
    const homeLinks = document.querySelectorAll('a[href="#home"]');
    homeLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});