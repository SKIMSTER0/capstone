/**
 * tetris board controlling logic for setting openers, alongside handling normal game logic
 */
class Board {
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.board = Array(rows).fill(0).map(x => Array(cols).fill(0));
        this.boardPCO = Array(rows).fill(0).map(x => Array(cols).fill(0));
    }

    /**
     * clear board with empty blocks
     */
    clear(){
        this.board = Array(this.rows).fill(0).map(x => Array(this.cols).fill(0));
    }

    /**
     * sets the current correct PCO configuration
     * @param pieces {string} raw opener data
     * @param opener {string} 4 pieces letters outlining the opener
     */
    setOpener(pieces, opener){
        //default opener start
        if (opener === null){
            opener = 'XXX_____XXXXX____XXXXXX___XXXXXXX____XXX';
        }

        //draw opener onto pco board
        for(let boardY = 16; boardY < this.board.length; boardY++){
            for(let boardX = 0; boardX < this.board[0].length; boardX++){
                this.boardPCO[boardY][boardX] = PIECE_VALUE[opener.charAt(0)];
                opener = opener.substring(1, opener.length);
            }
        }
    }

    /**
     * draw opener onto pco board
     */
    drawOpener(){
        for(let boardY = 16; boardY < this.board.length; boardY++){
            for(let boardX = 0; boardX < this.board[0].length; boardX++){
                this.board[boardY][boardX] = this.boardPCO[boardY][boardX];
            }
        }
    }

    /**
     * check if any row is able to be cleared (all blocks inhabited by a piece block)
     * if so, clear the line
     * @returns {number} number of lines cleared from the previous piece
     */
    lineClearCheck() {
        let lineClears = 0;

        for (let boardY = 0; boardY < this.board.length; boardY++){
            let lineClear = true;

            for (let boardX = 0; boardX < this.board[0].length; boardX++){
                if (this.board[boardY][boardX] === 0) {
                    lineClear = false;
                }
            }

            if (lineClear) {
                this.board.splice(boardY, 1);
                this.board.unshift([0,0,0,0,0,0,0,0,0,0]);

                this.boardPCO.splice(boardY, 1);
                this.boardPCO.unshift([0,0,0,0,0,0,0,0,0,0]);
                lineClears++;
            }
        }

        return lineClears;
    }

    /**
     * check if current board configuration is PC-able
     * if any non-empty square found above 4th row, perfect clear is now impossible
     * @returns {boolean} whether PC is impossible in the current board state
     */
    checkPCFail(){
        for (let col = 0; col < this.cols; col++){
            for (let row = 0; row < this.rows - 4; row++){
                if (this.board[row][col] != 0) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * checks if board is empty (successful pc)
     * @returns {boolean} whether PC prerequisites are fulfilled
     */
    checkPC(){
        for (let col = 0; col < this.cols; col++){
            for (let row = 0; row < this.rows; row++){
                if (this.board[row][col] != 0) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * checks if current piece position coordinates collides with board state
     * @param position {X,Y}
     * @param pieceData {array}
     * @returns {boolean} whether piece collided with board on movement
     */
    collide(position, pieceData){
        console.log("COLLISION CHECK");
        console.log(position);

        //loop through piece data and see if collides with environment
        for (let pieceDataY = 0; pieceDataY < pieceData.length; pieceDataY++){
            let newPositionY = pieceDataY + position.y;
            let boardRow = this.board[newPositionY];

            for (let pieceDataX = 0; pieceDataX < pieceData[0].length; pieceDataX++){
                let pieceBlock = pieceData[pieceDataY][pieceDataX];
                let newPositionX = pieceDataX + position.x;

                if (pieceBlock === 0) continue;

                //check bounds and collision
                if (newPositionX >= this.cols || newPositionX < 0 ||
                    newPositionY >= this.rows || newPositionY < 0){
                    console.log("OUT OF BOUNDS");
                    return true;
                }
                let boardBlock = boardRow[newPositionX];

                if (pieceBlock !== 0 && boardBlock !== 0) {
                    console.log("COLLISION");
                    return true;
                }
            }
        }
        return false;
    }
}