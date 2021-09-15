class Board {
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.board = Array(rows).fill(0).map(x => Array(cols).fill(0));
    }

    //clears board
    clear(){
        this.board = Array(this.rows).fill(0).map(x => Array(this.cols).fill(0));
    }

    lineClear() {
        let rowsCleared = [];

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
            }
        }

        return rowsCleared;
    }

    //checks if board is PC
    checkPC(){
        //if any non-empty square found above 4th row, not a perfect clear
        for (let row = this.rows - 5; row < this.rows; row++){
            for (let col = 0; col < this.cols; col++){
                if (this.board[row][col] != 0) {
                    return false;
                }
            }
        }
        return true;
    }

    //checks if position piece coordinates collides with board state
    collide(position, pieceData, pieceOrigin){
        console.log("COLLISION CHECK");
        console.log(position);
        for (let pieceDataY = 0; pieceDataY < pieceData.length; pieceDataY++){
            let newPositionY = pieceDataY + position.y - pieceOrigin.y;
            let boardRow = this.board[newPositionY];

            for (let pieceDataX = 0; pieceDataX < pieceData[0].length; pieceDataX++){
                let pieceBlock = pieceData[pieceDataY][pieceDataX];
                let newPositionX = pieceDataX + position.x - pieceOrigin.x;

                if (pieceBlock === 0) continue;

                //check bounds and collision
                if (newPositionX > this.cols || newPositionX < 0 ||
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