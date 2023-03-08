window.onload = function() {
    cob = false;

    function strst() {
        cob = true;
    }
    const boc = document.getElementById('boc');
    boc.addEventListener('click', strst);
    if (cob) {

        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        document.body.style.overflow = 'hidden';
        ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let money = 20;
        let id = 0;
        let upg1 = 1;
        let circles = [];
        let pris = 3;
        let gg = 0;
        class Circle {
            constructor(id, b) {
                if (b == 0) {
                    this.color = `rgb(50,255,50,50.7)`;
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
                ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.fillStyle = "lightblue";
            }

            move() {
                this.y += 10;
                if (this.y > canvas.height) {
                    circles.splice(this.id, 1);
                    console.log(circles);
                }
            }
        }

        function update_money() {
            ctx.font = "70px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(Math.round(money * 100) / 100, 10, 50);
            ctx.font = "50px Arial";
            ctx.fillText(String(gg) + "/100", window.innerWidth / 2 - 60, window.innerHeight / 1.2);
            ctx.fillStyle = "lightblue";
        }

        function update_block() {
            c = Math.random() * 25;
            if (Math.random() * 2 > 1) {
                document.getElementById("button").style.left = (50 - (c / 2)).toString() + "%";
                document.getElementById("button").style.width = (c).toString() + "%";
                document.getElementById("button2").style.left = (50 + ((25 - c) / 2)).toString() + "%";
                document.getElementById("button2").style.width = (25 - c).toString() + "%";
            } else {
                document.getElementById("button2").style.left = (50 - (c / 2)).toString() + "%";
                document.getElementById("button2").style.width = (c).toString() + "%";
                document.getElementById("button").style.left = (50 + ((25 - c) / 2)).toString() + "%";
                document.getElementById("button").style.width = (25 - c).toString() + "%";
            }
        }

        function clicked(col) {
            if (col) {
                circles.push(new Circle(id, 0));
                money = Math.round(((money + 1 + (100 * (1 - upg1))) * 100)) / 100;
            } else {
                circles.push(new Circle(id, 1));
                money = Math.round(money / 1.2);
            }
            id += 1;
            update_block();
            update_money();
        }

        const upgrad1 = document.getElementById('upgrade1');

        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        function gameover(status) {
            if (status) {

            } else {

            }
        }

        function upgrade1() {
            if (money >= pris) {
                money -= pris;
                upg1 -= 0.01;
                gg = Math.floor(upg1 * 100);
                pris = pris + (pris * 0.1);
                document.getElementById("upgrade1").innerText = "Upgrade Click: " + Math.round(pris).toString();
                document.getElementById("upgrade1").style.backgroundColor = `rgb(55,255,55,1)`;
                document.getElementById("button").style.backgroundColor = `rgb(80,250,80,${upg1})`;
                delay(300).then(() => document.getElementById("upgrade1").style.backgroundColor = `rgb(0,0,0,0)`);
                if (upg1 == 100) {
                    gameover(false);
                }

                update_money();
            } else {
                document.getElementById("upgrade1").style.backgroundColor = `rgb(255,50,50,1)`;
                delay(300).then(() => document.getElementById("upgrade1").style.backgroundColor = `rgb(0,0,0,0.0)`);
            }
        }
        upgrad1.addEventListener('click', upgrade1);

        const button = document.getElementById('button');
        button.addEventListener('click', clicked(true));
        const button2 = document.getElementById('button2');
        button2.addEventListener('click', clicked(false));

        const interval = setInterval(function() {
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            update_money();
            if (money > 0.1) {
                money -= 0.05;
            } else {
                gameover(true);
            }
            circles.forEach(c => c.display(ctx));
            circles.forEach(c => c.move());

        }, 100);
    }


};