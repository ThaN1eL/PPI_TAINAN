function app() {
    return {
        modalOpen: false,
        modalTitle: '',
        modalMainMedia: '',
        modalMediaType: 'image',
        modalAdditionalMedia: [],
        modalDescription: '',
        videoMuted: false,
        currentPage: 1,
        itemsPerPage: 8,
        currentFilter: 'all',

        getMediaType(src) {
            const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
            const ext = src.substring(src.lastIndexOf('.')).toLowerCase();
            return videoExtensions.includes(ext) ? 'video' : 'image';
        },

        setMainMedia(src, type) {
            this.modalMainMedia = src;
            this.modalMediaType = type;
            
            if (type === 'video') {
                this.videoMuted = false;
                
                setTimeout(() => {
                    const videoElement = document.querySelector('.modal-content video');
                    if (videoElement) {
                        videoElement.play().catch(e => {
                            console.log('Autoplay prevented when switching media:', e);
                            if (e.name === 'NotAllowedError') {
                                videoElement.muted = true;
                                this.videoMuted = true;
                                
                                videoElement.play().catch(err => {
                                    console.log('Muted autoplay also prevented when switching media:', err);
                                    this.videoMuted = false;
                                });
                            }
                        });
                    }
                }, 100);
            }
        },

        processMediaItems(mainMedia, additionalMediaArray = []) {
            const mainMediaType = this.getMediaType(mainMedia);
            this.modalMainMedia = mainMedia;
            this.modalMediaType = mainMediaType;
            
            this.modalAdditionalMedia = additionalMediaArray.map(media => {
                if (typeof media === 'string') {
                    return {
                        src: media,
                        type: this.getMediaType(media),
                        thumbnail: media
                    };
                }
                return {
                    ...media,
                    type: this.getMediaType(media.src),
                    thumbnail: media.thumbnail || media.src
                };
            });
        },

        openModal(title, description, mainMedia, additionalMedia = []) {
            this.modalTitle = title;
            this.modalDescription = description;
            
            // Process media items
            this.processMediaItems(mainMedia, additionalMedia);
            
            // Open the modal
            this.modalOpen = true;
            
            // For videos, we need to handle autoplay after the modal is visible
            if (this.modalMediaType === 'video') {
                this.videoMuted = false;
                
                // Small delay to ensure the modal is rendered before attempting to play
                setTimeout(() => {
                    const videoElement = document.querySelector('.modal-content video');
                    if (videoElement) {
                        videoElement.play().catch(e => {
                            console.log('Autoplay prevented:', e);
                            if (e.name === 'NotAllowedError') {
                                videoElement.muted = true;
                                this.videoMuted = true; 
                                
                                videoElement.play().catch(err => {
                                    console.log('Muted autoplay also prevented:', err);
                                    this.videoMuted = false; 
                                });
                            }
                        });
                    }
                }, 300);
            }
            
            setTimeout(() => {
                // Initialize Feather icons for video 
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
                
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

        unmuteVideo() {
            const videoElement = document.querySelector('.modal-content video');
            if (videoElement) {
                videoElement.muted = false;
                this.videoMuted = false;
            }
        },
        
        closeModal() {
            this.modalOpen = false;
            this.videoMuted = false;
            
            setTimeout(() => {
                const videoElements = document.querySelectorAll('video');
                videoElements.forEach(video => {
                    if (!video.paused) {
                        video.pause();
                    }
                });
            }, 100);
        },

        // Improved pagination methods
        getTotalPages() {
            const newsItems = document.querySelectorAll('.news-item');
            const filteredItems = [...newsItems].filter(item => {
                return this.currentFilter === 'all' || item.dataset.category === this.currentFilter;
            });
            return Math.ceil(filteredItems.length / this.itemsPerPage);
        },

        paginate() {
            const newsItems = document.querySelectorAll('.news-item');
            let visibleCount = 0;
            
            newsItems.forEach((item) => {
                // First check if it passes the filter
                const passesFilter = this.currentFilter === 'all' || item.dataset.category === this.currentFilter;
                
                if (passesFilter) {
                    visibleCount++;
                    const itemPage = Math.ceil(visibleCount / this.itemsPerPage);
                    
                    // Show only if its on the current page and passes the filter
                    if (itemPage === this.currentPage) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                } else {
                    item.style.display = 'none';
                }
            });
            
            this.updatePaginationButtons();
        },
        
        updatePaginationButtons() {
            const totalPages = this.getTotalPages();
            const paginationContainer = document.querySelector('.pagination-buttons');
            
            if (!paginationContainer) return;
            
            // Clear existing pagination buttons
            paginationContainer.innerHTML = '';
            
            // Only show pagination if there are multiple pages
            if (totalPages > 1) {
                // Add prev button
                const prevButton = document.createElement('button');
                prevButton.classList.add('pagination-btn', 'prev-btn');
                prevButton.innerHTML = '&laquo; Prev';
                prevButton.disabled = this.currentPage === 1;
                prevButton.addEventListener('click', () => {
                    if (this.currentPage > 1) {
                        this.currentPage--;
                        this.paginate();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                });
                paginationContainer.appendChild(prevButton);
                
                // Determine which page buttons to show (limit to 5 with ellipsis)
                let startPage = Math.max(1, this.currentPage - 2);
                let endPage = Math.min(totalPages, startPage + 4);
                
                // Adjust if we are at the end
                if (endPage === totalPages) {
                    startPage = Math.max(1, endPage - 4);
                }
                
                // Add first page button if not included in the range
                if (startPage > 1) {
                    const firstPageButton = document.createElement('button');
                    firstPageButton.classList.add('pagination-btn', 'page-btn');
                    firstPageButton.textContent = '1';
                    firstPageButton.addEventListener('click', () => {
                        this.currentPage = 1;
                        this.paginate();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                    paginationContainer.appendChild(firstPageButton);
                    
                    // Add ellipsis if needed
                    if (startPage > 2) {
                        const ellipsis = document.createElement('span');
                        ellipsis.classList.add('pagination-ellipsis');
                        ellipsis.textContent = '...';
                        paginationContainer.appendChild(ellipsis);
                    }
                }
                
                // Add page buttons
                for (let i = startPage; i <= endPage; i++) {
                    const pageButton = document.createElement('button');
                    pageButton.classList.add('pagination-btn', 'page-btn');
                    if (i === this.currentPage) {
                        pageButton.classList.add('active');
                    }
                    pageButton.textContent = i;
                    pageButton.addEventListener('click', () => {
                        this.currentPage = i;
                        this.paginate();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                    paginationContainer.appendChild(pageButton);
                }
                
                // Add ellipsis and last page button if needed
                if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                        const ellipsis = document.createElement('span');
                        ellipsis.classList.add('pagination-ellipsis');
                        ellipsis.textContent = '...';
                        paginationContainer.appendChild(ellipsis);
                    }
                    
                    const lastPageButton = document.createElement('button');
                    lastPageButton.classList.add('pagination-btn', 'page-btn');
                    lastPageButton.textContent = totalPages;
                    lastPageButton.addEventListener('click', () => {
                        this.currentPage = totalPages;
                        this.paginate();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                    paginationContainer.appendChild(lastPageButton);
                }
                
                // Add next button
                const nextButton = document.createElement('button');
                nextButton.classList.add('pagination-btn', 'next-btn');
                nextButton.innerHTML = 'Next &raquo;';
                nextButton.disabled = this.currentPage === totalPages;
                nextButton.addEventListener('click', () => {
                    if (this.currentPage < totalPages) {
                        this.currentPage++;
                        this.paginate();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                });
                paginationContainer.appendChild(nextButton);
            }
        },

        init() {
            if (!document.querySelector('.pagination-buttons')) {
                const newsContainer = document.getElementById('news-container');
                const paginationContainer = document.createElement('div');
                paginationContainer.classList.add('pagination-buttons');
                newsContainer.parentNode.insertBefore(paginationContainer, newsContainer.nextSibling);
            }
            
            const filterButtons = document.querySelectorAll('.filter-btn');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => {
                        btn.classList.remove('active');
                    });
                    button.classList.add('active');

                    const filter = button.dataset.filter;
                    this.currentFilter = filter;
                    this.currentPage = 1;
                    this.paginate();
                });
            });
            
            this.paginate();
        }
    }
}