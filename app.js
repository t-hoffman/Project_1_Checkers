/*
###############################################################
#
#       C   E   K   R
#         H   C   E   S        by Tyler Hoffman
#
###############################################################
*/

// Event delegation using the parent element (.game-container)
const gameArea = document.querySelector('.game-container');
gameArea.addEventListener('click', playGame);
let playerTurn = 0; // 0 is black, 1 is white
const player = {1: 'white', 0: 'black'}
let score = [0, 0];

function clearBoard() {
    let alt = 0;
    let idCount = 1;
    
    if (gameArea.innerHTML) gameArea.innerHTML = '';
    
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

//clearBoard();

// Assemble each space movement according to the board & direction visually
// return spaceMoves: array ([0] black, [1] white, spaceMoves[0][spaceID], etc.)
// black can only move up ( - ), white down ( + )  .. exception: kings

function gatherSpaceMovements() {
    let checkerBoxes = document.querySelectorAll('.whiteSpace');
    // [[0]->[1],[2] .. ], [1]->[1],[2]] // this[0] black this[1] white
    this.spaceMoves = [[[]],[[]]]; 
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
            if (boxID > 4) spaceMoves[0].push([b_left, b_right]);
            if (boxID < 29) spaceMoves[1].push([w_left, w_right]);
        } else if (isLeftEdge) {
            if (boxID > 4) spaceMoves[0].push([0, b_right]);
            if (boxID < 29) spaceMoves[1].push([0, w_right]);
        } else if (isRightEdge) {
            if (boxID > 4) spaceMoves[0].push([b_left, 0]);
            if (boxID < 29) spaceMoves[1].push([w_left, 0]);
        }

        if (boxID < 5) {spaceMoves[0][boxID] = [];}
        if (boxID > 28) {spaceMoves[1][boxID] = [];}

        alt++;
    });
}

gatherSpaceMovements();


// Gather both available && taken positions to an array

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

boardPositions();

// Check open moves for a specific piece on the board & highlight

function checkOpenMoves(spaceID) {
    let currentSpace = document.getElementById(spaceID);

    // Remove any highlighted open spaces & attribute data that is not in use anymore
    availPositions.forEach((e) => {
        let availDiv = document.getElementById(e);
        availDiv.classList.remove('open');
        availDiv.removeAttribute('data-id');
        availDiv.removeAttribute('data-takeid');
    });

    // Check if space clicked is equal to the current player's color
    let isKing = currentSpace.firstChild.classList.contains('king') ? true : false;

    if (currentSpace.dataset.taken === player[playerTurn]) {
        if (isKing == false) {
            toggleOpenMoves(spaceID, playerTurn, false)
        } else {
            // King must be checked both up and down the board
            toggleOpenMoves(spaceID, 0, false, true);
            toggleOpenMoves(spaceID, 1, false, true);
        }
    }
}

// Display open space(s), also anonymous use to check total moves left on board

function toggleOpenMoves(spaceID, playerID, counter = false, isKing = false, kingColor) {
    let countMoves = [];
    let originalColor = kingColor ? kingColor : document.getElementById(spaceID).dataset.taken;

    spaceMoves[playerID][spaceID].forEach((e) => {
        if (e) {
            let thisDiv = document.getElementById(e);
            let spaceTaken = thisDiv.dataset.taken;

            // If next space is taken & it is not current player color
            
            if (spaceTaken && spaceTaken !== originalColor) {
                let nextTry = spaceMoves[playerID][e];
                let originalLeft = spaceMoves[playerID][spaceID][0];
                let originalRight = spaceMoves[playerID][spaceID][1];

                // Try next space first if(original left move === this space in the loop)
                // then highlight open next left move
                
                if (originalLeft === e && availPositions.includes(nextTry[0])) {
                    if (counter == false) {
                        // Set attributes to pass along data vs. numerous event listeners
                        let leftSpace = document.getElementById(nextTry[0]);
                        leftSpace.classList.add('open');
                        // Origin space ID to later take away the piece on this space
                        leftSpace.dataset.id = spaceID;
                        // data-takeid space ID of the opponent's piece to toggle/remove
                        leftSpace.dataset.takeid = e;
                    } else {
                        countMoves.push(e); // anonymous function use to count all moves available
                    }
                } else if (originalRight === e && availPositions.includes(nextTry[1])) {
                    if (counter == false) {
                        let rightSpace = document.getElementById(nextTry[1]);
                        rightSpace.classList.add('open');
                        rightSpace.dataset.id = spaceID;
                        rightSpace.dataset.takeid = e;
                    } else {
                        countMoves.push(e);
                    }
                }
            } else if (!spaceTaken && spaceTaken !== player[playerID]) {
                if (counter == false) {
                    thisDiv.classList.add('open');
                    thisDiv.dataset.id = spaceID;
                } else {
                    countMoves.push(e);
                }
            }
        }
    });

    // Return # of available moves when function called during checkForWinner()

    return countMoves;
}

