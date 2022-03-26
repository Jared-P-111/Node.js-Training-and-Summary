const fs = require('fs') //<-- (fileSystem management)
const http = require('http') //<-- (server)
const url = require('url') //<-- (Routing management)

//This is top level code and is not ran for each request. We are storing the 
//data here so it isn't read each time the server has to do a return response. 

//HTML Templates
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

//Json Data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')

//Javascript Object 
const dataObj = JSON.parse(data);//<- Becomes a javascript object.

//This createServer gets ran each time there is a request from a client
//-- SERVER --
const server = http.createServer((request, response) => {
    const pathName = request.url;

    //  -- ROUTING -- 
    //Overview Page
    if(pathName === '/' || pathName === '/overview'){
        //Tells browser what type of content its recieving (Headers)
        response.writeHead(200, {'content-type': 'text/html'})
        response.end(tempOverview);

    //Product Page
    } else if (pathName === '/product'){
        response.end('This is the product page!');

    //A P I
    } else if (pathName === '/api'){
        //Notice we are accessing the file with the __dirname this is more or less industry standard. instead of the ( . )
            response.writeHead(200, {'content-type': 'application/json'})
            response.end(data);

    //Not Found
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