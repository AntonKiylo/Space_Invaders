"use strict";

window.addEventListener("load", checkHash);
window.addEventListener("hashchange", updateWindowView);

function checkHash() {
    if (window.location.hash.slice(1)) {
        updateWindowView();
    } else {
        window.location.hash = "#menu";
    };
};

function updateWindowView() {
    document.getElementById("root").innerHTML = router[window.location.hash.slice(1)].render();
    
    if (window.location.hash.slice(1) === "play") {   
        drawGame();
        return;
    } else if (window.location.hash.slice(1) === "score") {
        getScore();
    } else if (window.location.hash.slice(1) === "menu") {
        toggleBackgroundSound();
    };
};