document.addEventListener('DOMContentLoaded', function() {
    const pageMapping = {
        '/': 'index.html',
        '/index': 'index.html',
        '/about': 'about.html',
        '/news': 'news.html',
        '/404': '404.html'
    };
    
    function handleIncomingNavigation() {
        const path = window.location.pathname;
        
        if (path.endsWith('.html')) return;
        
        if (pageMapping[path]) {
            fetch(pageMapping[path])
                .then(response => response.text())
                .then(html => {
                    document.open();
                    document.write(html);
                    document.close();
                    initializeEventListeners();
                })
                .catch(() => {
                    window.location.replace('404.html');
                });
            return;
        }
        
        if (path !== '/404') {
            window.location.replace('/404');
        }
    }
    
    function initializeEventListeners() {
        document.querySelectorAll('#landing, #landing2').forEach(function(element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                navigateTo('/');
            });
        });

        document.querySelectorAll('#about, #about-btn, #about-footer').forEach(function(element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                navigateTo('/about');
            });
        });

        document.querySelectorAll('#news, #news-btn, #news-footer').forEach(function(element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                navigateTo('/news');
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
        
        document.querySelectorAll('a').forEach(function(link) {
            const href = link.getAttribute('href');
            if (href && href.endsWith('.html') && !href.includes('://')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const cleanUrl = href.replace('.html', '');
                    navigateTo(cleanUrl);
                });
            }
        });
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
    
    function navigateTo(url) {
        history.pushState(null, null, url);
        
        const htmlFile = pageMapping[url];
        if (htmlFile) {
            fetch(htmlFile)
                .then(response => response.text())
                .then(html => {
                    document.open();
                    document.write(html);
                    document.close();
                    initializeEventListeners();
                })
                .catch(() => {
                    window.location.replace('/404');
                });
        } else {
            window.location.replace('/404');
        }
    }
    
    window.addEventListener('popstate', function() {
        handleIncomingNavigation();
    });
    
    handleIncomingNavigation();
    initializeEventListeners();
});