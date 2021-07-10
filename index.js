var http = require('http'),
    httpProxy = require('http-proxy'),
    fs = require('fs'),
    config = require('./config');

var proxy = httpProxy.createProxyServer({});


var server = http.createServer((request, response) => {
    let isFoundRoute = false;

    config.redirects.forEach(redirect => {
        if (isFoundRoute) {
            return;
        }

        if (request.url.startsWith(redirect.url)) {
            isFoundRoute = true;
            proxy.web(request, response, {
                target: redirect.target + request.url.slice(redirect.url.length),
                ignorePath: redirect.params.ignorePath
            }, error => {
                console.log(`Proxy error: ${error.message} for url ${request.url}`)
                response.writeHead(503, { 'Content-Type': 'text/plain' });
                response.write('service unavailable');
                response.end();
            });
        }
    })

    if (!isFoundRoute) {
        console.log(`Route not found for url ${request.url}`)
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.write('route not found');
        response.end();
    }
});

server.listen(config.port);
console.log(`Router started at port ${config.port}`)