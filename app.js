/*
    Create/Clear the Game Board
*/

const gameArea = document.querySelector('.game-container');

function clearBoard() {
    let alt = 0;
    for (let i = 0; i < 64; i++) {
        if (i % 8 === 0) alt++;
        let boxClass = alt % 2 === 0 ? (i % 2 === 0 ? 'white' : 'black') : (i % 2 === 0 ? 'black' : 'white');
        const newBox = document.createElement('div');
        newBox.classList.add(boxClass);
        newBox.id = i;
        gameArea.appendChild(newBox);
        if (alt <= 3 && boxClass === 'white') {
            checker = document.createElement('div');
            checker.classList.add('checker');
            checker.classList.add('white');
            checker.id = i;
            newBox.appendChild(checker);
            checker.addEventListener('click', checkMoves);

        } else if (alt >= 6 && boxClass === 'white') {
            checker = document.createElement('div');
            checker.classList.add('checker');
            checker.classList.add('black');
            checker.id = i;
            newBox.appendChild(checker);
            checker.addEventListener('click', checkMoves);
        }
    }
}

clearBoard();

// Check moves for selected checker piece and highlight selection
function checkMoves() {
    // Highlight only on checker piece
    let checkers = document.querySelectorAll('.checker');
    let check = 0;
    let currentButton;

    checkers.forEach((button) => {
        if (button.classList[2] == 'border') {
            currentButton = button;
            check++;
        }
    });

    if (!check) {
        event.target.classList.add('border');
    } else {
        currentButton.classList.remove('border');
        event.target.classList.add('border');
    }
}