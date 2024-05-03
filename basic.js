import { createRequire } from "module";
import { funcdisplay, tName, tScore } from "./display.js";
import { fetchData, update, score, nameUpdate, scoreInsert } from "./insert.js";
import * as mysql from "mysql";

const require = createRequire(import.meta.url);
const path = require("path");
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const express = require("express");
export const app = express();
export var j;
export var lastJ;
var data;
var con;

const http = require("http");
const fs = require("fs");

var mime = {
    '.mjs': 'text/javascript', 
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.jpeg': 'image.jpeg',
    '.jpg': 'image.jpeg',
    '.png': 'image.png',
    '.json': 'application/json',
    '.css': 'text/css'
};

function dbconnect(){
    return new Promise((resolve, reject) => {

    
    con = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'Suisui1211',
        database: 'suikaDb'
    });

    con.connect((err) => {
    if(err){
        console.log("err" + err.stack);
        return;
    }
    console.log("success");
    resolve();
});
});
}

app.use(express.static('public'));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/score.json", (req,res)=>{
    console.log("スコア表示");
    dbconnect().then(funcdisplay(con).then(function(){
    j = {tName: tName, tScore: tScore};
    res.json(j);
}));
});
app.get("/insert.json", (req, res) => {
    console.log("insert開始");
    console.log(req.body);
    dbconnect().then(insert(req.body, con).then(funcdisplay(con).then(function(){
        lastJ = {lName: tName, lScore: tScore};
        res.json(lastJ);
    })));
});
app.post("/fetch.json", (req, res) => {
    console.log("取得開始");
    dbconnect().then(fetchData(con).then(function(){
        data = {score: score};
        console.log("今回は" + data.score);
        res.json(data);
    }));
});
app.post("/update.json", (req, res) => {
    console.log("update開始" + req.body);
    dbconnect().then(nameUpdate(req.body, con).then(funcdisplay(con).then(function(){
        lastJ = {lName: tName, lScore: tScore};
        res.json(lastJ);
    })));
});
app.post("/time.json", (req, res) => {
    console.log("今回のスコア" + req.body);
    dbconnect().then(scoreInsert(req.body, con));
    res.end();
});
    app.get("/:path", (req, res) => {
   
    var fileName = req.params.path;
    
    var __dirname = path.dirname(fileName);

    var fullPath = __dirname + "/" + fileName;
    console.log(fullPath);

    
        fs.readFile(fileName, function (err, data){
        if(err){
            res.writeHead(404,{
                'Content-Type': 'text/plain'
            });
            res.write("Page Not Found");
            res.end();
        }else if(fileName == "/*.json") {
            console.log("no");
            return;
        }else{
        console.log(mime[path.extname(fullPath)]);
        var type = mime[path.extname(fullPath)];
        
        res.writeHead(200, {
            'Content-Type': type
        });
        res.end(data);
        }});
    });
    
    app.listen(1338, () => {
        console.log("Server listening");
    });
