const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://15.188.15.10:8080',
            changeOrigin: true,
        })
    );
};
