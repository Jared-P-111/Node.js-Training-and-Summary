const fs = require('fs') //<-- (fileSystem management)
const http = require('http') //<-- (server)
const url = require('url') //<-- (Routing management)

//This is top level code and is not ran for each request. We are storing the 
//data here so it isn't read each time the server has to do a return response. 
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);

//This createServer gets ran each time there is a request from the browser
const server = http.createServer((request, response) => {
    const pathName = request.url;

    //Routing 
    if(pathName === '/' || pathName === '/overview'){
        response.end('This is the overview page!');
    } else if (pathName === '/product'){
        response.end('This is the product page!');
    } else if (pathName === '/api'){
        //Notice we are accessing the file with the __dirname this is more or less industry standard. instead of the ( . )
            response.writeHead(200, {'content-type': 'application/json'})
            response.end(data);
    } else {
        //writehead sends meta data to the browser.
        response.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'Hello-world'
        })
        response.end('<h1>Page not found!<h1>');
    }
})

//This creates a listener between the browser and the backend. 
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening on port 8000');
})
