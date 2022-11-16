

/*
        checkMoves() older using recursion
*/

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

        if (availPositions.includes(try1)  || takenPositions[1].includes(try1)) {
            nextRow.push(try1);
        } else {
            taken.push(try1);
            if (!takenPositions.includes(try1)) {
                checkMoves(try1);
            }
        }

        if (availPositions.includes(try2) || takenPositions[1].includes(try2)) {
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
        
        return nextRow[0] ? [nextRow[0]] : false;
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

        return nextRow[0] ? [nextRow[0]] : false;
    }

    return false;
}

let checkB = checkMoves(42);
console.log(checkB)

Check moves for selected checker piece and highlight selection
function checkMoves(space) {
    // Highlight only on checker piece
    let checkers = document.querySelectorAll('.checker');
    let check = 0;
    let lastSelection;

    checkers.forEach((button) => {
        if (button.classList[2] == 'border') {
            lastSelection = button;
            check++;
        }
    });

    if (!check) {
        event.target.classList.add('border');
    } else {
        lastSelection.classList.remove('border');
        event.target.classList.add('border');
    }

    if (playerTurn) {
        console.log('no')
    } else {
        
        // let currentButton = event.target.id;
        // let firstRow = [
        //     currentButton - 7,
        //     currentButton - 9,
        // ];
        // let secondRow = [
        //     currentButton - 14,
        //     currentButton - 18,
        // ];

        // firstRow.forEach((first) => {
        //     let firstOpens = document.getElementById(first);
        //     firstOpens.style.border = '1px solid red';
        //     console.log(first)
            
        //     //if (!firstOpens.innerHTML) firstOpens.style.border = '1px solid red';
        // });
    }
}

/*
        makeConnections() older code
*/
        let boxID = parseInt(e.id);
        let isLeftEdge = leftEdge.includes(boxID);
        let isRightEdge = rightEdge.includes(boxID);
        if (boxID % 4 === 0) alt++
        let blackLeft = (alt % 2 != 0) ? boxID-5 : boxID-4;
        let blackRight = (alt % 2 != 0) ? boxID-4 : boxID-3;
        
        if (boxID > 4 && !isLeftEdge && !isRightEdge) {
            spaceMoves[0][boxID] = [blackLeft, blackRight];
        } else if (isLeftEdge && boxID > 4) {
            spaceMoves[0][boxID] = [0, blackRight];
        } else if (isRightEdge && boxID > 4) {
            if (boxID % 8 === 0) {
                spaceMoves[0][boxID] = [blackLeft-1, blackRight-1];
            } else {
                spaceMoves[0][boxID] = [blackLeft+1, 0];
            }
        } else {
            spaceMoves[0][boxID] = [];
        }

        let whiteLeft = (alt % 2 != 0) ? boxID+4 : boxID+5;
        let whiteRight = (alt % 2 != 0) ? boxID+3 : boxID+4;
        
        if (boxID < 29 && !isLeftEdge && !isRightEdge) {
            spaceMoves[1][boxID] = [whiteLeft, whiteRight];
        } else if (isLeftEdge && boxID < 29) {
            spaceMoves[1][boxID] = [0, whiteRight+1];
        } else if (isRightEdge && boxID < 29) {
            if (boxID % 8 === 0) {
                spaceMoves[1][boxID] = [whiteLeft-1, whiteRight-1];
            } else {
                spaceMoves[1][boxID] = [whiteLeft, 0];
            }
        } else {
            spaceMoves[1][boxID] = [];
        }