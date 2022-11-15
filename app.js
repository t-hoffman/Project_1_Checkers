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

        } else if (alt >= 6 && boxClass === 'whiteSpace') {
            checker = document.createElement('div');
            checker.classList.add('checker');
            checker.classList.add('black');
            newBox.appendChild(checker);
            checker.addEventListener('click', checkMoves);
        }
    }
}

clearBoard();

function boardPositions(space = 'all') {
    // Grab all white spaces on the board
    const boardSpaces = document.querySelectorAll('.whiteSpace');
    let availPositions = []; // All positions
    let takenPositions = [[], []]; // Taken positions by 0: white player, 1: black player
    boardSpaces.forEach((space) => {
        let isFilled = space.querySelector('.checker');
        if (isFilled && isFilled.classList[1] === 'white') {
            takenPositions[0].push(space.id);
            
        } else if (isFilled && isFilled.classList[1] === 'black') {
            takenPositions[1].push(space.id);
        } else {
            availPositions.push(space.id)
        }
    });

    if (space === 'all') return availPositions;
    if (space === 'white') return takenPositions[0];
    if (space === 'black') takenPositions[1];
}

boardPositions()

// Check moves for selected checker piece and highlight selection
function checkMoves() {
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