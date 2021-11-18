class Player {
    constructor(game) {
        this.game = game;
        this.board = this.game.board;
        this.position = {
            x: null,
            y: null,
        }
        this.piece = null;
        this.pieceData = null;
        this.direction = 0;
        this.rotation = 0;
        this.gameOver = false;
        this.pcoHelper = Array(0);

        this.setRotation = (rotation) => {
            this.rotation += rotation;
            if (this.rotation >= 360) this.rotation %= 360;
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

        this.refreshPlayer();
        if (!this.game.collide(moveCheck, this.pieceData)) {
            //set new position
            this.position.x += direction.x
            this.position.y += direction.y;
            this.drawPiece();

            console.log("POSITION");
            console.log(this.position);
            return true;
        }
        this.drawPiece();

        return false;
    }

    //rotates piece in given rotation direction
    rotate(rotation) {
        this.refreshPlayer();

        if (!this.checkRotate(rotation)){
            this.setRotation(rotation)
            console.log("NOCOLLISION-ROTATION");
        } else {
            this.checkRotate(-rotation);
            console.log("COLLISION-ROTATION");
        }
        this.drawPiece();
        console.log("ROATATION:", this.rotation);
    }

    //attempts to rotate piece data and returns rotated piece data
    checkRotate(rotation){
        let attemptRotateData = this.pieceData;

        //flip matrix on diagonal axis
        for (let col = 0; col < attemptRotateData.length; col++) {
            for (let row = 0; row < col; row++) {
                [attemptRotateData[row][col], attemptRotateData[col][row]] = [attemptRotateData[col][row], attemptRotateData[row][col]];
            }
        }

        switch (rotation) {
            case ROTATION_DIRECTION.CW :
                attemptRotateData.forEach(row => row.reverse());
                break;
            case ROTATION_DIRECTION.CCW :
                attemptRotateData.reverse();
                break;
            case ROTATION_DIRECTION.FLIP:
                break;
        }

        return (this.game.collide(this.position, attemptRotateData));
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
        //reset previous piece data
        this.rotation = 0;

        //pop the front part of the forecast
        this.piece = this.forecast.charAt(0);
        this.forecast = this.forecast.substring(1, this.forecast.length);

        //generate next piece data
        console.log(PIECES_DATA)
        this.pieceData = PIECES_DATA[this.piece];

        //determine position of spawn piece
        this.position = {
            x: Math.ceil(this.game.cols / 4),
            y: 0
        }

        //check any line clears
        let lineClears = this.game.lineClearCheck();
        this.score += lineClears * SCORING.LINE_CLEAR;

        //check if empty board
        if (this.game.checkPC()){
            this.score += SCORING.PC;
            this.pcoCount++;

            //redraw basic opener setup
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

        //game over check (if collision upon spawn or any piece above 4 bottom lines means PCO impossible)
        if (this.game.checkPCFail()){
            this.gameOver = true;
        } else {
            this.drawPiece();
        }
    }

    //refresh player position (set where piece was to be background color)
    refreshPlayer() {
        for (let pieceDataY = 0; pieceDataY < this.pieceData.length; pieceDataY++) {
            for (let pieceDataX = 0; pieceDataX < this.pieceData[0].length; pieceDataX++) {
                if (this.pieceData[pieceDataY][pieceDataX] === 0) continue;
                this.board[pieceDataY + this.position.y][pieceDataX + this.position.x] = 0;
            }
        }
    }

    // renders the tetris piece onto the board
    drawPiece(){
        for (let pieceDataY = 0; pieceDataY < this.pieceData.length; pieceDataY++) {
            for (let pieceDataX = 0; pieceDataX < this.pieceData[0].length; pieceDataX++) {
                if (this.pieceData[pieceDataY][pieceDataX] !== 0) {
                    this.board[pieceDataY + this.position.y][pieceDataX + this.position.x] = PIECE_VALUE[this.piece];
                    //this.board[this.position.y][this.position.x] = 1;
                }
            }
        }
    }
}