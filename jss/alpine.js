function app() {
    return {
        modalOpen: false,
        modalTitle: '',
        modalMainImage: '',
        modalAdditionalImages: [],
        modalDescription: '',

        openModal(title, description, mainImage, additionalImages = []) {
            this.modalTitle = title;
            this.modalDescription = description;
            this.modalMainImage = mainImage;
            this.modalAdditionalImages = additionalImages;
            this.modalOpen = true;
            
            // ADD THIS LINE to fix scrolling
            document.body.style.overflow = 'hidden';
        },

        closeModal() {
            this.modalOpen = false;
            
            // ADD THIS LINE to restore scrolling
            document.body.style.overflow = '';
        },

        init() {
            // Existing filtering functionality remains the same
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
            
            // Fix for iOS Safari 100vh issue
            const setViewportHeight = () => {
                document.documentElement.style.setProperty(
                    '--vh', 
                    `${window.innerHeight * 0.01}px`
                );
            };
            
            // Set on load
            setViewportHeight();
            
            // Update on resize
            window.addEventListener('resize', setViewportHeight);
            
            // Detect iOS devices for special styling
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (isIOS) {
                document.body.classList.add('ios-device');
            }
        }
    }

// Example of how to modify news items to use the new modal
document.addEventListener('DOMContentLoaded', () => {
    const viewDetailButtons = document.querySelectorAll('.view-detail-btn');
    
    viewDetailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newsItem = button.closest('.news-item');
            const title = newsItem.querySelector('h3').textContent;
            const mainImage = newsItem.querySelector('img').src;
            
            // You can customize these details as needed
            const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
            
            // Additional images (you can modify this)
            const additionalImages = [
                mainImage,
                mainImage.replace('logo.png', 'alt1.png'),
                mainImage.replace('logo.png', 'alt2.png')
            ];
            
            // Assuming you have a global Alpine component
            window.__x.$data.openModal(
                title, 
                description, 
                mainImage, 
                additionalImages
            );
        });
    });
})};