const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies for POST requests
app.use(express.json());

// API Proxy Routes
app.get('/api/metrics', (req, res) => {
    const apiUrl = 'https://pe0s7d7kdb.execute-api.us-east-2.amazonaws.com/PublicData_mvp_production/getMetricsForWebsite';
    
    https.get(apiUrl, (apiRes) => {
        let data = '';
        
        apiRes.on('data', (chunk) => {
            data += chunk;
        });
        
        apiRes.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                res.json(jsonData);
            } catch (error) {
                console.error('Error parsing metrics data:', error);
                res.status(500).json({ error: 'Failed to parse metrics data' });
            }
        });
    }).on('error', (error) => {
        console.error('Error fetching metrics:', error);
        res.status(500).json({ error: 'Failed to fetch metrics data' });
    });
});

app.get('/api/leaderboard', (req, res) => {
    const apiUrl = 'https://pe0s7d7kdb.execute-api.us-east-2.amazonaws.com/PublicData_mvp_production/getTopEarnThreeEarners';
    
    https.get(apiUrl, (apiRes) => {
        let data = '';
        
        apiRes.on('data', (chunk) => {
            data += chunk;
        });
        
        apiRes.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                res.json(jsonData);
            } catch (error) {
                console.error('Error parsing leaderboard data:', error);
                res.status(500).json({ error: 'Failed to parse leaderboard data' });
            }
        });
    }).on('error', (error) => {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard data' });
    });
});

// Email Preferences API Proxy Routes
app.get('/api/email-preferences', (req, res) => {
    const sendId = req.query.send_id;
    
    if (!sendId) {
        return res.status(400).json({ error: 'Missing send_id parameter' });
    }
    
    const apiUrl = `https://wbv224o2f4.execute-api.us-east-2.amazonaws.com/EmailWorkflow_mvp_production/Email_UpdateSubscriptionSettings?send_id=${encodeURIComponent(sendId)}`;
    
    https.get(apiUrl, (apiRes) => {
        let data = '';
        
        apiRes.on('data', (chunk) => {
            data += chunk;
        });
        
        apiRes.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                res.json(jsonData);
            } catch (error) {
                console.error('Error parsing email preferences data:', error);
                res.status(500).json({ error: 'Failed to parse email preferences data' });
            }
        });
    }).on('error', (error) => {
        console.error('Error fetching email preferences:', error);
        res.status(500).json({ error: 'Failed to fetch email preferences data' });
    });
});

app.post('/api/email-preferences', (req, res) => {
    const postData = JSON.stringify(req.body);
    const apiUrl = 'https://wbv224o2f4.execute-api.us-east-2.amazonaws.com/EmailWorkflow_mvp_production/Email_UpdateSubscriptionSettings';
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    
    const apiReq = https.request(apiUrl, options, (apiRes) => {
        let data = '';
        
        apiRes.on('data', (chunk) => {
            data += chunk;
        });
        
        apiRes.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                res.json(jsonData);
            } catch (error) {
                console.error('Error parsing email preferences update response:', error);
                res.status(500).json({ error: 'Failed to parse update response' });
            }
        });
    });
    
    apiReq.on('error', (error) => {
        console.error('Error updating email preferences:', error);
        res.status(500).json({ error: 'Failed to update email preferences' });
    });
    
    apiReq.write(postData);
    apiReq.end();
});

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'PlungePalz™ – Never Plunge Alone',
        page: 'home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About - PlungePalz™',
        page: 'about'
    });
});

app.get('/app', (req, res) => {
    res.render('app', { 
        title: 'App - PlungePalz™',
        page: 'app'
    });
});

// Updated route for PlungePoints
app.get('/app/plungepoints', (req, res) => {
    res.render('plungepoints', { 
        title: 'PlungePoints - PlungePalz™',
        page: 'plungepoints'
    });
});

// Redirect old plungepoints route to new route for backward compatibility
app.get('/plungepoints', (req, res) => {
    res.redirect(301, '/app/plungepoints');
});

// Updated route for Garmin watch connection
app.get('/app/connectgarminwatch', (req, res) => {
    res.render('garmin', { 
        title: 'Connect Garmin Watch - PlungePalz™',
        page: 'garmin'
    });
});

// Redirect old garmin route to new route for backward compatibility
app.get('/garmin', (req, res) => {
    res.redirect(301, '/app/connectgarminwatch');
});

// Legal and Support Pages
app.get('/account-data-deletion-request-form', (req, res) => {
    res.render('account-data-deletion-request-form', { 
        title: 'Account Data Deletion Request Form - PlungePalz™',
        page: 'account-data-deletion'
    });
});

app.get('/community-standards', (req, res) => {
    res.render('community-standards', { 
        title: 'Community Standards - PlungePalz™',
        page: 'community-standards'
    });
});

app.get('/privacy-policy', (req, res) => {
    res.render('privacy-policy', { 
        title: 'Privacy Policy - PlungePalz™',
        page: 'privacy-policy'
    });
});

app.get('/submit-feedback', (req, res) => {
    res.render('submit-feedback', { 
        title: 'Submit Feedback - PlungePalz™',
        page: 'submit-feedback'
    });
});

app.get('/subscribe', (req, res) => {
    res.render('subscribe', { 
        title: 'Subscribe - PlungePalz™',
        page: 'subscribe'
    });
});

app.get('/terms-of-service', (req, res) => {
    res.render('terms-of-service', { 
        title: 'Terms of Service - PlungePalz™',
        page: 'terms-of-service'
    });
});

app.get('/email-unsubscribe', (req, res) => {
    res.render('email-unsubscribe', { 
        title: 'Update Email Preferences - PlungePalz™',
        page: 'email-preferences'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { 
        title: '404 - Page Not Found - PlungePalz™',
        page: '404'
    });
});

app.listen(PORT, () => {
    console.log(`PlungePalz server running on port ${PORT}`);
});

module.exports = app; 