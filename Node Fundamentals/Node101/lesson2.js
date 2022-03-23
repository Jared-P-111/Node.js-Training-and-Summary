//Modules 
const http = require('http');
const url = require('url');

//SERVER
//The http object from node allows the server to instantiate and be a listener. 
/*--------------------------------------------------------- */
const server = http.createServer((request, response) => {
    console.log(request.url);
    response.end("Hello from the server!");
})

server.listen(8000, '127.0.0.1', () => {
    console.log("Server listening to requests on -> port 8000");
})