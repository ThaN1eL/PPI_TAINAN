//DataFilter
document.addEventListener('DOMContentLoaded', () => {

    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    } else {
        console.error('Feather icons failed to load');
    }
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            button.classList.add('active');

            const filter = button.dataset.filter;

            newsItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});


//Newsletter
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email-input');
    const formMessage = document.getElementById('form-message');
    
    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        
        // Validate email
        const email = emailInput.value.trim();
        
        if (!email) {
            formMessage.textContent = 'Please enter your email address';
            formMessage.classList.add('error');
            return;
        }
        
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Please enter a valid email address';
            formMessage.classList.add('error');
            return;
        }
        
        // Set loading state
        const submitBtn = newsletterForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i data-feather="loader" class="spinner"></i> Subscribing...';
        feather.replace();
        
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxXI4eF1FX3WQTjGgZYTBVtlWATAebmmgFWPxOFZtA1kzbD8cZn6c9QdBN2bkjdEI9V/exec';
        
        const formData = new FormData();
        formData.append('email', email);
        
        fetch(scriptURL, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            formMessage.textContent = 'Thank you for subscribing!';
            formMessage.classList.add('success');
            emailInput.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
            formMessage.textContent = 'Something went wrong. Please try again later.';
            formMessage.classList.add('error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            feather.replace();
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    if (isIOS) {
        document.body.classList.add('ios-device');
        
        const fixIOSModal = function() {
            const modals = document.querySelectorAll('.modal-content');
            modals.forEach(modal => {
                modal.style.top = '50%';
                modal.style.left = '50%';
                modal.style.transform = 'translate(-50%, -50%)';
            });
        };
        
        document.querySelectorAll('.view-detail-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                setTimeout(fixIOSModal, 10);
            });
        });
    }
});