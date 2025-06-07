// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        Logger.success('✅ Lucide icons initialized');
    }

    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(18, 18, 18, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
        } else {
            header.style.background = 'rgba(18, 18, 18, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }

        lastScrollTop = scrollTop;
    });

    // Feature cards animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Form handling
    const commentForm = document.querySelector('.comment-form form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Posting...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitBtn.textContent = 'Posted!';
                submitBtn.style.background = '#10b981';
                
                // Reset form
                this.reset();
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }, 1500);
        });
    }

    // Add loading animation to comments
    const loadingComments = document.querySelector('.loading-comments');
    if (loadingComments) {
        let dots = 0;
        const loadingInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            loadingComments.textContent = 'Loading Comments' + '.'.repeat(dots);
        }, 500);

        // Stop loading after 3 seconds (simulate loaded state)
        setTimeout(() => {
            clearInterval(loadingInterval);
            loadingComments.textContent = 'No comments yet. Be the first to comment!';
        }, 3000);
    }

    // Add hover effects to download buttons
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });

    // Add click tracking (for analytics - replace with actual tracking)
    const trackableElements = document.querySelectorAll('.download-btn, .cta-btn, .nav-link');
    trackableElements.forEach(element => {
        element.addEventListener('click', function() {
            const elementText = this.textContent.trim();
            const elementType = this.className;
            Logger.debug(`Clicked: ${elementText} (${elementType})`);
            // Replace with actual analytics tracking
        });
    });

    // Features Carousel functionality
    const carousel = document.getElementById('featuresCarousel');
    const leftArrow = document.getElementById('carouselLeft');
    const rightArrow = document.getElementById('carouselRight');
    
    Logger.debug('🔄 STATIC CAROUSEL v3.0 - No auto-scroll!');
    Logger.debug('Carousel elements found:', {
        carousel: !!carousel,
        leftArrow: !!leftArrow,
        rightArrow: !!rightArrow
    });
    
    let currentTranslate = 0;
    let cardWidth = 320;
    let currentIndex = 0; // Track which card we're viewing (0-9)
    let originalCardCount = 0;
    let maxTranslate = 0;

    if (carousel) {
        // Get original cards and ensure we have exactly 10 unique ones
        const allCards = Array.from(carousel.querySelectorAll('.feature-card'));
        const originalCards = allCards.slice(0, 10); // Only keep first 10
        originalCardCount = originalCards.length;
        
        // Clear carousel and add back ONLY the 10 original cards (no clones)
        carousel.innerHTML = '';
        originalCards.forEach(card => {
            carousel.appendChild(card);
        });
        
        Logger.debug('✅ Carousel reset to', originalCardCount, 'unique cards only (no clones, no infinite scroll)');

        // Create dot indicators
        const createDotIndicators = () => {
            const carouselContainer = carousel.parentElement;
            let dotsContainer = carouselContainer.querySelector('.carousel-dots');
            
            // Remove existing dots if any
            if (dotsContainer) {
                dotsContainer.remove();
            }
            
            // Create new dots container
            dotsContainer = document.createElement('div');
            dotsContainer.className = 'carousel-dots';
            
            // Create dots for each unique card
            for (let i = 0; i < originalCardCount; i++) {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot';
                dot.setAttribute('data-index', i);
                if (i === 0) dot.classList.add('active');
                
                // Add click handler for dots
                dot.addEventListener('click', () => {
                    pauseAutoScroll();
                    goToSlide(i);
                });
                
                dotsContainer.appendChild(dot);
            }
            
            carouselContainer.appendChild(dotsContainer);
            Logger.debug('✅ Created', originalCardCount, 'dot indicators for unique cards');
        };

        // Calculate card width and boundaries
        const updateCardWidth = () => {
            const firstCard = carousel.querySelector('.feature-card');
            if (firstCard) {
                // Get the actual computed width (which is now fixed via CSS)
                const cardRect = firstCard.getBoundingClientRect();
                const gap = 32; // 2rem gap between cards
                cardWidth = cardRect.width + gap;
                
                const containerWidth = carousel.parentElement.offsetWidth;
                
                // For center-focused carousel, calculate the offset needed to center the first card
                const centerOffset = (containerWidth - cardRect.width) / 2;
                
                // Calculate max translate (last card centered)
                maxTranslate = centerOffset - (cardWidth * (originalCardCount - 1));
                
                Logger.debug('📏 Carousel dimensions updated - Cards:', originalCardCount, 'Max translate:', maxTranslate);
                
                return centerOffset;
            }
            return 0;
        };

        // Auto-scroll management with center-focused restart logic
        let autoScrollPaused = false;
        let pauseTimeout;
        let autoScrollPosition = 0;
        let currentCenterIndex = 0; // Track which card is currently centered
        let centerOffset = 0; // Store the center offset

        const pauseAutoScroll = () => {
            autoScrollPaused = true;
            carousel.classList.add('manual-control');
            
            Logger.debug('⏸️ AUTO-SCROLL PAUSED');
            
            // Resume auto-scroll after 5 seconds
            clearTimeout(pauseTimeout);
            pauseTimeout = setTimeout(() => {
                autoScrollPaused = false;
                carousel.classList.remove('manual-control');
                Logger.debug('▶️ AUTO-SCROLL RESUMED - After timeout');
            }, 5000);
        };

        // Custom auto-scroll animation with center-focused restart
        const startCustomAutoScroll = () => {
            const scrollSpeed = 0.3; // Slower for better visibility
            
            const animateScroll = () => {
                if (!autoScrollPaused && !carousel.classList.contains('manual-control')) {
                    autoScrollPosition -= scrollSpeed; // Move left
                    
                    // Check if we've reached the end (last card centered)
                    if (autoScrollPosition <= maxTranslate) {
                        // Reset to beginning (first card centered)
                        autoScrollPosition = centerOffset;
                        currentCenterIndex = 0;
                        Logger.debug('🔄 AUTO-SCROLL RESTART - Last card was centered, restarting with first card centered');
                    }
                    
                    // Calculate which card is currently centered
                    const newCenterIndex = Math.round((centerOffset - autoScrollPosition) / cardWidth);
                    if (newCenterIndex !== currentCenterIndex && newCenterIndex >= 0 && newCenterIndex < originalCardCount) {
                        currentCenterIndex = newCenterIndex;
                        Logger.debug('🎯 CENTER CARD CHANGED - Now showing card', currentCenterIndex);
                    }
                    
                    // Apply the position
                    carousel.style.transform = `translateX(${autoScrollPosition}px)`;
                    
                    // Update dots based on centered card
                    updateDotsFromCenterPosition();
                }
                
                requestAnimationFrame(animateScroll);
            };
            
            requestAnimationFrame(animateScroll);
        };

        // Update dots based on which card is centered
        const updateDotsFromCenterPosition = () => {
            const centerIndex = Math.round((centerOffset - autoScrollPosition) / cardWidth);
            const clampedIndex = Math.max(0, Math.min(originalCardCount - 1, centerIndex));
            
            // Update dots to show which card is centered
            const dots = document.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                if (index === clampedIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        // Update dots for manual navigation (center-focused)
        const updateDots = () => {
            const dots = document.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        // Go to specific slide (center-focused)
        const goToSlide = (index) => {
            Logger.debug('🎯 GO TO SLIDE (CENTER) - Requested index:', index, 'Valid range: 0 to', originalCardCount - 1);
            
            if (index < 0 || index >= originalCardCount) {
                Logger.debug('❌ INVALID INDEX - Outside valid range');
                return;
            }
            
            currentIndex = index;
            // Center the requested card: centerOffset - (cardWidth * index)
            currentTranslate = centerOffset - (cardWidth * index);
            autoScrollPosition = currentTranslate; // Sync auto-scroll position
            
            Logger.debug('📍 FINAL POSITION (CENTERED) - Index:', currentIndex, 'Translate:', currentTranslate);
            
            carousel.style.transform = `translateX(${currentTranslate}px)`;
            updateArrowStates();
            updateDots();
        };

        // Update arrow states based on center-focused boundaries
        const updateArrowStates = () => {
            if (leftArrow && rightArrow) {
                Logger.debug('🔍 BOUNDARY CHECK (CENTER) - Current index:', currentIndex, 'Current translate:', currentTranslate);
                
                // At the beginning (first card centered)
                if (currentIndex === 0) {
                    leftArrow.style.opacity = '0.3';
                    leftArrow.style.cursor = 'not-allowed';
                    leftArrow.disabled = true;
                    Logger.debug('🚫 LEFT ARROW DISABLED - First card is centered');
                } else {
                    leftArrow.style.opacity = '1';
                    leftArrow.style.cursor = 'pointer';
                    leftArrow.disabled = false;
                    Logger.debug('✅ LEFT ARROW ENABLED');
                }

                // At the end (last card centered)
                if (currentIndex === originalCardCount - 1) {
                    rightArrow.style.opacity = '0.3';
                    rightArrow.style.cursor = 'not-allowed';
                    rightArrow.disabled = true;
                    Logger.debug('🚫 RIGHT ARROW DISABLED - Last card is centered');
                } else {
                    rightArrow.style.opacity = '1';
                    rightArrow.style.cursor = 'pointer';
                    rightArrow.disabled = false;
                    Logger.debug('✅ RIGHT ARROW ENABLED');
                }
                
                Logger.debug('📊 BOUNDARY STATE (CENTER) - Index:', currentIndex, 'Translate:', currentTranslate);
            }
        };

        // Manual navigation (center-focused)
        const moveCarousel = (direction) => {
            Logger.debug('🎮 MOVE ATTEMPT (CENTER) - Direction:', direction, 'Current index:', currentIndex);
            
            if ((direction === 'left' && leftArrow && leftArrow.disabled) || 
                (direction === 'right' && rightArrow && rightArrow.disabled)) {
                Logger.debug('🛑 MOVE BLOCKED - Arrow is disabled');
                return;
            }

            // Pause auto-scroll when manually navigating
            pauseAutoScroll();

            if (direction === 'left') {
                const newIndex = currentIndex - 1;
                Logger.debug('⬅️ MOVING LEFT (CENTER) - From index', currentIndex, 'to', newIndex);
                goToSlide(newIndex);
            } else {
                const newIndex = currentIndex + 1;
                Logger.debug('➡️ MOVING RIGHT (CENTER) - From index', currentIndex, 'to', newIndex);
                goToSlide(newIndex);
            }
        };

        // Initialize carousel (center-focused)
        const initializeCarousel = () => {
            Logger.debug('🚀 INITIALIZING CENTER-FOCUSED CAROUSEL...');
            centerOffset = updateCardWidth();
            createDotIndicators();
            currentIndex = 0;
            currentTranslate = centerOffset; // First card starts centered
            autoScrollPosition = centerOffset;
            carousel.style.transform = `translateX(${currentTranslate}px)`;
            updateArrowStates();
            updateDots();
            
            // Start custom auto-scroll (no CSS animation)
            carousel.classList.add('manual-control'); // Disable CSS animation
            startCustomAutoScroll();
            Logger.debug('✅ CENTER-FOCUSED CAROUSEL INITIALIZED - First card centered');
            Logger.debug('🎯 INITIAL STATE - Index:', currentIndex, 'Translate:', currentTranslate, 'Center offset:', centerOffset);
        };

        // Add hover detection for pausing auto-scroll
        const carouselContainer = carousel.parentElement;
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                autoScrollPaused = true;
                Logger.debug('⏸️ AUTO-SCROLL PAUSED - Mouse hover');
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                autoScrollPaused = false;
                Logger.debug('▶️ AUTO-SCROLL RESUMED - Mouse left');
            });
        }

        // Initialize
        setTimeout(initializeCarousel, 100);
        
        // Handle resize
        window.addEventListener('resize', () => {
            updateCardWidth();
            goToSlide(currentIndex); // Maintain current position
        });

        // Arrow click events
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                Logger.debug('🔥 LEFT ARROW CLICKED!');
                moveCarousel('left');
            });
            Logger.debug('✅ Left arrow click listener attached');
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                Logger.debug('🔥 RIGHT ARROW CLICKED!');
                moveCarousel('right');
            });
            Logger.debug('✅ Right arrow click listener attached');
        }

        // Add click event listeners to cards for modal
        const addCardClickListeners = () => {
            const allCards = carousel.querySelectorAll('.feature-card');
            allCards.forEach(card => {
                const screenshot = card.querySelector('.feature-screenshot .screenshot-img');
                const title = card.querySelector('.feature-content h4');
                const description = card.querySelector('.feature-content p');
                
                if (screenshot && title && description) {
                    card.addEventListener('click', function() {
                        // Set image
                        modalImage.src = screenshot.src;
                        modalImage.alt = screenshot.alt;
                        
                        // Set title and description
                        const modalTitle = document.getElementById('modalTitle');
                        const modalDescription = document.getElementById('modalDescription');
                        
                        if (modalTitle && modalDescription) {
                            modalTitle.textContent = title.textContent;
                            modalDescription.textContent = description.textContent;
                        }
                        
                        // Show modal
                        modal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                        
                        // Pause auto-scroll when modal opens
                        carousel.classList.add('paused');
                        Logger.debug('⏸️ AUTO-SCROLL PAUSED - Modal opened with:', title.textContent);
                    });
                }
            });
        };

        setTimeout(addCardClickListeners, 150);
    }

    // Image Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalClose = document.querySelector('.modal-close');

    // Close modal when clicking the close button
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Resume auto-scroll when modal closes
            if (carousel) {
                carousel.classList.remove('paused');
                Logger.debug('▶️ AUTO-SCROLL RESUMED - Modal closed');
            }
        });
    }

    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Resume auto-scroll when modal closes
                if (carousel) {
                    carousel.classList.remove('paused');
                    Logger.debug('▶️ AUTO-SCROLL RESUMED - Modal closed');
                }
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Resume auto-scroll when modal closes
            if (carousel) {
                carousel.classList.remove('paused');
                Logger.debug('▶️ AUTO-SCROLL RESUMED - Modal closed');
            }
        }
    });

    // Instagram Feed functionality
    const instagramCarousel = document.getElementById('instagramCarousel');
    const instagramLeftArrow = document.getElementById('instagramLeft');
    const instagramRightArrow = document.getElementById('instagramRight');
    
    let instagramCurrentTranslate = 0;
    let instagramCardWidth = 320;
    let instagramPosts = [];
    let instagramMaxTranslate = 0;

    // Fetch Instagram posts from Behold API
    async function fetchInstagramPosts() {
        try {
            const data = await PlungePalzAPI.getInstagramPosts();
            
            // Get first 6 posts
            instagramPosts = data.posts.slice(0, 6);
            Logger.success('✅ Fetched', instagramPosts.length, 'Instagram posts');
            
            displayInstagramPosts();
            setupInstagramCarousel();
        } catch (error) {
            Logger.error('❌ Error fetching Instagram posts:', error);
            // Show fallback message
            if (instagramCarousel) {
                instagramCarousel.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Unable to load Instagram posts. Please visit our Instagram page directly.</p>';
            }
        }
    }

    // Display Instagram posts in the carousel
    function displayInstagramPosts() {
        if (!instagramCarousel || !instagramPosts.length) return;

        instagramCarousel.innerHTML = '';
        
        instagramPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'instagram-post';
            
            // Format date using API utility
            const postDate = ApiUtils.formatDate(post.timestamp);
            
            // Get image URL (use medium size if available)
            const imageUrl = post.sizes?.medium?.mediaUrl || post.thumbnailUrl;
            
            // Truncate caption
            const caption = post.prunedCaption || post.caption || '';
            const truncatedCaption = caption.length > 120 ? caption.substring(0, 120) + '...' : caption;
            
            // Check if post is a video
            const isVideo = post.mediaType === 'VIDEO' || post.isReel === true;
            const playIconHtml = isVideo ? '<div class="instagram-play-icon"><i class="fas fa-play"></i></div>' : '';
            
            postElement.innerHTML = `
                <div class="instagram-post-media">
                    <img src="${imageUrl}" alt="Instagram post" class="instagram-post-image" loading="lazy">
                    ${playIconHtml}
                </div>
                <div class="instagram-post-content">
                    <p class="instagram-post-caption">${truncatedCaption}</p>
                    <p class="instagram-post-date">${postDate}</p>
                </div>
            `;
            
            // Add click handler to open Instagram post
            postElement.addEventListener('click', () => {
                window.open(post.permalink, '_blank', 'noopener,noreferrer');
            });
            
            instagramCarousel.appendChild(postElement);
        });
    }

    // Setup Instagram carousel navigation
    function setupInstagramCarousel() {
        if (!instagramCarousel || !instagramLeftArrow || !instagramRightArrow) return;

        const updateInstagramCardWidth = () => {
            const containerWidth = instagramCarousel.parentElement.offsetWidth;
            if (window.innerWidth <= 480) {
                instagramCardWidth = 250;
            } else if (window.innerWidth <= 768) {
                instagramCardWidth = 280;
            } else {
                instagramCardWidth = 320;
            }
            
            // Calculate max translate (show 3 cards at a time on desktop, 1 on mobile)
            const visibleCards = window.innerWidth <= 768 ? 1 : 3;
            const maxCards = Math.max(0, instagramPosts.length - visibleCards);
            instagramMaxTranslate = maxCards * instagramCardWidth;
        };

        const updateInstagramArrowStates = () => {
            if (instagramLeftArrow && instagramRightArrow) {
                instagramLeftArrow.disabled = instagramCurrentTranslate >= 0;
                instagramRightArrow.disabled = Math.abs(instagramCurrentTranslate) >= instagramMaxTranslate;
            }
        };

        const moveInstagramCarousel = (direction) => {
            updateInstagramCardWidth();
            
            if (direction === 'left' && instagramCurrentTranslate < 0) {
                instagramCurrentTranslate += instagramCardWidth;
            } else if (direction === 'right' && Math.abs(instagramCurrentTranslate) < instagramMaxTranslate) {
                instagramCurrentTranslate -= instagramCardWidth;
            }
            
            // Ensure we don't go beyond bounds
            instagramCurrentTranslate = Math.min(0, Math.max(-instagramMaxTranslate, instagramCurrentTranslate));
            
            instagramCarousel.style.transform = `translateX(${instagramCurrentTranslate}px)`;
            updateInstagramArrowStates();
        };

        // Add event listeners
        instagramLeftArrow.addEventListener('click', () => moveInstagramCarousel('left'));
        instagramRightArrow.addEventListener('click', () => moveInstagramCarousel('right'));

        // Initialize
        updateInstagramCardWidth();
        updateInstagramArrowStates();

        // Update on window resize
        window.addEventListener('resize', debounce(() => {
            updateInstagramCardWidth();
            instagramCurrentTranslate = 0;
            instagramCarousel.style.transform = `translateX(0px)`;
            updateInstagramArrowStates();
        }, 250));
    }

    // Initialize Instagram feed
    if (instagramCarousel) {
        fetchInstagramPosts();
    }

    // Metrics functionality
    async function fetchMetrics() {
        try {
            Logger.debug('🔄 Starting metrics fetch...');
            const data = await PlungePalzAPI.getWebsiteMetrics();
            Logger.debug('✅ Successfully fetched metrics data:', data);
            
            // Update the metrics display using API utility for formatting
            const sessionCountElement = document.getElementById('sessionCount');
            const plungePointsElement = document.getElementById('plungePoints');
            const challengesCompletedElement = document.getElementById('challengesCompleted');
            
            if (sessionCountElement) {
                sessionCountElement.innerHTML = ApiUtils.formatNumber(data.SessionCount || '0');
                Logger.debug('✅ Updated sessionCount:', data.SessionCount);
            }
            
            if (plungePointsElement) {
                plungePointsElement.innerHTML = ApiUtils.formatNumber(data.PlungePointsAccumulated || '0');
                Logger.debug('✅ Updated plungePoints:', data.PlungePointsAccumulated);
            }
            
            if (challengesCompletedElement) {
                // Note: API returns "ChallengesComleted" (typo in API)
                challengesCompletedElement.innerHTML = ApiUtils.formatNumber(data.ChallengesCompleted || data.ChallengesComleted || '0');
                Logger.debug('✅ Updated challengesCompleted:', data.ChallengesCompleted || data.ChallengesComleted);
            }
            
        } catch (error) {
            Logger.error('❌ Error fetching metrics:', error);
            Logger.error('❌ Error type:', error.name);
            Logger.error('❌ Error message:', error.message);
            Logger.debug('❌ Full error object:', error);
            
            // Check if it's a CORS error
            if (error.message.includes('CORS') || error.message.includes('fetch')) {
                Logger.error('🚫 This appears to be a CORS issue. The API needs to allow cross-origin requests from this domain.');
            }
            
            // Show fallback values with actual numbers (no "+" symbols)
            const sessionCountElement = document.getElementById('sessionCount');
            const plungePointsElement = document.getElementById('plungePoints');
            const challengesCompletedElement = document.getElementById('challengesCompleted');
            
            Logger.warn('⚠️ Using fallback values due to API error');
            
            if (sessionCountElement) {
                sessionCountElement.innerHTML = '112';
            }
            
            if (plungePointsElement) {
                plungePointsElement.innerHTML = '1,472';
            }
            
            if (challengesCompletedElement) {
                challengesCompletedElement.innerHTML = '114';
            }
        }
    }

    // Initialize metrics
    const metricsSection = document.querySelector('.metrics-section');
    if (metricsSection) {
        fetchMetrics();
        
        // Refresh metrics using configured interval
        setInterval(fetchMetrics, API_CONFIG.CACHE_CONFIG.METRICS_REFRESH_INTERVAL);
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Resize handler with debounce
const handleResize = debounce(() => {
    // Handle any resize-specific logic here
    const navMenu = document.getElementById('nav-menu');
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('active');
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle) {
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    }
}, 250);

window.addEventListener('resize', handleResize); 