// content of index.js
const http = require('http');
const port = 3000;

// create a handler to handle incoming requests
const requestHandler = (request, response) => {
    console.log(request.url, request.method);
    response.end('Hello world')
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
