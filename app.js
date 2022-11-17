/*
    Create/Clear the Game Board
*/

const gameArea = document.querySelector('.game-container');
gameArea.addEventListener('click', playGame);
let playerTurn = 0; // 0 is black, 1 is white
const player = {1: 'white', 0: 'black'}

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
            //if (playerTurn === 1) checker.addEventListener('click', playGame, {once: true});
            newBox.setAttribute('data-taken', 'white');
        } else if (alt >= 6 && boxClass === 'whiteSpace') {
            checker = document.createElement('div');
            checker.classList.add('checker');
            checker.classList.add('black');
            newBox.appendChild(checker);
            //if (playerTurn === 0) checker.addEventListener('click', playGame, {once: true});
            newBox.setAttribute('data-taken', 'black');
        }
    }
}

clearBoard();

function boardPositions(type = 'all') {
    // Grab all white spaces on the board
    const boardSpaces = document.querySelectorAll('.whiteSpace');
    this.availPositions = []; // All positions
    this.takenPositions = [[], []]; // Taken positions by 0: white player, 1: black player
    boardSpaces.forEach((space) => {
        let isFilled = space.dataset.taken;
        
        if (isFilled && isFilled === 'black') {
            takenPositions[0].push(parseInt(space.id));
            
        } else if (isFilled && isFilled === 'white') {
            takenPositions[1].push(parseInt(space.id));
        } else {
            availPositions.push(parseInt(space.id))
        }
    });

    if (type === 'all') return availPositions;
    if (type === 'white') return takenPositions[1];
    if (type === 'black') return takenPositions[0];
}


function checkSpaceMovement() {
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

function playGame(lastID, taken, direction) {
    if (event.target.classList[1] === player[playerTurn]) {
        checkOpenMoves(event.target.parentElement.id)
    } else if (event.target.classList[1] === 'open') {
        originalSpace = event.target.dataset.id;
        console.log(originalSpace)
        toggleMove(originalSpace, event.target.id, event.target.dataset.takeID, direction);
        playerTurn = playerTurn ? 0 : 1;
        nextPlayer(playerTurn);
    }
}

function checkOpenMoves(spaceID) {
    checkSpaceMovement();
    boardPositions();

    //let spaceID = parseInt(event.target.parentElement.id);

    let currentSpace = document.getElementById(spaceID);

    // Remove any highlighted open spaces

    availPositions.forEach((e) => {
        let availDiv = document.getElementById(e);
        availDiv.classList.remove('open');
    });

    // Check if space clicked is equal to the current player's color

    if (currentSpace.dataset.taken === player[playerTurn]) {
        spaceMoves[playerTurn][spaceID].forEach((e) => {
            if (e) {
                let taken = [];
                let thisDiv = document.getElementById(e);
                let spaceTaken = thisDiv.dataset.taken;

                // If next space is taken & it is not current player color

                if (spaceTaken && spaceTaken !== player[playerTurn]) {
                    let nextTry = spaceMoves[playerTurn][e];
                    let originalLeft = spaceMoves[playerTurn][spaceID][0];
                    let originalRight = spaceMoves[playerTurn][spaceID][1];

                    // Try next space first if(original left move === this space in the loop, highlight open next left move) 

                    if (originalLeft === e && availPositions.includes(nextTry[0]) && nextTry[0]) {
                        let leftSpace = document.getElementById(nextTry[0]);
                        leftSpace.classList.add('open');
                        leftSpace.dataset.id = spaceID;
                        leftSpace.dataset.takeID = e;
                        //leftSpace.addEventListener('click', () => {playGame(spaceID, taken, 0)
                            //toggleMove(spaceID, taken, 0)
                        //}, {once: true});
                        // taken space [this space, original space]
                        taken.push([e, spaceID]);
                    } else if (originalRight === e && availPositions.includes(nextTry[1] && nextTry[1])) {
                        let rightSpace = document.getElementById(nextTry[1]);
                        rightSpace.classList.add('open');
                        rightSpace.dataset.id = spaceID;
                        rightSpace.dataset.takeID = e;
                        // rightSpace.addEventListener('click', () => {playGame(spaceID, taken, 1)
                        //     //toggleMove(spaceID, taken, 1)
                        // }, {once: true});
                        taken.push([e, spaceID]);
                    }
                } else if (!spaceTaken && spaceTaken !== player[playerTurn]) {
                    thisDiv.classList.add('open');
                    thisDiv.dataset.id = spaceID;
                    // thisDiv.addEventListener('click', () => {playGame(spaceID)
                    //     //toggleMove(spaceID)
                    // }, {once: true});
                }
            }
        });
    } else {
        console.log('JJFJJDJD')
    }
    return;
}

function toggleMove(prev, next, take, direction) {
    console.log(`prev: ${prev} next: ${next}`);
    const nextSpace = document.getElementById(next);
    nextSpace.setAttribute('data-taken', player[playerTurn]);
    const newChip = document.createElement('div');
    newChip.classList.add('checker');
    newChip.classList.add(player[playerTurn]);
    nextSpace.appendChild(newChip);
    const prevSpace = document.getElementById(prev);
    prevSpace.removeAttribute('data-taken');
    prevSpace.innerHTML = '';

    if (take) {
        const takeChip = document.getElementById(take);
        takeChip.removeAttribute('data-taken');
        takeChip.innerHTML = '';
    }

    // playerTurn = playerTurn ? 0 : 1;
    //nextPlayer(playerTurn);
    //gameArea.addEventListener('click', () => {checkOpenMoves(); console.log('1')});
}

function nextPlayer(turn) {
    boardPositions();
console.log('nextPlayer()');
    availPositions.forEach((e) => {
        let availDiv = document.getElementById(e);
        availDiv.classList.remove('open');
    });

    takenPositions[turn].forEach((e) => {
        let thisChecker = document.getElementById(e);
        thisChecker.addEventListener('click', playGame, {once: true})
    });

    takenPositions[turn ? 0 : 1].forEach((e) => {
        document.getElementById(e).removeEventListener('click', playGame);
    });
}

//gameArea.addEventListener('click', checkOpenMoves);
//clearBoard();
boardPositions();
//console.log(`BLACK: ${takenPositions[0].length} - WHITE: ${takenPositions[1].length}`);