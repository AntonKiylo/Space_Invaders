const ui = { // элементы верстки, учавствующие в процессе
    main: document.getElementById("main"),
};

const MainMenu = {
    render: () => {
        return `
        <div id="mainMenu">
            <div>SPACE INVADERS</div>
            <img src="./assets/rocket.png" alt="game_logo">
            <div class="buttonBlock">
                <div id="play" class="menuButton"><a href="#play">PLAY</a></div>
                <div id="music" class="menuButton">MUSIC</div>
                <div id="score" class="menuButton"><a href="#score">SCORE</a></div>
                <div id="help" class="menuButton"><a href="#help">HELP</a></div>
            </div>
        </div>`;
    }
};

const Play = {
    render: () => {
        return `
        <div id="play"></div>`;
    }
}

const UserScore = {
    render: () => {
        return `
        <div id="userScore" >
            <div>
                <h3>Your result is:</h3>
                <p>000003</p>
            </div>
            <div class="buttonBlock">
                <div id="play" class="menuButton"><a href="#play">PLAY</a></div>
                <div id="gameMenu" class="menuButton"><a href="#menu">MENU</a></div>
            </div>
        </div >`;
    }
};

const GameHelp = {
    render: () => {
        return `
        <div id="gameHelp" >
            <div>
                <p>The aim of the game is to destroy all the asteroids floating (or hurtling) around the screen, whilst dodging the attacks of flying saucers, which you can also destroy for even more points.</p>
                <h3>Controls</h3>
                <p><span>Left arrow</span> 	-	Move left (double-tap to boost; not available in classic mode)</p>
                <p><span>Right arrow</span>	-	Move right (double-tap to boost; not available in classic mode)</p>
                <p><span>Space</span>	-	Fire (hold to shoot continuously)</p>
                <p><span>P</span>	-	Pause game</p>
            </div>
            <div class="buttonBlock">
                <div id="play" class="menuButton"><a href="#play">PLAY</a></div>
                <div id="gameMenu" class="menuButton"><a href="#menu">MENU</a></div>
            </div>
        </div >`;
    }
};

const router = {
    play: Play,
    menu: MainMenu,
    score: UserScore,
    help: GameHelp,
};

/****************** for canvas ********************/
const GameField = {
    width: 800,
    backgroundColor: "#000",
}

const SpaceShip = {
    posX: 400,
    posY: 700,
    speedX: 6,
    size: 16,
};

let buttonIsPressed = {
    left: false,
    right: false,
    shoot: false,
};

