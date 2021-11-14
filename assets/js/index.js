//prevent scrolling via arrow keys
window.addEventListener("keydown", function(e){
    if(
        [
            "Space",
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ].indexOf(e.code) > -1){
        e.preventDefault();
    }
});

window.addEventListener('load', function(){
    let tetris = new Game();
    const board = document.getElementById('board');
    const helperPCO = document.getElementById('guideButton');

    board.addEventListener('click', function(){
        if (!tetris.gameStart) {
            tetris.run();
        }
        else if (tetris.gameOver){
            tetris = new Game();
        }
    });

    helperPCO.addEventListener('click', function(){
        tetris.toggleGuide();
    });
});