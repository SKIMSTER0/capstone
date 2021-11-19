class Game {
    constructor(){
        // === graphics config ===
        this.canvas = document.getElementById('board');
        this.context = this.canvas.getContext('2d');
        this.forecastList = document.getElementsByClassName('forecast');

        //initialize game board canvas
        this.context.canvas.width = COLS * BLOCK_SIZE;
        this.context.canvas.height = ROWS * BLOCK_SIZE;
        this.context.fillStyle = '#000000';
        this.context.strokeStyle = '#000000';
        this.context.fillRect(0,0, this.context.canvas.width, this.context.canvas.height);

        //initialize start text
        this.context.font = "20px Courier New";
        this.context.textAlign = "center";
        this.context.fillStyle = 'white';
        this.context.fillText("Click to Start", this.context.canvas.width/2, this.context.canvas.height/2)

        //initialize game info
        this.gameInfo = document.getElementById('gameInfo');
        this.gameTime = document.getElementById('gameTime');
        this.gameScore = document.getElementById('gameScore');
        this.gamePcoCount = document.getElementById('gamePcoCount');

        //initialize forecast
        for (let i = 0; i < this.forecastList.length; i++){
            this.forecastContext = this.forecastList[i].getContext('2d');
            this.forecastContext.canvas.width = 5 * BLOCK_SIZE_FORECAST;
            this.forecastContext.canvas.height = 5 * BLOCK_SIZE_FORECAST;
        }

        // === game config ===
        this.gameOver = false;
        this.gameStart = false;
    }

    // === GAME LOGIC (NEW GAME) ===
    run(){
        this.gameOver = false;
        this.gameStart = true;

        this.board = new Board(ROWS,COLS);
        this.player = new Player(this.board);

        this.guidePCO = false;
        this.startTime = new Date().getTime();
        this.elapsedTime = 0;

        //TIMER THREADS
        //gravity speed
        this.gravity = {
            interval: null,
            start: function(game){
                this.interval = setInterval(function(){
                    game.player.softDrop(true);
                    game.update();
                }, GRAVITY_TIME)
            },
            stop: function(){
                clearInterval(this.interval);
            }
        }

        //updates timer every second
        this.timer = {
            interval: null,
            start: function(game){
                this.interval = setInterval(function(){
                    game.elapsedTime += 100;
                    game.updateGameinfo();
                }, 100)
            },
            tick: function(){
            },
            stop: function(){
                clearInterval(this.interval);
            }
        }

        //start time and gravity timers
        this.timer.start(this);
        this.gravity.start(this);

        // === keyboard event listeners ===
        const INPUT_KEYS_LISTENERS = event => {
            switch (event.code){
                case KEY_SETTINGS.left:
                    this.player.move(-1, 0);
                    break;
                case KEY_SETTINGS.right:
                    this.player.move(1, 0);
                    break;
                case KEY_SETTINGS.rotateCW:
                    this.player.rotate(ROTATION_DIRECTION.CW);
                    break;
                case KEY_SETTINGS.rotateCCW:
                    this.player.rotate(ROTATION_DIRECTION.CCW);
                    break;
                case KEY_SETTINGS.softDrop:
                    this.player.softDrop();
                    break;
                case KEY_SETTINGS.hardDrop:
                    this.player.hardDrop();
                    break;
            }
            this.update();
        }
        document.addEventListener('keydown', INPUT_KEYS_LISTENERS);

        this.update();
    }

    /**
     * primary game loop, always update until game over
     */
    update(){
        if (!this.gameOver) {
            this.updateGameinfo()

            this.draw();

            if (this.player.gameOver) {
                this.timer.stop();
                this.gravity.stop();

                this.submitLeaderboard();
                this.gameOver = true;
                this.drawGameOver();
            }
        }
    }

    /**
     * Update game info box, containing score, pco count and timer
     */
    updateGameinfo(){
        this.gameTime.innerHTML = "Time : " + this.elapsedTime / 1000;
        this.gamePcoCount.innerHTML = "#PCO : " + this.player.pcoCount;
        this.gameScore.innerHTML = "Score : " + this.player.score;
    }

    //draw game over screen
    drawGameOver(){
        this.context.strokeStyle = 'white';
        this.context.fillText("Game Over!", this.context.canvas.width/2, this.context.canvas.height/2);
    }

    //draw board and forecast boxes
    draw(){
        for (let col = 0; col < this.player.board.length; col++){
            for (let row = 0; row < this.player.board[0].length; row++){
                this.context.fillStyle = PIECE_COLORS[this.player.board[col][row]];
                this.context.fillRect(row * BLOCK_SIZE, col * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

                if (this.guidePCO) {
                    this.context.strokeStyle = PIECE_COLORS[this.player.game.boardPCO[col][row]];
                    this.context.strokeRect(row * BLOCK_SIZE, col * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            }
        }

        //draw forecast boards
        for (let i = 0; i < this.forecastList.length; i++){
            let forecastData = PIECES_STRIPPED_DATA[this.player.forecast.charAt(i)];
            this.forecastContext = this.forecastList[i].getContext('2d');

            //reset previous forecast
            this.forecastContext.fillStyle = 'white';
            this.forecastContext.fillRect(0,0,this.forecastList[i].width, this.forecastList[i].height);

            let forecastValue = PIECE_VALUE[this.player.forecast.charAt(i)];
            let forecastColor = PIECE_COLORS[forecastValue];
            this.forecastContext.fillStyle = forecastColor;
            for (let col = 0; col < forecastData.length; col++){
                for (let row = 0; row < forecastData[0].length; row++){
                    if (forecastData[col][row] != 0) {
                        this.forecastContext.fillRect(row * BLOCK_SIZE_FORECAST, col * BLOCK_SIZE_FORECAST, BLOCK_SIZE_FORECAST, BLOCK_SIZE_FORECAST);
                    }
                }
            }
        }
    }

    //submit score to leaderboard
    submitLeaderboard(){
        let gameData = JSON.stringify({
            gameTime: new Date(this.elapsedTime).toISOString().substr(11, 10),
            score: this.player.score,
            pcoCount: this.player.pcoCount,
        });

        let xhr = new XMLHttpRequest();
        xhr.open("POST", '/capstone/home/submitLeaderboard/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(gameData);
    }

    //toggles guide lines onto board
    toggleGuide(){
        if (typeof this.player !== 'undefined'){
            this.guidePCO = !this.guidePCO;
            this.update();
        }
    }
}
