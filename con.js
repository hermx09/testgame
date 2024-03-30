import { createRequire } from "module";

const require = createRequire(import.meta.url);

const mysql = require("mysql");

const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Suisui1211',
    database: 'suikaDb'
});
const q = "INSERT INTO imageTb (image, name, type) VALUES (NULL, './public/sword.png', 'png');"; 
con.query(q, (err, results) => {
    if(err) console.log(err);
    console.log(results);
});
/*con.connect((err) => {
    if(err){
        console.log(err);
    }
    console.log("connected");

    const q = "INSERT INTO imageTb (image, name, type) VALUES (NULL, './public/suika.png', 'png');";
    con.query(q, (err, result, fields) => {
        if(err) {
            console.log(err);
            }
        console.log("ok");
        console.log(result);
    });
});*/



