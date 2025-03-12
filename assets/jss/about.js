document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.rotating-logo');
    const glassCards = document.querySelectorAll('.glass-card');
    let rotation = 0;
    let lastScrollTop = 0;
    let animationActive = false;

    // Function to handle rotation on scroll
    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Check if user is scrolling down or up
        if (currentScrollTop > lastScrollTop) {
            // Scrolling down
            rotation += 2;
        } else {
            // Scrolling up
            rotation -= 2;
        }
        
        // Apply rotation to logo
        logo.style.transform = `rotate(${rotation}deg)`;
        
        // Update last scroll position
        lastScrollTop = currentScrollTop;
        
        // Continue animation only if still scrolling
        if (animationActive) {
            requestAnimationFrame(handleScroll);
        }
    }

    // Start animation when scrolling starts
    window.addEventListener('scroll', function() {
        if (!animationActive) {
            animationActive = true;
            requestAnimationFrame(handleScroll);
            
            // Set a timeout to stop the animation after scrolling stops
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(function() {
                animationActive = false;
            }, 100);
        }
        
        // Add parallax effect to background shapes
        const scrollPosition = window.pageYOffset;
        
        // Subtle movement for background shapes
        const shape1 = document.querySelector('.shape1');
        const shape2 = document.querySelector('.shape2');
        const shape3 = document.querySelector('.shape3');
        
        if (shape1 && shape2 && shape3) {
            shape1.style.transform = `translate(${scrollPosition * 0.03}px, ${scrollPosition * 0.02}px) rotate(${scrollPosition * 0.01}deg)`;
            shape2.style.transform = `translate(-${scrollPosition * 0.02}px, -${scrollPosition * 0.03}px) rotate(-${scrollPosition * 0.01}deg)`;
            shape3.style.transform = `translate(-50%, -50%) scale(${1 + scrollPosition * 0.0005}) rotate(${scrollPosition * 0.02}deg)`;
        }
    });

    // Add animation to glass cards when they come into view
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    function handleVisibleElements() {
        glassCards.forEach(card => {
            if (isElementInViewport(card)) {
                card.classList.add('visible');
            }
        });
    }
    
    // Initial check for visible elements
    handleVisibleElements();
    
    // Check when scrolling
    window.addEventListener('scroll', handleVisibleElements);

    // Add hover effect for the logo
    logo.addEventListener('mouseenter', function() {
        this.style.animation = 'rotate 2s linear infinite';
    });

    logo.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
        // Maintain the current rotation
        this.style.transform = `rotate(${rotation}deg)`;
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('.navbar-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});


// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    // Get all department accordion headers
    const departmentHeaders = document.querySelectorAll('.department-header');
    
    // Add click event to each header
    departmentHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on parent accordion
            const parentAccordion = this.parentElement;
            parentAccordion.classList.toggle('active');
            
            // Optional: Close other accordions when one is opened
            if (parentAccordion.classList.contains('active')) {
                departmentHeaders.forEach(otherHeader => {
                    if (otherHeader !== this) {
                        otherHeader.parentElement.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Add glass card animation to organization section
    const organizationContainer = document.querySelector('.organization-container');
    if (organizationContainer) {
        // Check if the element is in viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }
        
        // Add visible class when in viewport
        function handleVisibleElements() {
            if (isElementInViewport(organizationContainer)) {
                organizationContainer.classList.add('visible');
            }
        }
        
        // Initial check
        handleVisibleElements();
        
        // Check on scroll
        window.addEventListener('scroll', handleVisibleElements);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.querySelector('.sidebar');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // Function to open the sidebar
    function openSidebar() {
        sidebar.classList.add('active');
        menuOverlay.classList.add('active');
        menuBtn.style.display = 'none';
        closeBtn.style.display = 'flex';
    }
    
    // Function to close the sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        menuOverlay.classList.remove('active');
        closeBtn.style.display = 'none';
        menuBtn.style.display = 'flex';
    }
    
    // Event listeners for menu buttons
    menuBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    
    // Close menu when clicking outside
    menuOverlay.addEventListener('click', closeSidebar);
    
    // Close menu when clicking a menu item
    const menuLinks = document.querySelectorAll('.sidebar-content a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // Initialize Feather icons (if not already initialized elsewhere)
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});