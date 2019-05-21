window.onload = function(){
    var rythm = new Rythm();
    rythm.setMusic('./assets/music/gyoza.mp3');
    registerRythm();

    var onStart = function () {
        if (rythm.stopped === false) {
            rythm.stop()
        }
        rythm.start();
    }

    appendConciergeCallback(function(text){
        if(text === "The secret key was given"){
            onStart();
            createGyoza();
            doMove();
        }else if(text === "Up Side Down"){
            document.getElementById("main").classList.add("reverse");
        }else if(text === "May the Force be with you"){
            document.getElementById("wrapper1").classList.add("starwars-outer");
            document.getElementById("wrapper").classList.add("starwars-inner");
            new Audio('./assets/music/starwars.mp3').play(); // 再生される
            
        }
    })
    
    var t = 5;
    let gyozas = [];
    
    function createGyoza(){
        if(gyozas.length <= 10){
            gyozas.push(new Gyoza());
        }
        setTimeout(createGyoza, 3000);
    }
    
    function doMove(){
        for(var i = 0; i < gyozas.length; i++){
            gyozas[i].doMove();
        }
        setTimeout(doMove, t);
    }
           
    function registerRythm(){
        rythm.addRythm("pulse", "pulse", 150, 10);
        rythm.addRythm('neon1', 'neon', 0, 10, {
            from: [0, 0, 255],
            to: [255, 0, 255]
        })
        rythm.addRythm('neon2', 'neon', 0, 10, {
            from: [255, 255, 0],
            to: [255, 0, 0]
        })
        rythm.addRythm('blur', 'blur', 0, 10, {
            reverse: true
        })
        rythm.addRythm('color1', 'color', 0, 10, {
            from: [0, 0, 255],
            to: [255, 0, 255]
        })
        rythm.addRythm('borderWidth', 'borderWidth', 0, 2, {
            min: 2,
            max: 10
        })

        rythm.addRythm('borderColor2', 'borderColor', 0, 10, {
            from: [0, 0, 255],
            to: [255, 0, 255]
        })
        rythm.addRythm('kern1', 'kern', 0, 10, {
            min: -5,
            max: 5
        })
        rythm.addRythm('swing', 'swing', 0, 10, {
            curve: 'up',
        })
        rythm.addRythm('jump', 'jump', 0, 10);

        rythm.addRythm('shake', 'shake', 0, 10);
        rythm.addRythm('vanish1', 'vanish', 0, 10)
        rythm.addRythm('vanish2', 'vanish', 0, 10, {
            reverse: true
        })
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

class Gyoza{

    constructor(){
        this.img = document.createElement("img");
        this.img.classList.add("gyoza-img");
        this.img.src = "./images/gyoza.png";
        this.x = getRandomInt(0, window.innerWidth);
        this.y = getRandomInt(0, window.innerHeight);
        this.rx = getRandomInt(0, 360);
        this.vx = getRandomInt(1, 3);
        this.vy = getRandomInt(1, 3);
        this.rvx = getRandomInt(-10, 10) / 2;
        this.w = getRandomInt(75, 200);
        this.h = this.w * 0.8;
        this.onMoving = true;

        this.img.style.width = this.w + "px";
        this.img.style.height = this.h + "px";
        this.img.style.top = this.y;
        this.img.style.left = this.x;

        document.body.append(this.img);
    }

    doMove(){
        if(this.onMoving){
            var W = window.innerWidth;
            var H = window.innerHeight;

            this.x += this.vx;
            this.y += this.vy;
            if (  this.x <= 0) {
                this.x = 0;
                this.vx = -this.vx;
            }

            if (this.x + this.w >= W) {
                this.x = W - this.w;
                this.vx = -this.vx;
            }

            if (this.y <= 0) {
                this.y = 0;
                this.vy = -this.vy;
            }

            if (this.y + this.h >= H) {
                this.y = H - this.h;
                this.vy = -this.vy;
            }

            this.rx += this.rvx;
            if(this.rx <= 0){
                this.rx += 360;
            }
            if(this.rx >= 360){
                this.rx -= 360;
            }
            this.img.style.left = this.x + "px";
            this.img.style.top = this.y + "px";

            this.img.style.webkitTransform = "rotate("+this.rx+"deg)";
            this.img.style.mozTransform = "rotate("+this.rx+"deg)";
            this.img.style.msTransform = "rotate("+this.rx+"deg)";
            this.img.style.oTransform = "rotate("+this.rx+"deg)";
            this.img.style.transform = "rotate("+this.rx+"deg)";
        }
    }
}
