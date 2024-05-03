//import * as mysql from "mysql";


export var tScore;
export var tName;

//let con;

/*export function dbconnect(){
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
}*/


export function funcdisplay(con){
    return new Promise((resolve, reject) => {
    var qScore = "SELECT MAX(score) AS Maxscore FROM scoreTb";
    con.query(qScore, (err, results) => {
        if(err) console.log(err);
        tScore = results[0].Maxscore;
    var qName = `SELECT name FROM scoreTb WHERE score = ${tScore}`;
    con.query(qName, (err, results) => {
        if(err) console.log(err);
        tName = results[0].name;
        resolve();
    /*var timeInsert = `INSERT INTO scoreTb (time) VALUES (NOW())`;
    con.query(timeInsert, (err, results) => {
        if(err) console.log(err);
        resolve();
    });*/
    });
});
});
}





