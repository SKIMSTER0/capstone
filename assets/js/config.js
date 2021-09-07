const COLS = 10;
const ROWS = 20;
const BOARD_SCALE_X = 20;
const BOARD_SCALE_Y = 20;
const BLOCK_SIZE = 20;
const COLORS = {
    1: 'cyan',
    2: 'blue',
    3: 'orange',
    4 : 'yellow',
    5: 'green',
    6: 'purple',
    7: 'red',
};

//tetris pieces, in alphabetical order: I J L O S T Z
// _ represents empty square, X represents filled square
const PIECE_LETTER = {
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
const PIECES = {
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
        [4,4],
        [4,4],
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
    "O": {
        0: [ {x:0, y:0} ],
        1: [ {x:0, y:1} ],
        2: [ {x:-1, y:1} ],
        3: [ {x:-1, y:0} ]
    },
    "I": {
        0: [ {x:0, y:0}, {x:-1, y:0}, {x:2, y:0}, {x:-1, y:0}, {x:2, y:0} ],
        1: [ {x:-1, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:-1}, {x:0, y:2}, ],
        2: [ {x:-1, y:-1}, {x:1, y:-1}, {x:-2, y:-1}, {x:1, y:0}, {x:-2, y:0} ],
        3: [ {x:0, y:-1}, {x:0, y:-1}, {x:0, y:-1}, {x:0, y:1}, {x:0, y:-2} ]
    },
    default: {
        0: [ {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0} ],
        1: [ {x:0, y:0}, {x:1, y:0}, {x:1, y:+1}, {x:0, y:-2}, {x:1, y:-2}, ],
        2: [ {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0} ],
        3: [ {x:0, y:0}, {x:-1, y:0}, {x:-1, y:+1}, {x:0, y:-2}, {x:-1, y:-2} ],
    }
}

const ROTATION_DIRECTION = {
    "CW" : 90,
    "CCW" : -90,
    "FLIP" : 180,
}
const ROTATION_STATE = {
    0 : 0,
    1 : 90,
    2 : 180,
    3 : 270,
}

const INPUT_KEYS = {
    "left" : "ArrowLeft",
    "right" : "ArrowRight",
    "rotateCW" : "KeyX",
    "rotateCCW" : "KeyZ",
    "softDrop" : "ArrowDown",
    "hardDrop" : "ArrowUp",
    "hold" : "Space",
}

const SCORING = {
    "PC" : 1000,
    "SOFT_DROP" : 10,
}
