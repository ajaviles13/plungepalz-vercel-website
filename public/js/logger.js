/**
 * Simple logging utility for PlungePalz
 * Allows conditional logging based on environment
 */

const Logger = {
    // Set to false for production, true for development
    DEBUG_MODE: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    
    /**
     * Debug logs - only shown in development
     */
    debug: function(...args) {
        if (this.DEBUG_MODE) {
            console.log(...args);
        }
    },
    
    /**
     * Info logs - only shown in development
     */
    info: function(...args) {
        if (this.DEBUG_MODE) {
            console.log(...args);
        }
    },
    
    /**
     * Warning logs - always shown
     */
    warn: function(...args) {
        console.warn(...args);
    },
    
    /**
     * Error logs - always shown (important for production debugging)
     */
    error: function(...args) {
        console.error(...args);
    },
    
    /**
     * Success logs - only shown in development
     */
    success: function(...args) {
        if (this.DEBUG_MODE) {
            console.log(...args);
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = Logger;
} else {
    // Browser environment
    window.Logger = Logger;
} 