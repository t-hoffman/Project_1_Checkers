// Create Game Board

const gameArea = document.querySelector('.game-container');
let alt = 1;
for (let i = 0; i < 64; i++) {
    if (i % 8 === 0) alt++;
    let boxClass = alt % 2 === 0 ? (i % 2 === 0 ? 'white' : 'black') : (i % 2 === 0 ? 'black' : 'white');

    const newBox = document.createElement('div');
    newBox.classList.add(boxClass);
    newBox.id = i;
    gameArea.appendChild(newBox);
}