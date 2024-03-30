//const { createAudio } = require('node-mp3-player')
//const Audio = createAudio();

var canvas, g;

var player;//, enemy;
var score;
var frameCount;
var scene;
var particles;
var enemy, next;
//var back, rback;
var tree, nextT;
var pause;
//var image, posX, posY, speed, acceleration, r;
const music = new Audio("./eva.mp3");
const bgm = new Audio("./bgm2.mp3");
const up = new Audio("./bgm1.mp3");
const poison = new Audio("./poison.mp3");
const love = new Audio("./love.mp3");

/*const music = await Audio("./eva.mp3");
const up = await Audio("./bgm1.mp3");
const poison = await Audio("./poison.mp3");
const love = await Audio("./love.mp3");*/

/*function playSound(path) {
    return new Promise((resolve, reject) => {
      player.play({path: path}).then(() => {
        resolve();
      }).catch((error) => {
        console.error(error);
        reject(error);
      });
    });
  }*/



var Scenes = {
    Home: "Home",
    GameMain: "GameMain",
    GameOver: "GameOver",
    Score: "Score"
};

onload = function(){
    canvas = document.getElementById("gamecanvas");
    g = canvas.getContext("2d");
    scene = Scenes.Home;
    //init();
    document.addEventListener("keydown",keydown);
    setInterval("gameLoop()",16);
};
//初期化
function init(){
    player = new Sprite();
    player.posX = 120;
    player.posY = 600;
    player.image = new Image();
    player.image.src = "./suika.png";
    player.speed = 0;
    player.acceleration = 0;
    player.r = 16;

    
    tree = [];
    nextT = 8;
    

    enemy = [];
    next = 10;


    score = 0;
    scene = Scenes.GameMain;
    particles = [];
    
    pause = false;
    frameCount = 0;
    bound = true;
    music.play();
};



function keydown(e){
    key = e.keyCode;
    if(scene == Scenes.Home){
    init();
    setInterval("gameLoop()",16);
    }
    if(scene == Scenes.GameOver){
        if(key === 27){
        window.location.reload(false);
        }else if(key == 32){
            scene = Scenes.Score;
        }
    }
    /*if(scene == Scenes.GameMain){
        document.addEventListener("keydown",stop);
    }*/
    if(player.posY < 600){
        return;
    }
    player.speed = -20;
    player.acceleration = 1;
};

function gameLoop(){
    update();
    draw();
};

function update(){
        
    if(scene == Scenes.GameMain){
    player.speed = player.speed + player.acceleration;
    player.posY = player.posY + player.speed;
    //back.posX -= back.speed;
    //rback.posX -= rback.speed;
    if(player.posY > 600){
        player.posY = 600;
        player.speed = 0;
        player.acceleration = 0;
    }
    if(7000 <= score){
        music.pause();
        bgm.play();
    }
    if(10000 <= score){
        bgm.pause();
        up.play();
    }
    if(20000 <= score){
        up.pause();
        poison.play();
        poison.loop = true;
    }
    if(40000 <= score){
        poison.pause();
        love.play();
    }
    /*if(rback.posX == 0){
        back.posX = 800;
    }
    if(back.posX == 0){
        rback.posX = 0;
    }
    /*enemy.posX -= enemy.speed;
     if(enemy.posX < -20){
        enemy.posX = 900;
        score += 100;
    }*/

    enemy.forEach((e) => {
        e.update();
        if(e.posX < -20){
            score += 100;
        }
    });

    enemy = enemy.filter((e) => e.posX >= -20);

    /*tree.forEach((t) => {
        t.update();
    })
    tree = tree.filter((t) => t.posX >= -20)*/
    if(frameCount == next){
        generateE();
    }
    /*if(frameCount == nextT){
        generateTree();
    }*/

    hitCheck();
   /* var disX = player.posX - enemy.posX;
    var disY = player.posY - enemy.posY;
    var dis  = Math.sqrt(disX * disX + disY * disY);
    console.log(enemy.r);
     if(dis < player.r + enemy.r){
        scene = Scenes.GameOver;
        player.speed = -20;
        player.acceleration = 0.5;
        frameCount = 0;
        for(var i = 0 ; i < 300; i ++){
            particles.push(new Particle(player.posX, player.posY));
        }
     }*/
     
        /*enemy.forEach((e) => {
            if(pause){
            e.speed = 0;
            e.acceleration = 0;
            player.speed = 0;
            player.acceleration = 0;
            frameCount = 0;
        }else{
            e.speed = 3;
            return;
        }
        })*/
     
    }else if(scene == Scenes.GameOver){
        
        /*player.speed = player.speed + player.acceleration;
        player.posY = player.posY + player.speed;*/
        
        //enemy.posX = enemy.posX - enemy.speed;
        enemy.forEach((e) => {
            e.posX -= e.speed;
        });
        
        particles.forEach((p) => {
            p.update();
            p.draw(g);
        });
        /*if(player.posX < 20 || player.posX > 800){
            bound = !bound;
        };
        if(bound){
            player.posX +=  30;
        }else{
            player.posX -= 30;
        }*/
     }else if(scene == Scenes.Score){
        const http = new XMLHttpRequest();
        const url = "http://localhost:1338/score.html";
        http.open('GET', url);
        http.send();

     }

//console.log(scene);
frameCount ++;
//console.log(frameCount);
}

