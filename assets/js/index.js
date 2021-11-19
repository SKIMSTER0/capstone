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
    var tetris = new Game();
    const board = document.getElementById('board');
    const helperPCO = document.getElementById('guideButton');

    //only start new tetris game when board is clicked
    board.addEventListener('click', function(){
        if (tetris.gameOver){
            tetris = new Game();
        }
        else if(!tetris.gameStart) {
            tetris.run();
        }
    });

    helperPCO.addEventListener('click', function(){
        tetris.toggleGuide();
    });
});