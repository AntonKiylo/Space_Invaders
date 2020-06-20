function drawGame() {
    const main = document.getElementById("play");
    const invadersBlock = document.createElement("div");
    invadersBlock.setAttribute("id", "invadersBlock");
    main.append(invadersBlock);

    for (let i = 1; i <= 400; i++) {
        let invader = document.createElement("div");
        invadersBlock.append(invader);
    }

    let invadersList = document.querySelectorAll("#invadersBlock div");
    let currentInvaderIndex = 0;
    let currentShooterIndex = 390;
    let width = 20;
    let alienInvadersTakenDown = [];
    let direction = 1;
    let sound = document.createElement("audio");
    main.append(sound);


    let invadersArray = [
        23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
        43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
        63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76
    ];

    invadersArray.forEach(invader => invadersList[currentInvaderIndex + invader].classList.add("invader"));

    invadersList[currentShooterIndex].classList.add("shooter");

    moveShooter();

    moveInvaders();

    shoot();

    function moveShooter() {
        invadersList[currentShooterIndex].classList.remove('shooter');

        if (buttonIsPressed.left) {
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
        }

        if (buttonIsPressed.right) {
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
        }

        invadersList[currentShooterIndex].classList.add('shooter');

        requestAnimationFrame(moveShooter);
    }

    function moveInvaders() {
        const leftEdge = invadersArray[0] % width === 0
        const rightEdge = invadersArray[invadersArray.length - 1] % width === width - 1

        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width
        } else if (direction === width) {
            if (leftEdge) direction = 1
            else direction = -1
        }
        for (let i = 0; i <= invadersArray.length - 1; i++) {
            invadersList[invadersArray[i]].classList.remove('invader')
        }
        for (let i = 0; i <= invadersArray.length - 1; i++) {
            invadersArray[i] += direction
        }
        for (let i = 0; i <= invadersArray.length - 1; i++) {
            //ADD IF LATER
            if (!alienInvadersTakenDown.includes(i)) {
                invadersList[invadersArray[i]].classList.add('invader')
            }
        };

        if (invadersList[currentShooterIndex].classList.contains('invader', 'shooter')) {
            console.log("game over");
            invadersList[currentShooterIndex].classList.add('boom');
            return;
        };

        for (let i = 0; i <= invadersArray.length - 1; i++) {
            if (invadersArray[i] > (invadersList.length - (width - 1))) {
                console.log('Game Over');
                return;
            }
        }

        //ADD LATER
        if (alienInvadersTakenDown.length === invadersArray.length) {
            console.log(alienInvadersTakenDown.length);
            console.log(invadersArray.length);
            console.log('You Win');
            document.removeEventListener("keydown", setPressedTrue);
            document.removeEventListener("keyup", setPressedFalse);
            return;
        }

        setTimeout(moveInvaders, 1000);
    };

    function shoot() {
        if (buttonIsPressed.shoot) {
            sound.src = "./assets/004_13.wav";
            sound.play();

            let currentLaserIndex = currentShooterIndex;

            function moveLaser() {
                invadersList[currentLaserIndex].classList.remove("laser");
                currentLaserIndex -= width;
                invadersList[currentLaserIndex].classList.add("laser");

                if (currentLaserIndex < width) {
                    setTimeout(() => invadersList[currentLaserIndex].classList.remove('laser'), 100);
                    return;
                };


                if (invadersList[currentLaserIndex].classList.contains("invader")) {
                    invadersList[currentLaserIndex].classList.remove("laser");
                    invadersList[currentLaserIndex].classList.remove("invader");
                    invadersList[currentLaserIndex].classList.add("boom");

                    sound.src = "./assets/003_12.wav";
                    sound.play();

                    setTimeout(() => invadersList[currentLaserIndex].classList.remove('boom'), 250);

                    let alienTakenDown = invadersArray.indexOf(currentLaserIndex);
                    alienInvadersTakenDown.push(alienTakenDown);

                    return;
                };

                requestAnimationFrame(moveLaser);
            };

            moveLaser();
        };
        setTimeout(shoot, 100);
    };

    document.addEventListener('keydown', setPressedTrue);

    //вешаем событие keydown на document для определения какая клавиша отжата
    document.addEventListener('keyup', setPressedFalse);

    function setPressedTrue(e) {
        if (e.keyCode === 37) {
            buttonIsPressed.left = true;
        };

        //если нажата 'стрелка вниз'
        if (e.keyCode === 39) {
            buttonIsPressed.right = true;
        };

        if (e.keyCode === 32) {
            buttonIsPressed.shoot = true;
        };
    }

    function setPressedFalse(e) {
        if (e.keyCode === 37) {
            buttonIsPressed.left = false;
        };

        //если нажата 'стрелка вниз'
        if (e.keyCode === 39) {
            buttonIsPressed.right = false;
        };

        if (e.keyCode === 32) {
            buttonIsPressed.shoot = false;
        };
    }
}
