const { createProxyMiddleware } = require('http-proxy-middleware');
// const express = require('express');

// const app = express();
// app.use('/dhlottery', createProxyMiddleware(
//     {
//         target: 'http://www.example.org',
//         changeOrigin: true
//         }
//     )
// );
// app.listen(3000);

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/dhlottery',
            {
                target: 'https://www.dhlottery.co.kr',
                changeOrigin: true,
                pathRewrite: {
                    '^/dhlottery/' : '',
                }
            }
        )
    )
    app.listen(3000);
};