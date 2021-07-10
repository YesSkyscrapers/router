const config = {
    port: 1000,
    redirects: [{
        url: '/api/identity',
        target: 'http://localhost:9000',
        params: {
            ignorePath: true
        }
    },
    {
        url: '/api/d1',
        target: 'http://localhost:8000',
        params: {
            ignorePath: true
        }
    }]
}

module.exports = config