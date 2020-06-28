
// TODO : remove class "shooter after third alien shoot"

function drawGame() {
    let gameField = document.getElementById("gameField"),
        soundEffects = document.getElementById("soundEffects"),
        gameLivesContainer = document.getElementById("gameLivesContainer"),
        gameScore = document.getElementById("gameScore"),
        gameBlocks = null,
        liveCounter = 3,
        scoreCounter = 0,
        currentInvaderIndex = 0,
        currentShooterIndex = 390,
        width = 20,
        shootedInvaders = [],
        direction = 1,
        invadersSpeed = 1000,
        gameState = true,
        invadersIndexes = [
            23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
            43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
            63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76
        ];

    for (let i = 1; i <= 400; i++) {
        let gameBlocks = document.createElement("div");
        gameField.append(gameBlocks);
    };

    gameLivesContainer.innerHTML = liveCounter;
    gameScore.innerHTML = (scoreCounter + 10000000000).toString().slice(-10);
    gameBlocks = document.querySelectorAll("#gameField div");
    invadersIndexes.forEach(invader => gameBlocks[currentInvaderIndex + invader].classList.add("invader"));
    gameBlocks[currentShooterIndex].classList.add("shooter");

    /*****************************************************************/

    moveInvaders();
    invadersAttack();
    moveShooter();
    shooterAttack();
    drawFlyingStars();
    document.addEventListener('keydown', setPressedTrue);
    document.addEventListener('keyup', setPressedFalse);
    
    /*****************************************************************/

    function moveInvaders() {
        let leftEdge = invadersIndexes[0] % width === 0;
        let rightEdge = invadersIndexes[invadersIndexes.length - 1] % width === width - 1;

        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width;
        } else if (direction === width) {
            leftEdge ? direction = 1 : direction = -1;
        };

        for (let i = 0; i < invadersIndexes.length; i++) {
            gameBlocks[invadersIndexes[i]].classList.remove("invader");
        };

        for (let i = 0; i < invadersIndexes.length; i++) {
            invadersIndexes[i] += direction;
        };

        for (let i = 0; i < invadersIndexes.length; i++) {
            if (!shootedInvaders.includes(i)) {
                gameBlocks[invadersIndexes[i]].classList.add("invader");
            };
        };

        if (gameBlocks[currentShooterIndex].classList.contains("invader", "shooter")) {
            liveCounter = 0;
            gameLivesContainer.innerHTML = liveCounter;
            soundEffects.src = "./assets/explosion.wav";
            soundEffects.play();
            gameBlocks[currentShooterIndex].classList.add("explosion");
            endGame();
            return;
        };

        for (let i = 0; i < invadersIndexes.length; i++) {
            if (invadersIndexes[i] > (gameBlocks.length - (width - 1))) {
                liveCounter = 0;
                gameLivesContainer.innerHTML = liveCounter;
                endGame();
                return;
            };
        };

        if (shootedInvaders.length === invadersIndexes.length) {
            shootedInvaders = [];
            invadersIndexes = [
                23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
                63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76
            ];
            direction = 1;
            invadersIndexes.forEach(invader => gameBlocks[currentInvaderIndex + invader].classList.add("invader"));
            invadersSpeed -= 100;
        };

        if (gameState) {
            setTimeout(moveInvaders, invadersSpeed);
        } else {
            return;
        };
    };

    function invadersAttack() {
        let invaderLaserIndex = invadersIndexes[Math.floor(Math.random() * invadersIndexes.length)];

        if (gameBlocks[invaderLaserIndex].classList.contains("invader")) {
            invaderShoot();
        };

        function invaderShoot() {
            gameBlocks[invaderLaserIndex].classList.remove("invaderLaser");
            invaderLaserIndex += width;
            gameBlocks[invaderLaserIndex].classList.add("invaderLaser");
            
            if (gameBlocks[currentShooterIndex].classList.contains("invaderLaser")) {
                soundEffects.src = "./assets/explosion.wav";
                soundEffects.play();
                gameBlocks[currentShooterIndex].classList.remove("shooter");
                gameBlocks[currentShooterIndex].classList.add("explosion");
                setTimeout(() => gameBlocks[currentShooterIndex].classList.remove("explosion"), 250);
                liveCounter--;
                gameLivesContainer.innerHTML = liveCounter;
                
                if (liveCounter === 0) {
                    endGame();
                };
            };

            if (invaderLaserIndex >= 380) {
                setTimeout(() => gameBlocks[invaderLaserIndex].classList.remove("invaderLaser"), 100);
                return;
            };

            setTimeout(invaderShoot, 40);
        };
        
        if (gameState) {
            setTimeout(invadersAttack, Math.floor(Math.random() * 1800) + 700);
        } else {
            return;
        };
    };

    function moveShooter() {
        gameBlocks[currentShooterIndex].classList.remove("shooter");

        if (buttonIsPressed.left) {
            if (currentShooterIndex % width !== 0) {
                currentShooterIndex -= 1;
            };
        };

        if (buttonIsPressed.right) {
            if (currentShooterIndex % width < width - 1) {
                currentShooterIndex += 1;
            };
        };

        gameBlocks[currentShooterIndex].classList.add("shooter");

        requestAnimationFrame(moveShooter);
    };

    function shooterAttack() {
        if (buttonIsPressed.shoot) {
            soundEffects.src = "./assets/shoot.wav";
            soundEffects.play();

            let currentLaserIndex = currentShooterIndex;

            function moveLaser() {
                gameBlocks[currentLaserIndex].classList.remove("laser");
                currentLaserIndex -= width;
                gameBlocks[currentLaserIndex].classList.add("laser");

                if (currentLaserIndex < width) {
                    gameBlocks[currentLaserIndex].classList.remove('laser');
                    return;
                };

                if (gameBlocks[currentLaserIndex].classList.contains("invader")) {
                    soundEffects.src = "./assets/explosion.wav";
                    soundEffects.play();
                    gameBlocks[currentLaserIndex].classList.remove("laser");
                    gameBlocks[currentLaserIndex].classList.remove("invader");
                    gameBlocks[currentLaserIndex].classList.add("explosion");
                    setTimeout(() => gameBlocks[currentLaserIndex].classList.remove('explosion'), 250);

                    scoreCounter += 100;
                    gameScore.innerHTML = (scoreCounter + 10000000000).toString().slice(-10);

                    shootedInvaders.push(invadersIndexes.indexOf(currentLaserIndex));

                    return;
                };

                requestAnimationFrame(moveLaser);
                
            };

            moveLaser();
            
        };

        setTimeout(shooterAttack, 100);
        
    };

    function endGame() {
        gameState = false;
        document.removeEventListener("keydown", setPressedTrue);
        document.removeEventListener("keyup", setPressedFalse);
        
        let userScore = localStorage.getItem('userScore');
        
        if (!userScore) {
            localStorage.setItem('userScore', JSON.stringify({
                score: gameScore.innerHTML,
            }));
        }
        
        if (userScore) {
            let user = JSON.parse(userScore);

            if (user.score < gameScore.innerHTML) {
                localStorage.setItem('userScore', JSON.stringify({
                    score: gameScore.innerHTML,
                }));
            }
        }

        setTimeout(() => {
            window.location.hash = "#end";
        }, 2000);
    };
    
    function drawFlyingStars() {
        canvasVariables.canvas = document.getElementById("canvas");
        canvasVariables.ctx = canvasVariables.canvas.getContext("2d");
        canvasVariables.bufferCanvas = document.createElement("canvas");
        canvasVariables.bufferCtx = canvasVariables.bufferCanvas.getContext("2d");
        canvasVariables.bufferCtx.canvas.width = canvasVariables.ctx.canvas.width;
        canvasVariables.bufferCtx.canvas.height = canvasVariables.ctx.canvas.height;

        function Stars() {
            this.shiftX = Math.round(Math.random() * canvasVariables.bufferCanvas.width);
            this.shiftY = -10;
            this.drift = Math.random() * 1.5;
            this.speed = Math.round(Math.random() * 5) + 1;
            this.width = (Math.random() * 3) + 2;
            this.height = this.width;
        };

        function animateStars() {
            flyingStarsUpdate();
            drawStars();
            requestAnimationFrame(animateStars);
        };

        function clearCanvasField() {
            canvasVariables.bufferCtx.fillStyle = canvasVariables.skyColor;
            canvasVariables.bufferCtx.fillRect(0, 0, canvasVariables.bufferCanvas.width, canvasVariables.bufferCanvas.height);
        };

        function createStars() {
            canvasVariables.starsArray.push(new Stars);
            
            if (canvasVariables.starsArray.length === canvasVariables.starsQuantity) {
                clearInterval(canvasVariables.starsTimer);
            };
        };

        function flyingStarsUpdate() {
            let canvasHeight = canvasVariables.canvas.height;

            for (let i = 0; i < canvasVariables.starsArray.length; i++) {
                if (canvasVariables.starsArray[i].shiftY < canvasHeight) {
                    canvasVariables.starsArray[i].shiftY += canvasVariables.starsArray[i].speed;

                    if (canvasVariables.starsArray[i].shiftY > canvasHeight) {
                        canvasVariables.starsArray[i].shiftY = -10;
                    };
                };
            };
        };

        function drawStars() {
            clearCanvasField();

            for (let i = 0; i < canvasVariables.starsArray.length; i++) {
                canvasVariables.bufferCtx.fillStyle = "#fff";
                canvasVariables.bufferCtx.fillRect(canvasVariables.starsArray[i].shiftX, canvasVariables.starsArray[i].shiftY, canvasVariables.starsArray[i].width, canvasVariables.starsArray[i].height);
            };

            canvasVariables.ctx.drawImage(canvasVariables.bufferCanvas, 0, 0, canvasVariables.canvas.width, canvasVariables.canvas.height);
        };

        canvasVariables.starsTimer = setInterval(createStars, 100);

        requestAnimationFrame(animateStars);
    };

    function setPressedTrue(e) {
        if (e.keyCode === 37) {
            buttonIsPressed.left = true;
        };

        if (e.keyCode === 39) {
            buttonIsPressed.right = true;
        };

        if (e.keyCode === 32) {
            buttonIsPressed.shoot = true;
        };
    };

    function setPressedFalse(e) {
        if (e.keyCode === 37) {
            buttonIsPressed.left = false;
        };

        if (e.keyCode === 39) {
            buttonIsPressed.right = false;
        };

        if (e.keyCode === 32) {
            buttonIsPressed.shoot = false;
        };
    };
};


function getScore() {
    let bestScore = document.getElementById("bestScore");
    let userScore = localStorage.getItem('userScore');

    if (userScore) {
        let user = JSON.parse(userScore);
        bestScore.innerHTML = user.score;
    };
};


function toggleBackgroundSound() {
    let toggleSoundButton = document.getElementById("music"),
        backgroundSound = document.getElementById("backgroundSound");
    toggleSoundButton.addEventListener("click", function(){
        if (toggleSoundButton.innerHTML === "UNMUTE"){
            toggleSoundButton.innerHTML = "MUTE";
            backgroundSound.play();
        } else {
            toggleSoundButton.innerHTML = "UNMUTE";
            backgroundSound.pause();
        };
    });
};