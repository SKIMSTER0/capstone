//prevent scrolling
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
    let startTime = 0;
    const tetris = new Game();
    window.requestAnimationFrame(run);

    //game loop
    function run(currentTime){
        let elapsed = currentTime - startTime;

        tetris.update(elapsed);
        tetris.draw();

        window.requestAnimationFrame(run);
    }

    /**
     function run(){
        window.requestAnimationFrame(run);

        let currentTime = Date.now();
        let elapsed = currentTime - lastTime;

        if (elapsed > 1000 / FPS){
            lastTime = currentTime - (elapsed % FPS);

            tetris.update(elapsed);
            tetris.draw();
        }
    }
     */

})



