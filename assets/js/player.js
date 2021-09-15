class Player {
    constructor(game) {
        this.game = game;
        this.board = game.board;
        this.position = {
            x: null,
            y: null,
        }
        //piece rotation origin
        this.pieceOrigin = {
            x: null,
            y: null,
        }
        this.piece = null;
        this.pieceData = null;
        this.direction = 0;
        this.holdable = true;
        this.heldPiece = null;
        this.rotation = 0;
        this.setRotation = (rotation) => {
            this.rotation += rotation;
            if (this.rotation >= 360) this.rotation %= 360;
        }

        this.offset = function(piece, direction) {
            if (piece === 'O' || piece === 'I'){
                return OFFSET[piece][direction];
            } else {
                return OFFSET.default[direction];
            }
        }
        //add seed generation

        //initialize bag/forecast/upcoming pieces
        this.forecast = "";
        this.generateBag();
        this.nextPiece();

        this.score = 0;
    }

    setScore(score) {
        this.score = score;
    }

    // === INPUT OPTIONS ===
    move(x, y) {
        let direction = {
            x: x,
            y: y
        }
        let moveCheck = {
            x: this.position.x + x,
            y: this.position.y + y
        }

        //if collision, do not move piece
        this.refreshPlayer();
        if (this.game.collide(moveCheck, this.pieceData, this.pieceOrigin)) {
            this.drawPiece();
            return false;
        }

        //set new position
        this.position.x += direction.x;
        this.position.y += direction.y;
        this.drawPiece();

        console.log("POSITION");
        console.log(this.position);
        return true;
    }

    rotate(rotation) {
        this.refreshPlayer();
        this.checkOffset(rotation);
        this.drawPiece();
        console.log(this.rotation);
    }

    rotatePiece(rotation){
        this.setRotation(rotation)

        //flip matrix on diagonal axis
        for (let col = 0; col < this.pieceData.length; col++) {
            for (let row = 0; row < col; row++) {
                [this.pieceData[row][col], this.pieceData[col][row]] = [this.pieceData[col][row], this.pieceData[row][col]];
            }
        }

        switch (rotation) {
            case ROTATION_DIRECTION.CW :
                this.pieceData.forEach(row => row.reverse());
                break;
            case ROTATION_DIRECTION.CCW :
                this.pieceData.reverse();
                break;
            case ROTATION_DIRECTION.FLIP:
                break;
        }
    }

    checkOffset(rotation){
        let oldPosition = {
            x : this.position.x,
            y : this.position.y
        }
        let currentOffsetData = this.offset(this.piece, this.rotation);
        let newOffsetData = this.offset(this.piece, rotation);

        this.rotatePiece(rotation);

        console.log("TEST");
        console.log(currentOffsetData);
        for (let i = 0; i < currentOffsetData.length; i++){
            const currentOffset = currentOffsetData[i];
            const newOffset = newOffsetData[i];
            const translation = {
                x : currentOffset.x - newOffset.x,
                y : currentOffset.y - newOffset.y,
            }
            const newPosition = {
                x : this.position.x + translation.x,
                y : this.position.y + translation.y
            }

            if (this.game.collide(newPosition, this.pieceData, this.pieceOrigin)){
                continue
            } else {
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
                console.log("OFFSET SUCCESSFUL");
                return;
            }
        }

        console.log("OFFSET FAILED");
        this.position = oldPosition;
        this.rotatePiece(360 - rotation);

    }

    softDrop(gravity) {
        this.move(0, 1);

        if (!gravity) {
            this.score += SCORING.SOFT_DROP;
        }
    }

    hardDrop() {
        let playerDropped = {
            x: this.position.x,
            y: this.position.y + 1
        }

        while (this.move(0,1)) {
            this.score += SCORING.HARD_DROP;
        }
        this.nextPiece();
    }

    hold() {
        //if player able to hold
        if (this.holdable) {
            //player will not be able to hold next turn/piece
            this.holdable = false;

            //if piece in hold spot, swap and reset
            if (this.heldPiece != null) {
                [this.piece, this.heldPiece] = [this.heldPiece, this.piece];
            }
        }
    }

    // === PIECE OPTIONS ===
    generatePiece(piece) {
        switch (piece) {
            case piece.I:
                this.pieceData = PIECES_DATA.I;
                break;
            case piece.J:
                this.pieceData = PIECES_DATA.J;
                break;
            case piece.L:
                this.pieceData = PIECES_DATA.L;
                break;
            case piece.O:
                this.pieceData = PIECES_DATA.O;
                break;
            case piece.S:
                this.pieceData = PIECES_DATA.S;
                break;
            case piece.T:
                this.pieceData = PIECES_DATA.T;
                break;
            case piece.Z:
                this.pieceData = PIECES_DATA.Z;
                break;
            default:
                break;
        }

        this.offset = function () {
            switch (this.piece) {
                case 'O':
                    return OFFSET.O
                case 'I':
                    return OFFSET.I
                default:
                    return OFFSET.default
            }
        }
    }

    generateBag() {
        const randomizedBag = this.shuffle(PIECES).join('');
        this.forecast = this.forecast.concat(randomizedBag);
    }

    shuffle(forecast) {
        let index = forecast.length, temp, rand;

        //swap around random elements in array while elements to shuffle
        while (index !== 0) {
            rand = Math.random() * index | 0;
            index -= 1;

            temp = forecast[index];
            forecast[index] = forecast[rand];
            forecast[rand] = temp;
        }

        return forecast;
    }

    nextPiece() {
        //pop the front part of the forecast
        this.piece = this.forecast.charAt(0);
        this.forecast = this.forecast.substring(1, this.forecast.length);
        console.log(this.forecast);
        this.pieceData = PIECES_DATA[this.piece];

        this.pieceOrigin.x = Math.floor(this.pieceData.length / 2)
        this.pieceOrigin.y = Math.floor(this.pieceData[0].length / 2)
        this.position = {
            x: Math.ceil(this.game.cols / 2) - this.pieceOrigin.x,
            y: this.pieceOrigin.y
        }

        //check any line clears
        let lineClears = this.game.lineClear();
        this.score += lineClears * SCORING.LINE_CLEAR;

        //refresh pieces in forecast list if array gets small enough
        if (this.forecast.length < 7) {
            this.generateBag();
        }

        //player will be able to hold next turn
        this.holdable = true;

        //place piece on board, if false then spawn piece overlap board and then game over
        this.spawnPiece();
    }


    spawnPiece() {
        //check if spawn position colliding with board
        if (this.game.collide(this.position, this.pieceData, this.pieceOrigin)){
            //this.gameOver
        } else {
            this.drawPiece();
        }
    }

    updateGravity() {
        //this.softDrop(true);
    }

    //refresh old position
    refreshPlayer() {
        for (let pieceDataY = 0; pieceDataY < this.pieceData.length; pieceDataY++) {
            for (let pieceDataX = 0; pieceDataX < this.pieceData[0].length; pieceDataX++) {
                //refresh current position
                if (this.pieceData[pieceDataY][pieceDataX] === 0) continue;
                this.board[pieceDataY + this.position.y - this.pieceOrigin.y][pieceDataX + this.position.x - this.pieceOrigin.x] = 0;
            }
        }
    }

    drawPiece(){
        for (let pieceDataY = 0; pieceDataY < this.pieceData.length; pieceDataY++) {
            for (let pieceDataX = 0; pieceDataX < this.pieceData[0].length; pieceDataX++) {
                if (this.pieceData[pieceDataY][pieceDataX] !== 0) {
                    this.board[pieceDataY + this.position.y - this.pieceOrigin.y][pieceDataX + this.position.x - this.pieceOrigin.x] = PIECE_VALUE[this.piece];
                    //this.board[this.position.y][this.position.x] = 8;
                }
            }
        }
    }

    // === GAME LOGIC ===
    update() {
        //check piece collision
        /**
         if (this.board.collide(this.position, this.pieceData, this.pieceOrigin)){
                //lock delay timer
                //lockDelayTimer = setTimeout(lockDelayTimer, LOCK_DELAY_TIME);
                //clearTimeout(lockDelayTimer);
            }
         */

        //check if perfect clear
        this.score += SCORING.PC;
    }
}