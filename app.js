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
            checker.classList.add('white_checker');
            newBox.appendChild(checker);
        } else if (alt >= 6 && boxClass === 'white') {
            checker = document.createElement('div');
            checker.classList.add('black_checker');
            newBox.appendChild(checker);
        }
    }
}

clearBoard();