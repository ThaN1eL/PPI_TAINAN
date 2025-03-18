/*Parallax*/
let listBg = document.querySelectorAll('.bg');
let listTab = document.querySelectorAll('.tab');
let titleBanner = document.querySelector('.banner h1');

window.addEventListener("scroll", (event) => {
    let top = this.scrollY;
    listBg.forEach((bg, index) => {
        if(index != 0 && index != 8){   
            bg.style.transform = `translateY(${(top*index/2)}px)`;
        }else if(index == 0){
            bg.style.transform = `translateY(${(top/3)}px)`;
        }
    })

    titleBanner.style.transform = `translateY(${(top*4/2)}px)`;

    /* parallax scroll,when position less than 550
    from scrollbar position add active class to animate 
    and vice versa*/
    listTab.forEach(tab =>{
        if(tab.offsetTop - top < 550){
            tab.classList.add('active');
        }else{
            tab.classList.remove('active');
        }
    })
});  

/* fixes #home*/ 
document.querySelector('a[href="#home"]').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



/* Hamburger Menu */ 
document.addEventListener('DOMContentLoaded', function() {
    // Init Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    } else { 
        console.error('Feather icons failed to load'); 
    }
    
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.querySelector('.desktop-sidebar');
    const overlay = document.getElementById('overlay');
    
    // Show sidebar menu
    menuBtn.addEventListener('click', function() {
        sidebar.classList.add('show');
        overlay.classList.add('active');
        menuBtn.style.display = 'none';
        closeBtn.style.display = 'block';
    });
    
    // Hide sidebar menu
    closeBtn.addEventListener('click', function() {
        closeSidebar();
    });
    
    // Close sidebar when clicking on overlay
    overlay.addEventListener('click', function() {
        closeSidebar();
    });
    
    // Close sidebar when clicking on a link
    document.querySelectorAll('.desktop-sidebar a').forEach(function(link) {
        link.addEventListener('click', function() {
            closeSidebar();
        });
    });
    
    // Function to close sidebar
    function closeSidebar() {
        sidebar.classList.remove('show');
        overlay.classList.remove('active');
        menuBtn.style.display = 'block';
        closeBtn.style.display = 'none';
    }
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    
    document.querySelectorAll('.desktop-sidebar a').forEach(function(link) {
        const href = link.getAttribute('href');
        
        if (currentPage === '') {
            // If we are on index page or root
            if (href === '#home' || href === 'index.html') {
                link.classList.add('active');
            }
        } else if (href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
    
    // Ensure parallax still works
    const banner = document.querySelector('.banner');
    if (banner) {
        document.addEventListener('scroll', function() {
            // Keep parallax effect active even when sidebar is open
            if (sidebar.classList.contains('show')) {
                banner.style.pointerEvents = 'none';
            } else {
                banner.style.pointerEvents = 'auto';
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
});


//GlowEffect Adjustment
document.addEventListener('DOMContentLoaded', function() {
    const titleBanner = document.querySelector('.banner h1');
    
    if (titleBanner) {
      setTimeout(() => {
        titleBanner.classList.add('text-glow-animation');
      }, 500); 
      
      
      document.addEventListener('mousemove', (e) => {
        if (e.clientY < window.innerHeight / 2) {
          const distanceFromCenter = Math.abs(e.clientX - window.innerWidth / 2);
          const maxDistance = window.innerWidth / 2;
          
          const intensity = 1 - (distanceFromCenter / maxDistance);
          
          if (intensity > 0.5) { 
            titleBanner.style.textShadow = `
              0 0 ${10 + intensity * 15}px rgba(255, 255, 255, ${0.5 + intensity * 0.3}),
              0 0 ${20 + intensity * 20}px rgba(255, 255, 255, ${0.3 + intensity * 0.3}),
              0 0 ${30 + intensity * 20}px rgba(255, 199, 59, ${0.2 + intensity * 0.3})
            `;
          } else {
            titleBanner.style.textShadow = '';
          }
        } else {
          titleBanner.style.textShadow = '';
        }
      });
    }
  });