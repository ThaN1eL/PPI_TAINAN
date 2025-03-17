document.addEventListener('DOMContentLoaded', function() {
    const pageMapping = {
        '/': 'index.html',
        '/home': 'index.html',
        '/about': 'about.html',
        '/news': 'news.html'
    };
    
    function handleNavigation() {
        const path = window.location.pathname;
        
        if (path.endsWith('.html')) return;
        
        if (pageMapping[path]) {
            window.location.replace(pageMapping[path]);
            return;
        }
        
        if (path !== '/404') {
            window.location.replace('404.html');
        }
    }
    
    handleNavigation();
    
    document.querySelectorAll('#landing, #landing2').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault(); 
            window.location.href = 'index.html';
        });
    });

    document.querySelectorAll('#about, #about-btn, #about-footer').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault(); 
            window.location.href = 'about.html'; 
        });
    });

    document.querySelectorAll('#news, #news-btn, #news-footer').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault(); 
            window.location.href = 'news.html'; 
        });
    });

    const danusBtn = document.getElementById('danus-btn');
    if (danusBtn) {
        danusBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'https://than1el.github.io/PPI_TAINAN_STORE';
        });
    }
    
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