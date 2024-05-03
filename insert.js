
export var lScore;
export var lName;
export var score;
var id;

export function nameUpdate(data, con){
    return new Promise((resolve, reject) => {
    var maxId = `SELECT max(id) AS Maxid FROM scoreTb;`;
    con.query(maxId, (err, results) =>{
        if(err) console.log(err);
        id = results[0].Maxid; 
        console.log(id);
        console.dir(data);
    var q = `UPDATE scoreTb SET name = "${data.indi}" WHERE id = ${id}`;
    con.query(q, (err, reaults) => {
        if(err) console.log(err);
        console.log("名前登録完了");
        resolve();
    });
}); 
});
}

export function update(data, con){
    return new Promise((resolve, reject) => {
    var nowQ = 'SELECT MAX(time) AS Maxtime FROM scoreTb';
    con.query(nowQ, (err, results) => {
        if(err) console.log(err);
        console.log("時間取得");
        var now = results;
    var q = `UPDATE scoreTb name=${data.indi} WHERE time = ${now}`;
    con.query(q, (err, reaults) => {
        if(err) console.log(err);
        console.log("update完了");
        resolve();
    });
});
});
}

export function fetchData(con){
    return new Promise((resolve, reject) => {
        //var maxQ = `SELECT MAX(time) AS Maxtime FROM scoreTb`;
        var checkId = `SELECT score FROM scoreTb ORDER BY id DESC LIMIT 1;`;
        
        //var maxQ = `SELECT score FROM scoreTb WHERE id = ${id}`;
        con.query(checkId, (err, results) => {
            if(err) console.log(err);
            //var Maxtime = results[0].Maxtime;
            score = results[0].score;
            console.log(score);
            resolve();
        
        /*var q = `SELECT score FROM scoreTb WHERE time = "${Maxtime}"`;
        con.query(q, (err, results) => {
            if(err) console.log(err);
            console.log("今のスコア" + results[0].score);
            score = results[0].name;
            resolve();
        });*/
    });
});
}

export function scoreInsert(data, con){
    return new Promise((resolve, reject) => {
        var q = `INSERT INTO scoreTb (score, time) VALUES (${data.score}, NOW());`;
        con.query(q, (err, results) => {
            if(err) console.log(err);
            console.log("今回のスコアinsert完了");
            resolve();
        })
    })
}

export function lastDis(con){
    return new Promise((resolve, reject) => {
    var qScore = "SELECT MAX(score) FROM scoreTb";
    var qName = "SELECT name FROM scoreTb WHERE score = MAX(score)"
    con.query(qScore, (err, results) => {
        if(err) console.log(err);
        console.log(results);
        lScore = results;
    })
    connect.query(qName, (err, results) => {
        if(err) console.log(err);
        lName = results;
        resolve();
    });
    });
}