import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";
//import "./app.js";


const require = createRequire(import.meta.url);

const mysql = require("mysql");
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Suisui1211',
    database: 'suikaDb'
});
function resister(){
    var sql = "INSERT INTO scoreTb VALUES "
}
/*const qSuika = "SELECT name FROM imageTb WHERE id = '1'";
const qEnemy = "SELECT name FROM imageTb WHERE id = '2'";

var suika;
var enem;
pool.getConnection((err, connection => {
    if(err) console,log(err);
    
    suika = connection.query(qSuika, (err, results) => {
        if(err) console.log(err);
        console.log(results);
    });
    enem = connection.query(qEnemy, (err, results) => {
        if(err) console.log(err);
        console.log(results);
    });
}));*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const http = require("http");
const fs = require("fs");
//const path = require("path");
var mine = {
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.jpeg': 'image.jpeg',
    '.jpg': 'image.jpeg',
    '.png': 'image.png'
};
const express = require("express");
const app = express();

//app.use(express.static(__dirname));

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("Hello");
});
app.get("/aaa", (req, res) => {
    res.send("aaa.html")
})
/*const server = http.createServer();

server.on('request', (req, res) => {
    let fileName = "";
    console.log(req.url);
    if(req.url == "/"){
        fileName = "/";
        res.end("yo");   
    }
    else if(req.url == "/aaa"){
        fileName = "aaa.html";
    }else if(req.url == "/app"){
        fileName = "app.html";
    }else if(req.url == "/bbb"){
        fileName = "bbb.html";
    }else if(req.url == "/app.js"){
        fileName = "app.js";
    }
    if(req.url == "/app.js/public/suika.png"){
        fileName = "/puclic/suika.png";
        res.writeHead(200,{
            'Content-Type': 'image/png; charset = utf-8'
        });
        var suika = fs.readFileSync("./public/suika.png", "binary");
        res.end(suika, "binary");
    }else if(req.url == "sword.png"){
        fileName = "/public/sword.png";
        res.writeHead(200,{
            'Content-Type': 'image/png; charset = utf-8'
        });
        var sword = fs.readFileSync("./public/sword.png","binary");
        res.end(sword,"bonary");
    }else{
    //console.log("ok");
    */

    /*fs.readFile("./app.js",'utf-8',(err, data) => {
        if(err){
            res.writeHead(404,{
                'Content-Type': 'text/plain'
            });
            res.write("Page Not Found");
            return res.end();
        }
        console.log("ok");
    });*/
    app.get("/:path", (req, res) => {
 
    var fileName = req.params.path;
    
    var fullPath = __dirname + "/" + fileName;
    console.log(fullPath);
    
        fs.readFile(fileName, function (err, data){
        if(err){
            res.writeHead(404,{
                'Content-Type': 'text/plain'
            });
            res.write("Page Not Found");
            res.end();
        }else{
        console.log(mine[path.extname(fullPath)]);
        var type = mine[path.extname(fullPath)];
        /*if(type == 'image.png'){
            res.writeHead(200, {
                'Content-Type': type
            });
            //var data = fs.readFileSync("./public/*.png");
            end(data, "binary");
        }*/
        res.writeHead(200, {
            'Content-Type': type
        });
        res.end(data);
        }});
    });
    
    app.listen(1338, () => {
        console.log("Server listening");
    });
/*server.listen(1337, () => {
    console.log("Server started");
});*/