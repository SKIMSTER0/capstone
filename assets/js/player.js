class Player {
    constructor(game) {
        this.game = game;
        this.board = this.game.board;
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
        this.gameOver = false;
        this.pcoHelper = Array(0);
        this.pieceNum = 0;

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
        //initialize bag/forecast/upcoming pieces
        this.forecast = "";
        this.generateBag();
        this.nextPiece();

        //initialize first PCO
        this.game.setOpener(this.pcoHelper[0].piecesPCO, this.pcoHelper[0].openerData);

        this.pcoCount = 0;
        this.score = 0;
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
        this.position.x += direction.x
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

        console.log("TEST OFFSET");
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

    //drops piece down a single square
    softDrop(gravity) {
        this.move(0, 1);

        if (!gravity) {
            this.score += SCORING.SOFT_DROP;
        }
    }

    //drops piece all the way down until collision
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

    // === PIECE OPTIONS ===
    //given raw piece letter, return piece data and its corresponding offset
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

    //choose a random PCO from the PCO database, add to forecast
    generateBag() {
            //let randNum = Math.floor(Math.random() * (openers.length));
            let randNum = 5;
            let piecesPCO = openers[randNum]["pieces"];
            let openerData = openers[randNum]["opener_data"];

            this.pcoHelper.push({piecesPCO, openerData});
            this.forecast = this.forecast.concat(piecesPCO);
    }

    nextPiece() {
        //pop the front part of the forecast
        this.piece = this.forecast.charAt(0);
        this.forecast = this.forecast.substring(1, this.forecast.length);
        this.pieceData = PIECES_DATA[this.piece];

        //determine position of spawn piece
        this.pieceOrigin.x = Math.floor(this.pieceData.length / 2)
        this.pieceOrigin.y = Math.floor(this.pieceData[0].length / 2)
        this.position = {
            x: Math.ceil(this.game.cols / 2) - this.pieceOrigin.x,
            y: this.pieceOrigin.y
        }

        //check any line clears
        let lineClears = this.game.lineClearCheck();
        this.score += lineClears * SCORING.LINE_CLEAR;

        //check if empty board
        if (this.game.checkPC()){
            this.score += SCORING.PC;
            this.pcoCount++;

            this.game.setOpener(null, null);
            this.game.drawOpener();

            //check if PCO clear
            if (lineClears > 0) {
                //set next PCO helper guidelines
                this.pcoHelper.pop();
                this.game.setOpener(this.pcoHelper[0].piecesPCO, this.pcoHelper[0].openerData);
            }
        }

        //refresh pieces in forecast list if array gets small enough
        if (this.forecast.length < 7) {
            this.generateBag();
        }

        //player will be able to hold next turn
        this.holdable = true;
        this.pieceNum++;

        //game over check (if collision upon spawn or any piece above 4 bottom lines means PCO impossible)
        //if (this.game.collide(this.position, this.pieceData, this.pieceOrigin)){
        if (this.game.checkPCFail()){
            this.gameOver = true;
        } else {
            this.drawPiece();
        }
    }

    //refresh player position
    refreshPlayer() {
        for (let pieceDataY = 0; pieceDataY < this.pieceData.length; pieceDataY++) {
            for (let pieceDataX = 0; pieceDataX < this.pieceData[0].length; pieceDataX++) {
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
                }
            }
        }
    }
}