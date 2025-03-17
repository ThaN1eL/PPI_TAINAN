document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    
    handleCurrentRoute();
});

function setupNavigation() {
    document.querySelectorAll('#landing, #landing2, a[href="#home"], a[href="index.html"], a[href="/"]').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('/');
        });
    });

    document.querySelectorAll('#about, #about-btn, #about-footer, a[href="about.html"], a[href="/about"]').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('/about');
        });
    });

    document.querySelectorAll('#news, #news-btn, #news-footer, a[href="news.html"], a[href="/news"]').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('/news');
        });
    });

    const danusBtn = document.getElementById('danus-btn');
    if (danusBtn) {
        danusBtn.addEventListener('click', function(e) {
        });
    }
}

function handleCurrentRoute() {
    const path = window.location.pathname;
    
    if (path.endsWith('.html')) {
        let cleanPath;
        if (path.endsWith('index.html')) {
            cleanPath = '/';
        } else if (path.endsWith('about.html')) {
            cleanPath = '/about';
        } else if (path.endsWith('news.html')) {
            cleanPath = '/news';
        }
        
        if (cleanPath) {
            history.replaceState(null, '', cleanPath);
        }
    }
}

function navigateTo(path) {
    let targetPage;
    switch(path) {
        case '/':
            targetPage = 'index.html';
            break;
        case '/about':
            targetPage = 'about.html';
            break;
        case '/news':
            targetPage = 'news.html';
            break;
        default:
            targetPage = '404.html';
    }
    
    history.pushState(null, '', path);
    
    window.location.href = targetPage;
}