function draw(){
    g.imageSmoothingEnabled = false;

    if(scene == Scenes.Home){
        g.fillStyle = "black";
        g.fillRect(0,0,800,700);

        g.fillStyle = "white";
        g.font = "bold 48px serif";
        var HomeLabel = "スイカ割り";
        var labelW = g.measureText(HomeLabel).width;
        g.fillText(HomeLabel, 400 - labelW / 2, 400);


        g.fillStyle = "white";
        g.font = "bold 16px serif";
        var startLabel = "PRESS START";
        var sLabelW = g.measureText(startLabel).width;
        g.fillText(startLabel, 400 - sLabelW / 2, 500);

    }else if(scene == Scenes.GameMain){
    g.fillStyle = "black";
    g.fillRect(0,0,800,700);


    /*back.drawBack(g);
    rback.drawBack(g);
    /*g.drawImage(
        player.image,
        player.posX,
        player.posY,
        50,50
    )
    g.drawImage(
        enemy.image,
        enemy.posX,
        enemy.posY,
        50,50 
    )*/
    
    player.draw(g);
    enemy.forEach((e) => {
        e.draw(g);
    });

    /*tree.forEach((t) => {
        t.drawT(g);
    });*/

    /*tree.forEach((t) => {
    var tHeight = g.measureText(t).height;*/
    /*g.drawImage(
        t.image,
        t.posX,
        t.posY - tHeight,
        100,
        200
    );*/
    
    
    g.fillStyle = "white";
    g.font = "32pt Arial";
    var scorelabel = "score:" + score;
    var scoreW = g.measureText(scorelabel).width;
    g.fillText(scorelabel, 750 - scoreW, 40);}
else if(scene == Scenes.GameOver){

        g.fillStyle = "black";
        g.fillRect(0,0,800,700);


        /*back.drawBack(g);
        rback.drawBack(g);
        /*if(frameCount < 120){
            g.save;
            g.translate(player.posX,player.posY);
            g.rotate(((frameCount % 30) * Math.PI * 2) / 30);
            g.drawImage(
                player.image,
                player.image.width / 2,
                player.width.image / 2,
                player.image.width + frameCount,
                player.image.height + frameCount
            );
            g.restore();
        }*/
        /*g.drawImage(
            player.image,
            player.posX,
            player.posY,
            50,50
        )

        g.drawImage(
            enemy.image,
            enemy.posX,
            enemy.posY,
            50,50 
        )*/

        //player.draw(g);
        particles.forEach((p) => {
            p.draw(g);
        });
        enemy.forEach((e) => {
            e.draw(g);
        });
        /*tree.forEach((t) => {
            t.drawT(g);
        });*/
        g.fillStyle = "white";
        g.font = "32pt Arial";
        var scorelabel = "score:" + score;
        var scoreW = g.measureText(scorelabel).width;
        g.fillText(scorelabel, 400 - scoreW / 2, 350);

        g.fillStyle = "white";
        g.font = "48pt Arial";
        var overlabel = "GAME OVER";
        var overW = g.measureText(overlabel).width;
        g.fillText(overlabel, 400 - overW / 2, 300);

        g.fillStyle = "white";
        g.font = "bold 16px serif";
        var nextLabel = "press esc to return home";
        var nextW = g.measureText(nextLabel).width;
        g.fillText(nextLabel, 500, 450);
    }
}

