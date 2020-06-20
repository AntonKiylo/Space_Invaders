window.addEventListener("load", checkHash);
window.addEventListener("hashchange", updateWindowView);


function updateWindowView() {
    if (window.location.hash.slice(1) === "play") {
        ui.main.innerHTML = router[window.location.hash.slice(1)].render();
        drawGame();
    } else {
        ui.main.innerHTML = router[window.location.hash.slice(1)].render();
    }
}

function checkHash() {
    if (window.location.hash.slice(1)) {
        updateWindowView();
    } else {
        window.location.hash = "#menu";
    }
};








