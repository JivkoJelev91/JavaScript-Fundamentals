(function app(){
    let catSpeed = 5;
    let mouseSpeed = 2;
    let resourses = 2;
    let theCat = document.getElementById('theCat');
    theCat.onload = onResouseLoad;
    theCat.src = 'cat.png';
    let theMouse = document.getElementById('theMouse');
    theMouse.src = 'mouse.png';
    theMouse.onload = onResouseLoad;


    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let cat = {x: 400, y:300};
    let mouse = {x:100, y:100, dirX: true,dirY: true};
    let score = 0;
    let keyPressed = {};
    let distance = 0;
    ctx.font = '24px monospace';
    ctx.baseline = 'top';

    window.addEventListener('keydown',keyboardHandler);
    window.addEventListener('keyup',keyboardHandler);

    function keyboardHandler(event) {
        if(event.type == 'keydown') {
            keyPressed[event.code] = true;
        }else{
            delete keyPressed[event.code];
        } 
    }
    function main(){
        for(let key in keyPressed) {
            switch (key){
                case "ArrowLeft": cat.x -= catSpeed; break;
                case "ArrowRight": cat.x += catSpeed; break;
                case "ArrowUp": cat.y -= catSpeed; break;
                case "ArrowDown": cat.y += catSpeed; break;
            }
        }
        moveMouse();
        detectCollision();
        draw();
        requestAnimationFrame(main)
    }

    function draw() {
        ctx.clearRect(0,0,800,600);
        ctx.drawImage(theMouse,mouse.x - theMouse.width / 2,mouse.y - 36);
        ctx.drawImage(theCat,cat.x - theCat.width / 2,cat.y - theCat.height / 2);
        ctx.fillText("Score: " + score.toString(),25,25 );
        ctx.fillText("Level: " + mouseSpeed,25,50 );
    
    }

    function detectCollision(){
        distance = Math.sqrt((cat.x  - mouse.x)  ** 2 + (cat.y - mouse.y) ** 2);
        if(distance <= 120){
            score++;
            let modifier = Math.ceil(score / 10);
            if(mouseSpeed < modifier){
                mouseSpeed++;
            }
            mouse.x = Math.random() * 800;
            mouse.y = Math.random() * 600;
        }
    }

    function moveMouse() {
        if(mouse.dirX){
            mouse.x += mouseSpeed;
            if(mouse.x >= 770){
                mouse.dirX = false;
            }
        }else{
            mouse.x -= mouseSpeed;
            if(mouse.x <= 30){
                mouse.dirX = true;
            }
        } if(mouse.dirY){
            mouse.y += mouseSpeed;
            if(mouse.y >= 570){
                mouse.dirY = false;
            }
        }else{
            mouse.y -= mouseSpeed;
            if(mouse.y <= 30){
                mouse.dirY = true;
            }
        }
    }

    function onResouseLoad(){
        resourses--;
        if(resourses === 0) {
            main(); 
        }
    }
    main();
})();