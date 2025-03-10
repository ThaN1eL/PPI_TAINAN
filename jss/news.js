//DataFilter
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active state from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active state to clicked button
            button.classList.add('active');

            // Get the filter category
            const filter = button.dataset.filter;

            // Show/hide news items based on filter
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
        
        // Reset message
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
        
        // Form submission using Google Apps Script
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxLYdPvHQj86nzWmmk8bCfyTpUknDtWXS8QVY9z2S-vuflkMDYfBXtWBFvQML-tdtK5/exec';
        
        // Prepare form data
        const formData = new FormData();
        formData.append('email', email);
        
        // Send to Google Script
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
            // Success
            formMessage.textContent = 'Thank you for subscribing!';
            formMessage.classList.add('success');
            emailInput.value = '';
        })
        .catch(error => {
            // Error
            console.error('Error:', error);
            formMessage.textContent = 'Something went wrong. Please try again later.';
            formMessage.classList.add('error');
        })
        .finally(() => {
            // Reset button state
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