function generateE(){
    var newE = new Enemy(
        800,
        600 - (Math.random() < 0.5 ? 0 : 50),
        15,
        "./sword.png",
        4 + 5 * Math.random(),
        0
    );

    enemy.push(newE);
    next = Math.floor(frameCount + 50 + 80 * Math.random());
};

function generateTree(){
    var newT = new Enemy(
        800,
        580 ,
        0,
        "./treef.png",
        3 + 5 * Math.random(),
        0
    );

    tree.push(newT);
    nextT = Math.floor(frameCount + 20 + 20 * Math.random());
};

function hitCheck(){
    enemy.forEach((e) => {
    var disX = player.posX - e.posX;
    var disY = player.posY - e.posY;
    var dis  = Math.sqrt(disX * disX + disY * disY);
    if(dis < player.r + e.r){
        scene = Scenes.GameOver;

        frameCount = 0;
        for(var i = 0 ; i < 300; i ++){
            particles.push(new Particle(player.posX, player.posY));
        }
    }
    })
}

/*function pause(){
    if(player.posY < 600){
        player.speed = 0;
        player.acceleration = 0;
        enemy.forEach((e) =>{
            e.speed = 0;
        });
        setInterval("stop()",16);
        document.removeEventListener("keydown",pause());
        }
    }

*/
function stop(){
    pause = true;
    console.log(pause);
    document.addEventListener("keydown",start);
    }

function start(){
    pause = false;
}


class Sprite{
    image = null;
    posX = 0;
    posY = 0;
    speed = 0;
    acceleration = 0;
    r = 0;

constructor(){}

  draw(g){
    
        g.drawImage(
            this.image,
            this.posX,
            this.posY,
            50,50
        );
    
    };
  drawBack(g){
        g.drawImage(
        this.image,
        this.posX,
        this.posY,
        800,
        700
        );
    };
   /*drawT(g){
    tree.forEach((t) => {
    var tHeight = g.measureText(t).height;
        g.drawImage(
            this.image,
            this.posX,
            this.posY - tHeight,
            100,
            200
        );
    });
    };*/
};
class Particle extends Sprite{
    baseLine = 0;
    acceleration = 0;
    speedX = 0;
    speedY = 0;

    constructor(x,y){
        super();
        this.posX = x;
        this.posY = y;
        this.baseLine = 600;
        this.acceleration = 0.5;
        var angle = (Math.PI * 5) / 4 + (Math.PI / 2) * Math.random();
        this.speed = 5 + Math.random() * 20;
        this.speedX = this.speed * Math.cos(angle);
        this.speedY = this.speed * Math.sin(angle);
        this.r = 2;
    }

    update(){
        this.speedX *= 0.97;
        this.speedY += this.acceleration;
        this.posX += this.speedX;
        this.posY += this.speedY;
        if(this.posY > this.baseLine){
            this.posY = this.baseLine;
            this.speedY = this.speedY * -1 * (Math.random() * 0.5 + 0.3);
        };
    };
    draw(g){
        g.fillStyle = "red";
        g.fillRect(this.posX - this.r, this.posY - this.r, this.r * 2, this.r * 2);
    };
}
class Enemy extends Sprite{
    constructor(posX, posY, r, image, speed, acceleration){
        super();
        this.posX = posX;
        this.posY = posY;
        this.r = r;
        this.image = new Image();
        this.image.src = image;
        this.speed = speed;
        this.acceleration = acceleration;
    }

    update(){
        this.posX -= this.speed;
    }
}






