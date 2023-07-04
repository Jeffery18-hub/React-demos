export const isWinner = (gameBoard,currentMove, currentPlayer)=>{ // gameBoard is an array of 16 elements, and pass by reference
    let board = [...gameBoard]; // copy of the array of game state
    board[currentMove] = currentPlayer;
    
    const winLines = [
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
        [0,4,8,12],
        [1,5,9,13],
        [2,6,10,14],
        [3,7,11,15],
        [0,5,10,15],
        [3,6,9,12]
    ];
    
    for (let i = 0; i < winLines.length; i++) {
        const [c1,c2,c3,c4] = winLines[i];
        if (board[c1]>0 &&
            board[c1] === board[c2] && 
            board[c2] === board[c3] && 
            board[c3] === board[c4] ) {
            return true;
        }
    }
    return false;

}

export const isDraw = (gameBoard, currentMove,currentPlayer) => {
    let board = [...gameBoard]; // copy of the array of game state
    board[currentMove] = currentPlayer;
    return board.every((value) => value > 0);

}


const getRndMove = (gameBoard) => {
    let suggestMoves = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === 0) {
            suggestMoves.push(i);
        }
    }
    let suggestMove = suggestMoves[Math.floor(Math.random() * suggestMoves.length)];

    return suggestMove;
}

const getPosition = (gameBoard, moveChecks) => {
    for (let check = 0; check < moveChecks.length; check++) {
        for(let i= 0; i < moveChecks[check].max; i+= moveChecks[check].step) {
            let series = gameBoard[i+ moveChecks[check].indices[0]].toString() + 
            gameBoard[i+ moveChecks[check].indices[1]].toString() +
            gameBoard[i+ moveChecks[check].indices[2]].toString() +
            gameBoard[i+ moveChecks[check].indices[3]].toString();

            switch (series) {
                case "1110":
                case "2220":
                    return i+ moveChecks[check].indices[3];
                case "1101":
                case "2202":
                    return i+ moveChecks[check].indices[2];
                case "1011":
                case "2022":
                    return i+ moveChecks[check].indices[1];
                case "0111":
                case "0222":
                    return i+ moveChecks[check].indices[0];
                default:
            }
        }
    }
    return -1;
}



export const getSuggestMove = (gameBoard) => {
    let moveChecks = [
        // store the json object of the move
        {// vertical
            indices: [0, 4, 8, 12], // [1,5,9,13] [2,6,10,14] [3,7,11,15]
            max:4,
            step:1,
        },
        {// horizontal
            indices: [0, 1, 2, 3], // [4,5,6,7] [8,9,10,11] [12,13,14,15]
            max:16,
            step:4,
        },
        {// diagonal
            indices: [0, 5, 10, 15],
            max:16,
            step:16,
        },
        {// diagonal
            indices: [3, 6, 9, 12],
            max:16,
            step:16,
        },
    ];

    let suggestMove = getPosition(gameBoard, moveChecks);
    if (suggestMove > -1) return suggestMove;
    return getRndMove(gameBoard);
    
}