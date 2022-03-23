const fs = require('fs') //<-- (fileSystem management)
const http = require('http') //<-- (server)
const url = require('url') //<-- (Routing management)

const server = http.createServer((request, response) => {
    const pathName = request.url;

    if(pathName === '/' || pathName === '/overview'){
        response.end('This is the overview page!');
    } else if (pathName === '/product'){
        response.end('This is the product page!');
    } else {
        response.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'Hello-world'
        })
        response.end('<h1>This page could not be found!<h1>');
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening on port 8000');
})