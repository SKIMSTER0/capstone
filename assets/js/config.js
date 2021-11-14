const COLS = 10;
const ROWS = 20;
const ROWS_TRUNCATED = 4;
const BLOCK_SIZE = 20;
const BLOCK_SIZE_COLLECTION = 30;
const BLOCK_SIZE_COLLECTION_MINIFIED = 20;
const BLOCK_SIZE_FORECAST = 15;
const BOARD_SCALE = {
    x : 1,
    y : 1,
}

const PIECE_COLORS = {
    0: '#000000',
    1: '#00FFFF',
    2: '#0000FF',
    3: '#FF6600',
    4: '#FFFF00',
    5: '#00FF00',
    6: '#6600FF',
    7: '#FF0000',
    8: '#808080',
};

//tetris pieces, in alphabetical order: I J L O S T Z
// _ represents empty square, X represents filled square
const PIECES = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
const PIECE_VALUE = {
    _ : 0,
    I : 1,
    J : 2,
    L : 3,
    O : 4,
    S : 5,
    T : 6,
    Z : 7,
    X : 8,
}
const PIECES_STRIPPED_DATA= {
    I : [
        [1,1,1,1]
    ],
    J : [
        [3,0,0],
        [3,3,3],
    ],
    L : [
        [0,0,3],
        [3,3,3],
    ],
    O : [
        [4,4],
        [4,4],
    ],
    S : [
        [0,5,5],
        [5,5,0],
    ],
    T : [
        [0,6,0],
        [6,6,6],
    ],
    Z : [
        [7,7,0],
        [0,7,7],
    ],

}
const PIECES_DATA = {
    I : [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,1,1,1,1],
        [0,0,0,0,0],
        [0,0,0,0,0],
    ],
    J : [
        [2,0,0],
        [2,2,2],
        [0,0,0],
    ],
    L : [
        [0,0,3],
        [3,3,3],
        [0,0,0],
    ],
    O : [
        [0,4,4],
        [0,4,4],
        [0,0,0],
    ],
    S : [
        [0,5,5],
        [5,5,0],
        [0,0,0],
    ],
    T : [
        [0,6,0],
        [6,6,6],
        [0,0,0],
    ],
    Z : [
        [7,7,0],
        [0,7,7],
        [0,0,0],
    ],
};

// SRS piece kicks offsets
const OFFSET = {
    "O" : {
        0 : [ {x:0, y:0} ],
        90 : [ {x:0, y:1} ],
        180 : [ {x:-1, y:1} ],
        270 : [ {x:-1, y:0} ]
    },
    "I" : {
        0 : [ {x:0, y:0}, {x:-1, y:0}, {x:2, y:0}, {x:-1, y:0}, {x:2, y:0} ],
        90 : [ {x:-1, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:-1}, {x:0, y:2}, ],
        180 : [ {x:-1, y:-1}, {x:1, y:-1}, {x:-2, y:-1}, {x:1, y:0}, {x:-2, y:0} ],
        270 : [ {x:0, y:-1}, {x:0, y:-1}, {x:0, y:-1}, {x:0, y:1}, {x:0, y:-2} ]
    },
    default : {
        0 : [ {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0} ],
        90 : [ {x:0, y:0}, {x:1, y:0}, {x:1, y:+1}, {x:0, y:-2}, {x:1, y:-2}, ],
        180 : [ {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0} ],
        270 : [ {x:0, y:0}, {x:-1, y:0}, {x:-1, y:+1}, {x:0, y:-2}, {x:-1, y:-2} ],
    }
}

const ROTATION_DIRECTION = {
    "CW" : 90,
    "FLIP" : 180,
    "CCW" : 270,
}

const KEY_SETTINGS = {
    "left" : "ArrowLeft",
    "right" : "ArrowRight",
    "rotateCW" : "KeyX",
    "rotateCCW" : "KeyZ",
    "rotateFlip" : "KeyC",
    "softDrop" : "ArrowDown",
    "hardDrop" : "ArrowUp",
    "hold" : "Space",
}

const SCORING = {
    "PC" : 1000,
    "SOFT_DROP" : 10,
    "HARD_DROP" : 50,
    "LINE_CLEAR": 100,
}

const FPS = 60;
const GRAVITY_TIME = 1000;
const LOCK_DELAY_TIME = 1000;