const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 20;
const COLORS = [
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'pueple',
    'red'
];
//tetris pieces, in alphabetical order: I J L O S T Z
const MINOS = [
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ],
    [
        [2,0,0,0],
        [2,2,2,2],
        [0,0,0,0],
        [0,0,0,0],
    ],
    [
        [0,0,0,3],
        [3,3,3,3],
        [0,0,0,0],
        [0,0,0,0],
    ],
    [
        [0,4,4,0],
        [0,4,4,0],
        [0,0,0,0],
        [0,0,0,0],
    ],
    [
        [0,5,5,0],
        [5,5,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ],
    [
        [0,6,0,0],
        [6,6,6,0],
        [0,0,0,0],
        [0,0,0,0],
    ],
    [
        [7,7,0,0],
        [0,7,7,0],
        [0,0,0,0],
        [0,0,0,0],
    ],
]; 