class Board {
    constructor(width, height){
        const board = [];
        while (height--){
            board.push(new Array(width).fill(0));
        }
        this.board = board;
        //simplify into lambda?

        this.events = new Event("");

    }

    clear(){
        this.board.foreach(row => row.fill(0));
        //event??
        this.events.emit('board', this.board);
    }

}