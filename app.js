/*
    Create/Clear the Game Board
*/

const gameArea = document.querySelector('.game-container');
let playerTurn = 0; // 0 is black, 1 is white

function clearBoard() {
    let alt = 0;
    let idCount = 1;
    for (let i = 0; i < 64; i++) {
        if (i % 8 === 0) alt++;
        let boxClass = alt % 2 === 0 ? (i % 2 === 0 ? 'whiteSpace' : 'blackSpace') 
                        : (i % 2 === 0 ? 'blackSpace' : 'whiteSpace');
        const newBox = document.createElement('div');
        newBox.classList.add(boxClass);
        if (boxClass === 'whiteSpace') {
            newBox.id = idCount;
            newBox.innerHTML = idCount;
            idCount++;
        }
        gameArea.appendChild(newBox);
        if (alt <= 3 && boxClass === 'whiteSpace') {
            checker = document.createElement('div');
            checker.classList.add('checker');
            checker.classList.add('white');
            newBox.appendChild(checker);
            checker.addEventListener('click', checkOpenMoves);
            newBox.setAttribute('data-taken', 'white');
        } else if (alt >= 6 && boxClass === 'whiteSpace') {
            checker = document.createElement('div');
            checker.classList.add('checker');
            checker.classList.add('black');
            newBox.appendChild(checker);
            checker.addEventListener('click', checkOpenMoves);
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


function checkSpaceMovement(space = null, playerTurn = null) {
    let checkerBoxes = document.querySelectorAll('.whiteSpace');
    this.spaceMoves = [[],[]];
    const leftEdge = [5,13,21,29];
    const rightEdge = [4,12,20,28];
    let alt = 0;
    let check = 0;

    checkerBoxes.forEach((e) => {
        let boxID = parseInt(e.id);
        let isLeftEdge = leftEdge.includes(boxID);
        let isRightEdge = rightEdge.includes(boxID);
        if (alt % 4 === 0) {
            alt = 0; check++;
        }

        let b_left = check % 2 === 0 ? boxID-5 : boxID-4;
        let b_right = check % 2 === 0 ? boxID-4 : boxID-3;
        let w_left = check % 2 === 0 ? boxID+3 : boxID+4;
        let w_right = check % 2 === 0 ? boxID+4 : boxID+5;

        if (!isLeftEdge && !isRightEdge) {
            if (boxID > 4) spaceMoves[0][boxID] = [b_left, b_right];
            if (boxID < 29) spaceMoves[1][boxID] = [w_left, w_right];
        } else if (isLeftEdge) {
            if (boxID > 4) spaceMoves[0][boxID] = [0, b_right];
            if (boxID < 29) spaceMoves[1][boxID] = [0, w_right]
        } else if (isRightEdge) {
            if (boxID > 4) spaceMoves[0][boxID] = [b_left, 0];
            if (boxID < 29) spaceMoves[1][boxID] = [w_left, 0];
        }

        alt++;
    });
}

function checkOpenMoves() {
    checkSpaceMovement();

    let spaceID = event.target.parentElement.id;
    spaceMoves[playerTurn][spaceID].forEach((e) => {
        let spaceDiv = document.getElementById(e);
        spaceDiv.style.border = '1px solid red';
    });
}
