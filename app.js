/*
    Create/Clear the Game Board
*/

const gameArea = document.querySelector('.game-container');
let playerTurn = 0; // 0 is black, 1 is white

function clearBoard() {
    let alt = 0;
    for (let i = 0; i < 64; i++) {
        if (i % 8 === 0) alt++;
        let boxClass = alt % 2 === 0 ? (i % 2 === 0 ? 'whiteSpace' : 'blackSpace') 
                        : (i % 2 === 0 ? 'blackSpace' : 'whiteSpace');
        const newBox = document.createElement('div');
        newBox.classList.add(boxClass);
        newBox.id = i;
        newBox.innerHTML = i;
        gameArea.appendChild(newBox);
        if (alt <= 3 && boxClass === 'whiteSpace') {
            checker = document.createElement('div');
            checker.classList.add('checker');
            checker.classList.add('white');
            newBox.appendChild(checker);
            checker.addEventListener('click', checkMoves);
            newBox.setAttribute('data-taken', 'white');
        } else if (alt >= 6 && boxClass === 'whiteSpace') {
            checker = document.createElement('div');
            checker.classList.add('checker');
            checker.classList.add('black');
            newBox.appendChild(checker);
            checker.addEventListener('click', checkMoves);
            newBox.setAttribute('data-taken', 'black');
        }
    }
}

clearBoard();

function boardPositions(space = 'all') {
    // Grab all white spaces on the board
    const boardSpaces = document.querySelectorAll('.whiteSpace');
    this.availPositions = []; // All positions
    this.takenPositions = [[], []]; // Taken positions by 0: white player, 1: black player
    boardSpaces.forEach((space) => {
        let isFilled = space.querySelector('.checker');
        if (isFilled && isFilled.classList[1] === 'black') {
            takenPositions[0].push(parseInt(space.id));
            
        } else if (isFilled && isFilled.classList[1] === 'white') {
            takenPositions[1].push(parseInt(space.id));
        } else {
            availPositions.push(parseInt(space.id))
        }
    });

    if (space === 'all') return availPositions;
    if (space === 'white') return takenPositions[0];
    if (space === 'black') takenPositions[1];

    let isLeftEdge = [8, 24, 40, 56];
    let isRightEdge = [7, 23, 39, 55];
    isLeftEdge = isLeftEdge.includes(space);
    isRightEdge = isRightEdge.includes(space);

    if (playerTurn) {

    } else {
        if (!isLeftEdge && !isRightEdge) {
            


            // let try1 = (space-7).toString();
            // let try2 = (space-9).toString();

            // if (availPositions.includes(try1)) nextRow.push(try1);
            // if (availPositions.includes(try2)) nextRow.push(try2);
            
            // if (nextRow.length === 2) {
            //     return nextRow;
            // } else if (nextRow.length == 1) {
            //     return nextRow;
            // } else {
            //     return boardPositions(try1);
            // }
        } else if (isLeftEdge) {
            let nextRow = space-7;
            let check1 = document.getElementById(nextRow).getAttribute('data-taken');
            if (!check1) return nextRow;
        } else if (isRightEdge) {
            let nextRow = space-9;
            let check1 = document.getElementById(nextRow).getAttribute('data-taken');
            if (!check1) return nextRow;
        }
    } 
}


function checkMoves(space = 0, recur = false){
    boardPositions();
    let isLeftEdge = [8, 24, 40, 56];
    let isRightEdge = [7, 23, 39, 55];
    isLeftEdge = isLeftEdge.includes(space);
    isRightEdge = isRightEdge.includes(space);
    let taken = [];
    let nextRow = [];
    
    if (!isLeftEdge && !isRightEdge) {
        let try1 = playerTurn===0 ? space-7 : space+7;
        let try2 = playerTurn===0 ? space-9 : space+9;

        if (availPositions.includes(try1)) {
            nextRow.push(try1);
        } else {
            taken.push(try1);
            if (!takenPositions.includes(try1)) {
                checkMoves(try1);
            }
        }

        if (availPositions.includes(try2)) {
            nextRow.push(try2);
        } else {
            taken.push(try2);
            if (!takenPositions.includes(try1)) {
                checkMoves(try2);
            }
        }

        if (nextRow[nextRow.length -1]-nextRow[0] === 4 && nextRow.length >= 4) {
            return [nextRow[0], nextRow[nextRow.length - 1]];
        } else if (nextRow.length < 4) { 
            return nextRow;
        } else {
            return [nextRow[0]];
        }
    } else if (isLeftEdge) {
        let try1 = playerTurn===0 ? space-7 : space+7;
        if (availPositions.includes(try1)) {
            nextRow.push(try1);
        } else {
            if (!takenPositions.includes(try1)) {
                playerTurn===0 ? checkMoves(try1 - 7) : checkMoves(try1 + 7);
            }
        }
        
        return nextRow[0] ? nextRow[0] : false;
        //return nextRow;
    } else if (isRightEdge) {
        let try1 = playerTurn===0 ? space-9 : space+7;
        
        if (availPositions.includes(try1)) {
            nextRow.push(try1);
        } else {
            if (!takenPositions.includes(try1)) {
                playerTurn===0 ? checkMoves(try1-9) : checkMoves(try1+9);
            }
        }

        return nextRow[0] ? nextRow[0] : false;
    }

    return false;
}

// Check moves for selected checker piece and highlight selection
// function checkMoves(space) {
//     // Highlight only on checker piece
//     let checkers = document.querySelectorAll('.checker');
//     let check = 0;
//     let lastSelection;

//     checkers.forEach((button) => {
//         if (button.classList[2] == 'border') {
//             lastSelection = button;
//             check++;
//         }
//     });

//     if (!check) {
//         event.target.classList.add('border');
//     } else {
//         lastSelection.classList.remove('border');
//         event.target.classList.add('border');
//     }

//     if (playerTurn) {
//         console.log('no')
//     } else {
        
//         // let currentButton = event.target.id;
//         // let firstRow = [
//         //     currentButton - 7,
//         //     currentButton - 9,
//         // ];
//         // let secondRow = [
//         //     currentButton - 14,
//         //     currentButton - 18,
//         // ];

//         // firstRow.forEach((first) => {
//         //     let firstOpens = document.getElementById(first);
//         //     firstOpens.style.border = '1px solid red';
//         //     console.log(first)
            
//         //     //if (!firstOpens.innerHTML) firstOpens.style.border = '1px solid red';
//         // });
//     }
// }