// Move the pieces on the board

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
        if (next < 5 || next > 28) newChip.classList.add('king');
        newChip.classList.add(player[playerTurn]);
        const prevSpace = document.getElementById(prev);
        prevSpace.removeAttribute('data-taken');
        if (prevSpace.firstChild.classList.contains('king')) newChip.classList.add('king')
        prevSpace.innerHTML = '';
        nextSpace.appendChild(newChip);
        
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


// Checking for winner in 2 cases, one: one player has taken all of the other player's pieces
// and two: if there are absolutely no more moves for the players

function checkForWinner() {
    boardPositions();

    let b_counter = 0;
    let w_counter = 0;
    const w_kings = [];
    const b_kings = [];
    
    // Check all taken black positions for any available moves, count (note king spaces)
    takenPositions[0].forEach((s) => {
        let thisDiv = document.getElementById(s);
        if (thisDiv.firstChild.classList.contains('king')) {
            b_kings.push(s);
        } else {
            if (toggleOpenMoves(s, 0, true).length > 0) b_counter++;
        }
    });

    // Iterate through black king spaces for available moves, count
    b_kings.forEach((k) => {
        if (toggleOpenMoves(k, 0, true, true, 'black')) b_counter++;
    });
    
    takenPositions[1].forEach((s) => {
        let thisDiv = document.getElementById(s);
        if (thisDiv.firstChild.classList.contains('king')) {
            w_kings.push(s);
        } else {
            if (toggleOpenMoves(s, 1, true).length > 0) w_counter++;
        }
    });

    w_kings.forEach((k) => {
        if (toggleOpenMoves(k, 1, true, true, 'white')) w_counter++;
    });    

    if (takenPositions[0].length <= 0 || takenPositions[1].legnth <= 0 || b_counter === 0 || w_counter === 0) {
        // DOM manipulation of 'player turn' in footer of game board
        // without calling nextPlayer() so as not to run another loop
        let winner = takenPositions[0].length > takenPositions[1].length ? 'black' : 'white';
        const playerTurnFooter = document.getElementById('player-turn');
        playerTurn = winner === 'black' ? 0 : 1;
        score[playerTurn]++;

        playerTurnFooter.classList.remove(playerTurnFooter.classList[1]);
        playerTurnFooter.classList.add(winner);
        const playerScores = document.getElementById(`${winner}-score`);
        playerScores.textContent = score[playerTurn];
        
        clearBoard();

        // Winner modal
        const winnerModal = document.getElementById('winner-modal');
        const modalContent = document.querySelector('.modal-text');
        const span = document.getElementsByClassName('close')[0];
        winnerModal.style.display = 'block';
        modalContent.textContent = `WINNER IS ${winner}`;
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            winnerModal.style.display = 'none';
        }
    }
}


// Function used for event delegation using the game board container

function playGame() {    
    let clickedSpace = event.target.classList;

    if (clickedSpace.contains(player[playerTurn])) {
        // Display open moves for the clicked spot
        checkOpenMoves(event.target.parentElement.id);
    } else if (clickedSpace.contains('open')) {
        // Toggle the clicked open spot and move the piece/take any opponent pieces

        originalSpace = event.target.dataset.id;
        toggleMove(originalSpace, event.target.id, event.target.dataset.takeid);
        playerTurn = playerTurn === 1 ? 0 : 1;
        nextPlayer();
    } else if (clickedSpace.contains('king')) {
        checkOpenMoves(event.target.parentElement.id);
    }

    checkForWinner();
}


function nextPlayer() {
    boardPositions();

    availPositions.forEach((e) => {
        let availDiv = document.getElementById(e);
        availDiv.classList.remove('open');
    });

    // DOM manipulation of 'player turn' in footer of game board
    const playerTurnFooter = document.getElementById('player-turn');
    playerTurnFooter.classList.remove(playerTurn ? 'black' : 'white');
    playerTurnFooter.classList.add(player[playerTurn]);

    console.log(`BLACK: ${takenPositions[0].length} - WHITE: ${takenPositions[1].length}`);
}