function app() {
    return {
        modalOpen: false,
        modalTitle: '',
        modalMainMedia: '',
        modalMediaType: 'image',
        modalAdditionalMedia: [],
        modalDescription: '',
        videoMuted: false,

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

        init() {
        }
    }
}