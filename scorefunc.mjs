
var json;
var name;
var maxScore;
var nowscore;
var indi;



window.addEventListener('load', (event) => {
  connect().then(display);
  });

document.addEventListener("keydown",keydown);

function btnclick(){
  var indi = text.value;
  console.log(indi);
  handleSubmit().then(lastDis);
}

let text = document.getElementById("name");
let button = document.getElementById("button");
button.addEventListener('click', btnclick);



function connect(){
    return new Promise((resolve, reject) => {
    console.log("開始");
    
      fetch("./score.json").then((res) => {
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      }).then((data) => {
        json = data;
        console.log(json);
        name = json.tName;
        maxScore = json.tScore;
        console.log("name = " + name + ", score = " + maxScore);
        resolve();
      }).catch((err) => {
        console.error("Fetch Error", err);
        reject(err);
      })
    });
}

function display(){
  return new Promise((resolve, reject) => {
    console.log("表示"); 
    fetch('./fetch.json', {
      method: 'post',
      headers: {'Content-Type': 'application/json'}
    }).then((res) => {
      if(!res.ok){
        throw new Error(`Http error! ${res.status}`);
      }
      return res.json();
    }).then((data) => {
      nowscore = data.score;
      console.log(nowscore);
    var scoreElem = document.createElement("p");
    var myElem = document.createElement("p");
    if(name == null){
      name = "noname";
    }
    scoreElem.textContent = maxScore + "      " + name;
    myElem.textContent = "今回のスコア     \n" + nowscore;
    var par = document.querySelector('.par');
    var chi = document.querySelector('.form');
    par.insertBefore(scoreElem, chi);
    par.insertBefore(myElem, chi);
      resolve();
    }).catch((err) => {
      console.log("err" + err);
      reject(err);
    })
    
  });
}

function handleSubmit(){
    console.log("名前登録開始");
    indi = document.getElementById("name");
    console.log("indi=" + indi.value);
    indi = indi.value;
    var data = {indi: indi}
    console.log("データは" + data);
    
    return new Promise((resolve, reject) => {
    fetch('./update.json', {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then((res) => {
      if(!res.ok){
        throw new Error(`Http error! status ${res.status}`);
      }
      return res.json();
    }).then((data) => {
      json = data;
      name = json.lName;
      maxScore = json.lScore;
      resolve();
      }).catch((err) => {
        console.error("Fetch Error", err);
        reject(err);
      });
    
  });
    }

function lastDis(){
    var top = maxScore + "      " + name;
    var now = "今回のスコア  " + indi + "      " + nowscore;
    var label = top + "\n" + now + "\npress esc to return home!";
    document.querySelector("div").innerHTML = label;
}

function keydown(e){
  var key = e.keyCode;
  
    if(key === 27){
      location.href = "app.html";
    }
  }


