class Game {
    currentTime;

    constructor(){
        // === graphics config ===
        this.canvas = document.getElementById('board');
        this.context = this.canvas.getContext('2d');
        this.forecast = document.querySelectorAll('.forecast');

        this.context.canvas.width = COLS * BLOCK_SIZE;
        this.context.canvas.height = ROWS * BLOCK_SIZE;

        this.context.fillStyle = '#000000';
        this.context.fillRect(0,0, this.context.canvas.width, this.context.canvas.height);

        //set up hold/forecast graphics
        this.holdBox = document.getElementById('holdBox');
        //this.forecastList = Array(this.forecast.length).fill()

        // === game config ===
        this.game = new Board(ROWS,COLS);
        this.player = new Player(this.game);
        this.gameOver = false;

        this.currentTime = 0;
        setInterval(this.player.updateGravity, GRAVITY_TIME);

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
                case KEY_SETTINGS.hold:
                    this.player.hold();
                    break;
            }
        }
        document.addEventListener('keydown', INPUT_KEYS_LISTENERS);
    }

    // === GAME LOGIC ===
    update(elapsed){
        //gravity for soft drop speed

        //update piece, position, score, etc
        //this.player.update();
    }

    //draw board
    draw(){
        for (let col = 0; col < this.player.board.length; col++){
            for (let row = 0; row < this.player.board[0].length; row++){
                this.context.fillStyle = PIECE_COLORS[this.player.board[col][row]];
                this.context.fillRect(row * BLOCK_SIZE, col * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }

    gameOver(){
        //submit score to leaderboard
    }
}
