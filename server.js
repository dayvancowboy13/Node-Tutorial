const http = require('http');
const fs = require('fs');
const ld = require('lodash');


const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // lodash
    const num = ld.random(0,20);
    console.log(num);

    const greet = ld.once(() => {
        console.log('hello')
    });

    greet();
    greet();

    // set header content type
    res.setHeader('Content-Type', 'text/html');
    
    // figure out the current path to serve different pages

    // first delcare the base folder in which the html files are stored
    let path = './views/';
    switch(req.url) {
        case '/': // serve the index page with 200 code for default page
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me': // redirect users who are looking for an old about-me page to the current about
            res.statusCode = 301; // use status code to indicate resource not available
            res.setHeader('Location', '/about')
            res.end();
            break;
        default: // if the URL is anything else, serve a 404 page
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // send html file
    fs.readFile(path, (err, data) =>{
        if(err){
            console.log(err);
        res.end();
        } else {
            console.log('Sending html page');
            
            res.end(data);
        }
    })

});

server.listen(3000, 'localhost', 
    () => {
        console.log('Listening for requests on port 3000');
    }
);