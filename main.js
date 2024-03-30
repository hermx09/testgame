const http = require("http");
const fs = require("fs");
const port = 8000;

const server = http.createServer((req, res) => {
    var fileName;
    if(req.url == "/app"){
        fileName = "app.html";
    }else if(req.url == "/over"){
        fileName == "over.html";
    }
    
    fs.readFile(__dirname + "/" + fileName, 'utf-8', (err, data) => {
        if(err){
            res.writeHead(404,{ 
                'Content-Type': 'text/plain'});
                const  resMsg = "Page Not Found";
                res.end(resMsg);
        }
        res.writeHead(200,{
            'Content-Type': 'text/html'
        });
        res.end(data);
    });
});

server.listen(port);
console.log(`The server has started and is listening on port number : ${port}`);

