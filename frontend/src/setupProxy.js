const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://35.180.109.61:8080',
            changeOrigin: true,
        })
    );
};