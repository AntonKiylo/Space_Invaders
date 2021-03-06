"use strict";

const MainMenu = {
    render: () => {
        return `
        <div id="mainMenu">
            <img src="./assets/spaceInvaders.png" alt="game_logo">
            <div class="buttonBlock">
                <div id="play" class="button"><a href="#play">PLAY</a></div>
                <div id="music" class="button">${buttonIsPressed.soundButtonState}</div>
                <div id="score" class="button"><a href="#score">SCORE</a></div>
                <div id="help" class="button"><a href="#help">HELP</a></div>
            </div>
        </div>`;
    }
};

const Play = {
    render: () => {
        return `
        <div id="play">
            <canvas id="canvas" width="800px" height="800px"></canvas>
            <div id="gameWrapper">
                <div id="resultInformation">
                    <div id="gameScore"></div>
                    <div id="gameLives">
                        <img src="./assets/heart.png">
                        <div id="gameLivesContainer"></div>
                    </div>
                </div>
                <div id="gameField"></div>
            </div>
        </div>`;
    }
}

const UserScore = {
    render: () => {
        return `
        <div id="userScore" >
            <p id="bestScore">0000000000</p>
            <div class="buttonBlock">
                <div id="play" class="button"><a href="#play">PLAY</a></div>
                <div id="gameMenu" class="button"><a href="#menu">MENU</a></div>
            </div>
        </div >`;
    }
};

const GameHelp = {
    render: () => {
        return `
        <div id="gameHelp">
            <div>
                <p>The aim of the game is to destroy all the invaders floating (or hurtling) around the screen, whilst dodging the attacks of flying saucers, which you can also destroy for even more points.</p>
                <p>CONTROLS</p>
                <p><span>LEFT ARROW</span> 	-	move left</p>
                <p><span>RIGHT ARROW</span>	-	move right</p>
                <p><span>SPACE</span>	-	fire (hold to shoot <pre>               continuously)</pre></p>
            </div>
            <div class="buttonBlock">
                <div id="play" class="button"><a href="#play">PLAY</a></div>
                <div id="gameMenu" class="button"><a href="#menu">MENU</a></div>
            </div>
        </div >`;
    }
};

const EndGame = {
    render: () => {
        return `
        <div id="gameEnd">
            <p>PLAY AGAIN?</p>
            <div class="buttonBlock">
                <div id="play" class="button"><a href="#play">PLAY</a></div>
                <div id="gameMenu" class="button"><a href="#menu">MENU</a></div>
            </div>
        </div>`;
    }
};

const router = {
    play: Play,
    menu: MainMenu,
    score: UserScore,
    help: GameHelp,
    end: EndGame,
};

const buttonIsPressed = {
    left: false,
    right: false,
    shoot: false,
    soundButtonState: "UNMUTE",
};

const canvasVariables = {
    canvas: null,
    ctx: null,
    bufferCanvas: null,
    bufferCtx: null,
    starsArray: [],
    starsTimer: null,
    starsQuantity: 100,
    skyColor: '#000',
};