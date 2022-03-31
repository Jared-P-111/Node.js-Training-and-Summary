//Core modules
const fs = require('fs') //<-- (fileSystem management)
const http = require('http') //<-- (server)
const url = require('url') //<-- (Routing management)

//Third Party Modules
//Changes last part of the URL which considered the slug.This makes it custom for identiy for the website
const slugify = require('slugify');

//Our Local Modules
//Helper function import: This function will map over the data that was paresed to javascript object. It will
//swap the text that is maintaining the {%PLACE_HOLDERS%}. its located in modules / replaceTemplate.js
const replaceTemplate = require('./modules/replaceTemplate')

//HTML Templates
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

//Json Data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')

//Javascript Object 
const dataObj = JSON.parse(data);//<- Becomes a javascript object.

//This createServer gets ran each time there is a request from a client browser
//-- SERVER --

const server = http.createServer((req, response) => {
    const myUrl = new URL(req.url, "http:localhost:8000/")
    const id = myUrl.searchParams.get('id');
    const pathname = myUrl.pathname;
    
    //  -- ROUTING -- 
    //Overview Page
    if(pathname === '/' || pathname === '/overview'){
        //Tells browser what type of content its recieving (Headers)
        response.writeHead(200, {'content-type': 'text/html'})
        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard, element)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        response.end(output);

    //Product Page
    } else if (pathname === '/product'){
        response.writeHead(200, {'content-type': 'text/html'})
        const product = dataObj[id]
        const output = replaceTemplate(tempProduct, product);
        response.end(output);

    //A P I
    } else if (pathname === '/api'){
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

//This create8s a listener between the browser and the backend. 
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening on port 8000');
})