/**
 * This is an example of a simple bare bones routing mechanism
 */
const http = require('http');
const port = 3000;

const routes = [
    {
        method: 'GET',
        path: '/hello',
        handler(req, res) {
            res.end(`
            <html>
            Hello there!, try visiting <a href="http://localhost:${port}/cat">http://localhost:${port}/cat<a>
            </html>
            `)
        }
    },
    {
        method: 'POST',
        path: '/hello',
        handler(req, res) {
            res.end('Nothing to post here 🤔')
        }
    },
    {
        method: 'GET',
        path: '/cat',
        handler(req, res) {
            res.writeHead(302, {
                'Location': 'https://cataas.com/cat'
            });
            res.end();
        }
    }
];

// create a handler to handle incoming requests
const requestHandler = (request, response) => {
    const route = routes.find((r) => {
        return request.url === r.path && request.method === r.method;
    });
    if (route) {
        return route.handler(request, response);
    } else {
        response.end(`cannot find ${request.method} ${request.url}`);
    }
};

// create the server with our handler
const server = http.createServer(requestHandler);

// listen on our port
server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened 😥', err)
    }
    console.log(`server is listening on http://localhost:${port}/   🚀`)
});
