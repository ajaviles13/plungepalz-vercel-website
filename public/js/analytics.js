/**
 * PlungePalz Analytics Helper
 * Provides easy-to-use functions for tracking custom events with Vercel Web Analytics
 */

// Analytics helper functions
const Analytics = {
    // Track page views (automatically handled by Vercel, but can be called manually)
    trackPageView: function(path) {
        if (typeof window !== 'undefined' && window.va) {
            window.va('track', 'pageview', { path: path || window.location.pathname });
        }
    },

    // Track custom events
    trackEvent: function(eventName, properties = {}) {
        if (typeof window !== 'undefined' && window.va) {
            window.va('track', eventName, properties);
        }
    },

    // Track app download clicks
    trackAppDownload: function(platform, source = 'unknown') {
        this.trackEvent('App Download Click', {
            platform: platform, // 'ios', 'android', 'garmin'
            source: source // 'hero', 'footer', 'app-page', etc.
        });
    },

    // Track email subscription
    trackEmailSubscription: function(source = 'footer') {
        this.trackEvent('Email Subscription', {
            source: source
        });
    },

    // Track navigation clicks
    trackNavigation: function(destination, source = 'navbar') {
        this.trackEvent('Navigation Click', {
            destination: destination,
            source: source
        });
    },

    // Track social media clicks
    trackSocialClick: function(platform, source = 'footer') {
        this.trackEvent('Social Media Click', {
            platform: platform, // 'instagram', 'youtube', 'facebook', 'linkedin'
            source: source
        });
    },

    // Track contact interactions
    trackContact: function(method) {
        this.trackEvent('Contact Interaction', {
            method: method // 'email', 'phone'
        });
    },

    // Track feature interest
    trackFeatureInterest: function(feature, action = 'view') {
        this.trackEvent('Feature Interest', {
            feature: feature, // 'plungepoints', 'garmin-integration', 'social-features'
            action: action // 'view', 'click', 'hover'
        });
    }
};

// Make Analytics available globally
if (typeof window !== 'undefined') {
    window.PlungePalzAnalytics = Analytics;
}

// Auto-track some common interactions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Track app download clicks
    const appDownloadLinks = document.querySelectorAll('a[href*="apps.apple.com"], a[href*="play.google.com"], a[href*="apps.garmin.com"]');
    appDownloadLinks.forEach(link => {
        link.addEventListener('click', function() {
            let platform = 'unknown';
            let source = 'unknown';
            
            if (this.href.includes('apps.apple.com')) {
                platform = 'ios';
            } else if (this.href.includes('play.google.com')) {
                platform = 'android';
            } else if (this.href.includes('apps.garmin.com')) {
                platform = 'garmin';
            }
            
            // Determine source based on parent elements
            if (this.closest('.hero-downloads')) {
                source = 'hero';
            } else if (this.closest('.footer-downloads')) {
                source = 'footer';
            } else if (this.closest('.app-downloads')) {
                source = 'app-page';
            }
            
            Analytics.trackAppDownload(platform, source);
        });
    });

    // Track social media clicks
    const socialLinks = document.querySelectorAll('a[href*="instagram.com"], a[href*="youtube.com"], a[href*="facebook.com"], a[href*="linkedin.com"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            let platform = 'unknown';
            
            if (this.href.includes('instagram.com')) {
                platform = 'instagram';
            } else if (this.href.includes('youtube.com')) {
                platform = 'youtube';
            } else if (this.href.includes('facebook.com')) {
                platform = 'facebook';
            } else if (this.href.includes('linkedin.com')) {
                platform = 'linkedin';
            }
            
            const source = this.closest('.footer') ? 'footer' : 'header';
            Analytics.trackSocialClick(platform, source);
        });
    });

    // Track contact clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            Analytics.trackContact('email');
        });
    });

    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            Analytics.trackContact('phone');
        });
    });

    // Track navigation clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const destination = this.textContent.trim().toLowerCase();
            Analytics.trackNavigation(destination, 'navbar');
        });
    });
}); 