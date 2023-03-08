window.onload = function() {
    const boc = document.getElementById('boc');
    var BackgroundSound = new Audio('sounds/background.mp3');
    boc.addEventListener('click', strst);

    const MS = document.getElementById("mainScreen");

    function strst() {
        MS.style.display = "none";
        BackgroundSound.play();

        const cav = document.getElementById("cav");
        cav.style.display = "inherit";

        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        var clickedSound = new Audio('sounds/clickedSound2.wav');
        var upgradeSound = new Audio('sounds/upgradeSound.wav');

        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        document.body.style.overflow = 'hidden';
        let money = 5;
        let id = 0;
        let upg1 = 1;
        let circles = [];
        let pris = 3;
        let minus = 0.05;
        let gg = 0;
        class Circle {
            constructor(id, b) {
                if (b == 0) {
                    this.color = `rgb(255,255,255,50.7)`;
                } else {
                    this.color = `rgb(215,50,50,0.7)`;
                }
                this.x = Math.random() * canvas.width;
                this.y = 0;
                this.radius = Math.random() * 20;
                this.id = id;
            }

            display(ctx) {
                ctx.beginPath();
                ctx.arc(this.x - (this.radius / 2), this.y + (this.radius / 2), this.radius, 0, 2 * Math.PI);
                ctx.fillStyle = `rgb(33, 33, 33,0.7)`;
                ctx.fill();
                ctx.fillStyle = "lightblue";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.fillStyle = "lightblue";
            }

            move() {
                this.y += 10;
                if (this.y > canvas.height) {
                    circles.splice(this.id, 1);
                    ctx.closePath();
                }
            }
        }

        function getRandomNumber(max) {
            return Math.floor(Math.random() * max);
        }

        const first = document.getElementById('first');
        const second = document.getElementById('second');

        function update_block() {
            button.classList.toggle("flipped");
            button2.classList.toggle("flipped");

            button.classList.remove("move-animation");
            button2.classList.remove("move-animation");

            void first.offsetWidth;
            button.classList.add("move-animation");
            first.style.left = getRandomNumber(window.innerWidth - first.offsetWidth) + "px";
            first.style.top = getRandomNumber(window.innerHeight - first.offsetHeight * 1) + "px";

            void second.offsetWidth;
            button2.classList.add("move-animation");
            second.style.left = getRandomNumber(window.innerWidth - second.offsetWidth) + "px";
            second.style.top = getRandomNumber(window.innerHeight - second.offsetHeight * 1) + "px";

        }

        function clicked(col) {
            if (BackgroundSound.paused) {
                BackgroundSound.play();
            }
            clickedSound.play();

            if (col) {
                circles.push(new Circle(id, 0));
                money = Math.round(((money + 1 + (100 * (1 - upg1))) * 100)) / 100;
            } else {
                circles.push(new Circle(id, 1));
                money = Math.round(money / 1.2);
            }
            id += 1;
            update_block();
        }
        const upgrad1 = document.getElementById('upgrade1');

        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        function upgrade1() {
            if (money >= pris) {
                upgradeSound.play();
                money -= pris;
                upg1 -= 0.01;
                minus += (minus * 0.0431);
                gg = Math.floor(upg1 * 100);
                pris = pris + (pris * 0.1);
                document.getElementById("upgrade1").innerText = "Upgrade Click: " + Math.round(pris).toString();
                document.getElementById("upgrade1").style.backgroundColor = `rgb(55,255,55,1)`;
                delay(300).then(() => document.getElementById("upgrade1").style.backgroundColor = `rgb(255, 255, 255, 1)`);
                if (upg1 == 100) {
                    gameover(false);
                }
            } else {
                document.getElementById("upgrade1").style.backgroundColor = `rgb(255,50,50,1)`;
                delay(300).then(() => document.getElementById("upgrade1").style.backgroundColor = `rgb(255, 255, 255, 1)`);
            }
        }
        upgrad1.addEventListener('click', upgrade1);
        const button = document.getElementById('button');
        button.addEventListener('click', () => clicked(true));
        const button2 = document.getElementById('button2');
        button2.addEventListener('click', () => clicked(false));

        update_block();
        const interval = setInterval(function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById("curMoney").innerHTML = (Math.round(money * 100) / 100).toString();
            document.getElementById("cc").innerHTML = 100 - gg + "/100";

            if (money > 0) {
                money -= minus;
            } else {
                gameover(true);
            }
            circles.forEach(c => c.display(ctx));
            for (let i = circles.length - 1; i >= 0; i--) {
                let circle = circles[i];
                circle.move();
                if (circle.y > canvas.height) {
                    circles.splice(i, 1);
                }
            }
        }, 100);

        function gameover(status) {
            BackgroundSound.pause();
            clearInterval(interval);
            MS.style.display = "inherit";
            cav.style.display = "none";
            if (status) {
                var end = new Audio('sounds/lose.wav');
                document.getElementById("pp").innerHTML = "You Lost!";
            } else {
                var end = new Audio('sounds/win.wav');
                document.getElementById("pp").innerHTML = "You Win!";
            }
            end.play();
        }
    }
};