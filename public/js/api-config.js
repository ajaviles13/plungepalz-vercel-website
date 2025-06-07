/**
 * PlungePalz API Configuration
 * Centralized configuration for all API endpoints and utilities
 */

const API_CONFIG = {
    // Base URLs
    BASE_URLS: {
        PLUNGEPALZ_METRICS: '', // Use relative URL for local proxy
        BEHOLD_INSTAGRAM: 'https://feeds.behold.so',
        // Add more base URLs as needed
    },

    // Endpoints
    ENDPOINTS: {
        // PlungePalz Metrics API (using local proxy)
        WEBSITE_METRICS: '/api/metrics',
        LEADERBOARD: '/api/leaderboard',
        
        // Instagram Feed API
        INSTAGRAM_FEED: '/TQHkF7hs7yO1Dk25w7Y0',
        
        // Future endpoints can be added here
        // USER_STATS: '/getUserStats',
        // CHALLENGES: '/getChallenges',
    },

    // Request configurations
    REQUEST_CONFIG: {
        DEFAULT_TIMEOUT: 10000, // 10 seconds
        RETRY_ATTEMPTS: 3,
        RETRY_DELAY: 1000, // 1 second
    },

    // Cache configurations
    CACHE_CONFIG: {
        METRICS_REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
        INSTAGRAM_REFRESH_INTERVAL: 10 * 60 * 1000, // 10 minutes
    }
};

/**
 * API Utility Functions
 */
const ApiUtils = {
    /**
     * Get full URL for an endpoint
     * @param {string} baseUrlKey - Key from BASE_URLS
     * @param {string} endpointKey - Key from ENDPOINTS
     * @returns {string} Full URL
     */
    getUrl(baseUrlKey, endpointKey) {
        const baseUrl = API_CONFIG.BASE_URLS[baseUrlKey];
        const endpoint = API_CONFIG.ENDPOINTS[endpointKey];
        
        // Check if endpoint exists
        if (!endpoint) {
            throw new Error(`Invalid API configuration: ${baseUrlKey}.${endpointKey} - endpoint not found`);
        }
        
        // Check if baseUrlKey exists in configuration
        if (!(baseUrlKey in API_CONFIG.BASE_URLS)) {
            throw new Error(`Invalid API configuration: ${baseUrlKey}.${endpointKey} - base URL key not found`);
        }
        
        // Handle relative URLs (when baseUrl is empty string)
        if (baseUrl === '') {
            return endpoint;
        }
        
        // Handle absolute URLs
        return baseUrl + endpoint;
    },

    /**
     * Make an API request with retry logic and error handling
     * @param {string} url - Full URL to request
     * @param {Object} options - Fetch options
     * @param {number} retryCount - Current retry attempt
     * @returns {Promise} Response data
     */
    async makeRequest(url, options = {}, retryCount = 0) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.REQUEST_CONFIG.DEFAULT_TIMEOUT);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            
            // Retry logic
            if (retryCount < API_CONFIG.REQUEST_CONFIG.RETRY_ATTEMPTS) {
                Logger.warn(`API request failed, retrying... (${retryCount + 1}/${API_CONFIG.REQUEST_CONFIG.RETRY_ATTEMPTS})`);
                await new Promise(resolve => setTimeout(resolve, API_CONFIG.REQUEST_CONFIG.RETRY_DELAY));
                return this.makeRequest(url, options, retryCount + 1);
            }
            
            throw error;
        }
    },

    /**
     * Format numbers with commas
     * @param {string|number} num - Number to format
     * @returns {string} Formatted number
     */
    formatNumber(num) {
        return parseInt(num || 0).toLocaleString();
    },

    /**
     * Format date for display
     * @param {string} dateString - ISO date string
     * @returns {string} Formatted date
     */
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
};

/**
 * Specific API Functions
 */
const PlungePalzAPI = {
    /**
     * Fetch website metrics
     * @returns {Promise} Metrics data
     */
    async getWebsiteMetrics() {
        const url = ApiUtils.getUrl('PLUNGEPALZ_METRICS', 'WEBSITE_METRICS');
        Logger.debug('🔄 Fetching metrics from:', url);
        
        try {
            const data = await ApiUtils.makeRequest(url);
            Logger.success('✅ Fetched metrics:', data);
            return data;
        } catch (error) {
            Logger.error('❌ Error fetching metrics:', error);
            throw error;
        }
    },

    /**
     * Fetch Instagram posts
     * @returns {Promise} Instagram posts data
     */
    async getInstagramPosts() {
        const url = ApiUtils.getUrl('BEHOLD_INSTAGRAM', 'INSTAGRAM_FEED');
        Logger.debug('🔄 Fetching Instagram posts from:', url);
        
        try {
            const data = await ApiUtils.makeRequest(url);
            Logger.success('✅ Fetched Instagram posts:', data.posts?.length || 0, 'posts');
            return data;
        } catch (error) {
            Logger.error('❌ Error fetching Instagram posts:', error);
            throw error;
        }
    },

    /**
     * Fetch top earners leaderboard
     * @returns {Promise} Leaderboard data
     */
    async getLeaderboard() {
        const url = ApiUtils.getUrl('PLUNGEPALZ_METRICS', 'LEADERBOARD');
        Logger.debug('🔄 Fetching leaderboard from:', url);
        
        try {
            const data = await ApiUtils.makeRequest(url);
            Logger.success('✅ Fetched leaderboard:', data?.length || 0, 'users');
            return data;
        } catch (error) {
            Logger.error('❌ Error fetching leaderboard:', error);
            throw error;
        }
    }

    // Future API methods can be added here
    // async getUserStats(userId) { ... }
    // async getChallenges() { ... }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = { API_CONFIG, ApiUtils, PlungePalzAPI };
} else {
    // Browser environment
    window.API_CONFIG = API_CONFIG;
    window.ApiUtils = ApiUtils;
    window.PlungePalzAPI = PlungePalzAPI;
} 