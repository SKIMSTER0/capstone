class Game {
    constructor(board){
        // === graphics config ===
        const canvas = document.getElementById('board');
        const context = canvas.getContext('2d');

        context.scale(BOARD_SCALE_X, BOARD_SCALE_Y);

        context.canvas.width = COLS * BLOCK_SIZE;
        context.canvas.height = ROWS * BLOCK_SIZE;

        context.scale(BLOCK_SIZE, BLOCK_SIZE);

        // === keyboard event listeners ===
        const INPUT_KEYS_LISTENERS = event => {
            switch (event.code){
                case INPUT_KEYS.left:
                    player.move(-1);
                    break;
                case INPUT_KEYS.right:
                    player.move(1);
                    break;
                case INPUT_KEYS.rotateCW:
                    player.rotate(90);
                    break;
                case INPUT_KEYS.rotateCCW:
                    player.rotate(-90);
                    break;
                case INPUT_KEYS.softDrop:
                    player.softDrop();
                    break;
                case INPUT_KEYS.hardDrop:
                    player.hardDrop();
                    break;
                case INPUT_KEYS.hold:
                    player.hold();
                    break;
            }
        }

        this.forecast = element.querySelectAll('.forecast');
        document.addEventListener('keydown', INPUT_KEYS_LISTENERS);

        // === game config ===
        this.board = new Board(10,20);
        let player = new Player(context);
        this.gameOver = false;

    }

    /**
     * Game update loop
     */
    update(){
        this.player.update();
    }
}
