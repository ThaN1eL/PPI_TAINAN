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
            
            setTimeout(() => {
                const modalContent = document.querySelector('.modal-content .modal-right');
                if (modalContent) {
                    const modalLinks = modalContent.querySelectorAll('a');
                    modalLinks.forEach(link => {
                        if (link.hostname !== window.location.hostname) {
                            link.setAttribute('target', '_blank');
                            link.setAttribute('rel', 'noopener noreferrer');
                        }
                        
                        link.addEventListener('click', (e) => {
                            e.stopPropagation();
                        });
                        
                        link.classList.add('modal-link');
                    });
                }
            }, 100);
        },

        closeModal() {
            this.modalOpen = false;
        },

        init() {
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
        }
    }
}