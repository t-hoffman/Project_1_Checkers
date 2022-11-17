/*
###############################################################
#
#       C   E   K   R
#         H   C   E   S        by Tyler Hoffman
#
###############################################################
*/

// Add event listener to the game board parent
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
            idCount++;
        }
        gameArea.appendChild(newBox);
        if (alt <= 3 && boxClass === 'whiteSpace') {
            checker = document.createElement('div');
            checker.classList.add('checker');
            checker.classList.add('white');
            newBox.appendChild(checker);
            newBox.setAttribute('data-taken', 'white');
        } else if (alt >= 6 && boxClass === 'whiteSpace') {
            checker = document.createElement('div');
            checker.classList.add('checker');
            checker.classList.add('black');
            newBox.appendChild(checker);
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


function checkSpaceMovements() {
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

        if (boxID < 5) {spaceMoves[0][boxID] = [];}
        if (boxID > 28) {this.spaceMoves[1][boxID] = []}

        alt++;
    });
}

function checkOpenMoves(spaceID) {
    checkSpaceMovements();
    boardPositions();

    //let spaceID = parseInt(event.target.parentElement.id);

    let currentSpace = document.getElementById(spaceID);

    // Remove any highlighted open spaces & attribute data that is not in use anymore

    availPositions.forEach((e) => {
        let availDiv = document.getElementById(e);
        availDiv.classList.remove('open');
        availDiv.removeAttribute('data-id');
        availDiv.removeAttribute('data-takeid');
    });

    // Check if space clicked is equal to the current player's color

    if (currentSpace.dataset.taken === player[playerTurn]) {
        spaceMoves[playerTurn][spaceID].forEach((e) => {
            if (e) {
                let thisDiv = document.getElementById(e);
                let spaceTaken = thisDiv.dataset.taken;

                // If next space is taken & it is not current player color

                if (spaceTaken && spaceTaken !== player[playerTurn]) {
                    let nextTry = spaceMoves[playerTurn][e];
                    let originalLeft = spaceMoves[playerTurn][spaceID][0];
                    let originalRight = spaceMoves[playerTurn][spaceID][1];

                    // Try next space first if(original left move === this space in the loop)
                    // then highlight open next left move

                    if (originalLeft === e && availPositions.includes(nextTry[0])) {
                        // Set attributes to pass along data vs. numerous event listeners
                        let leftSpace = document.getElementById(nextTry[0]);
                        leftSpace.classList.add('open');
                        leftSpace.dataset.id = spaceID;
                        leftSpace.dataset.takeid = e;
                    } else if (originalRight === e && availPositions.includes(nextTry[1])) {
                        let rightSpace = document.getElementById(nextTry[1]);
                        rightSpace.classList.add('open');
                        rightSpace.dataset.id = spaceID;
                        rightSpace.dataset.takeid = e;
                    }
                } else if (!spaceTaken && spaceTaken !== player[playerTurn]) {
                    thisDiv.classList.add('open');
                    thisDiv.dataset.id = spaceID;
                }
            }
        });
    }
}

function toggleMove(prev, next, take) {
    // Prev: space from which piece is being moved from, next: space moving to, 
    // take: remove opponent if possible
    const nextSpace = document.getElementById(next);
    if (!nextSpace.dataset.taken) {
        // Place player checker color piece onto next space
        nextSpace.setAttribute('data-taken', player[playerTurn]);
        nextSpace.classList.remove('open');
        const newChip = document.createElement('div');
        newChip.classList.add('checker');
        newChip.classList.add(player[playerTurn]);
        nextSpace.appendChild(newChip);
        const prevSpace = document.getElementById(prev);
        prevSpace.removeAttribute('data-taken');
        prevSpace.innerHTML = '';

        // Take other player chip off
        if (take) {
            const takeChip = document.getElementById(take);
            takeChip.removeAttribute('data-taken');
            takeChip.innerHTML = '';
        }

        // Remove attributes passed through non-hop option 
        nextSpace.removeAttribute('data-takeid');
        nextSpace.removeAttribute('data-id');
    }
}

function playGame() {
    // This is the function executed around the entire gameArea using an even listener
    if (event.target.classList[1] === player[playerTurn]) {
        // Display open moves for the clicked spot
        checkOpenMoves(event.target.parentElement.id)
    } else if (event.target.classList[1] === 'open') {
        // Toggle the clicked open spot and move the piece/take any opponent pieces
        originalSpace = event.target.dataset.id;

        toggleMove(originalSpace, event.target.id, event.target.dataset.takeid);
        playerTurn = playerTurn === 1 ? 0 : 1;
        nextPlayer(playerTurn);
    }
}

function nextPlayer(turn) {
    boardPositions();

    availPositions.forEach((e) => {
        let availDiv = document.getElementById(e);
        availDiv.classList.remove('open');
    });

    const playerTurnFooter = document.getElementById('player-turn');
    playerTurnFooter.classList.remove(playerTurn ? 'black' : 'white');
    playerTurnFooter.classList.add(player[playerTurn]);

    console.log(`BLACK: ${takenPositions[0].length} - WHITE: ${takenPositions[1].length}`);
}