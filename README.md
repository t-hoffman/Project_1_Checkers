<p align="center">
  <a href="https://t-hoffman.github.io/Project_1_Checkers/" alt="Play Game"><img src="https://user-images.githubusercontent.com/116391297/202815749-055a397d-e302-4397-b0b5-5423f05b3517.png" width="80%" /></a>
</p>

<h1 align="center"> 🟥 ⬛️ CHECKERS ⬛️ 🟥 </h1>
<p align="center">... by tyler hoffman</p>

## Checkers Game

Developed a checkers board game using JavaScript, HTML and CSS.

> Single page DOM manipulation of the entire board.

> Flexbox used for styling and construction of the game baord.

> The number of each player's pieces is displayed in the console.

This version of the game is two players where the user takes turns with another player on the same browser.

The screen is made up of two main elements:

> Board game is displayed under the title (CHECKERS)

> Player 1 (black) is displayed at the bottom portion of the board and Player 2 (white) is at the top.

> Player turn and score is kept at the bottom of the screen under the board.

> Scores are the color coded boxes with a number in them: `0` `1`

When it is the player's turn the user clicks on a piece and its available moves turn to highlighted green boxes.

Once a player has won the winner is displayed on the screen using a modal.

> To play another game simply click on the 'X' at the top right of the modal display.

## Rules

1. The board is setup using square boxes (8 x 8) with alternating background colors (white and grey).  The pieces can be moved in only the direction of the white background boxes.

2. Each player starts with 8 color coded pieces on their side of the board (white top, black bottom).

3. Each player takes turn making moves by selecting the piece they want to move and clicking on the green available option.

> If there are no green available options, that piece cannot move.

> The piece can make either a normal move in the next box or overtake the opponent's piece.

> Each piece can only move in the direction of the player toward the opponent's side of the board.

4. If the player has no more moves the game is over and the player with the least amount of pieces loses.

5. The game is won when one player overtakes all of their opponents pieces.

## Where to play

> https://t-hoffman.github.io/Project_1_Checkers/

Test board with black almost winning:

> https://t-hoffman.github.io/Project_1_Checkers/testboard.html

#### Files

```
index.html
app.js
style.css
README.md
planning.md
```
