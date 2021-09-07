class Player {
    constructor(board){
        this.events = new Event();

        this.board = board;
        this.position = {
            x : 0,
            y : 0,
        }
        this.piece = null;
        this.direction = 0;
        //whether player can hold on this piece
        this.holdable = true;
        this.heldPiece = null;
        this.rotation = 0;
        this.offset = null;
        //add seed generation
        this.forecast = this.shuffle(['I', 'L', 'J', 'O', 'S', 'T', 'Z']);

        this.score = 0;
    }

    // === INPUT OPTIONS ===

    move(direction){
        if (this.board.collide(this)) {
            return;
        }

        this.position.x += direction;
        //event
    }

    rotate(rotation){
        /**
        switch (rotation){
            case rotation.CW :
                this.rotation += rotation
                break;
            case rotation.CCW :
                break;
            case rotation.FLIP:
                break;
        }
         */


        if (this.rotation >= 360) {
            this.rotation %= 360;
        }
    }

    getRotationState(){

    }

    softDrop(gravity) {
        if (gravity){
            //no score
            return;
        }
        this.score += SCORING.SOFT_DROP;
    }

    hardDrop(){

    }

    hold(){
        if (this.holdable){
            this.holdable = false;

            //if piece in hold spot, swap
            if (this.heldPiece != null) {
                [this.piece, this.heldPiece] = [this.heldPiece, this.piece];
            }

            //update
        }
    }

    // === PIECE OPTIONS ===

    generatePiece(piece){
        switch(piece){
            case piece.I:
                this.pieceData = PIECES.I;
                break;
            case piece.J:
                break;
            case piece.L:
                break;
            case piece.O:
                break;
            case piece.S:
                break;
            case piece.T:
                break;
            case piece.Z:
                break;
            default:
                break;
        }

        this.offset = function(){
            switch(this.piece){
                case 'O':
                    return OFFSET.O
                case 'I':
                    return OFFSET.I
                default:
                    return OFFSET.default
            }
        }
    }

    generateBag(){
        const pieces = ['I', 'L', 'J', 'O', 'S', 'T', 'Z'];
        const randomizedBag = this.shuffle(pieces);
        this.forecast = this.forecast.concat(randomizedBag);
    }

    shuffle(forecast){
        let index = forecast.length, temp, rand;

        //swap around random elements in array while elements to shuffle
        while (index !== 0){
            rand = Math.random() * index | 0;
            index -= 1;

            temp = forecast[index];
            forecast[index] = forecast[rand];
            forecast[rand] = temp;
        }

        return forecast;
    }

    next(){
        //if player held piece in previous turn
        if (!this.holdable){
            this.holdable = true;
            //update forecast
            return;
        }

        //if perfect clear
        this.score += SCORING.PC;

        //update pieces in forecast list
        if (this.forecast.length < 7){
            this.generateBag();
        }

        //place piece on board
        this.rotation = ROTATION_STATE["0"];
        this.piece;

        //if board collision on piece spawn, game over
        if(this.board.collide(this)){

        }
    }
}