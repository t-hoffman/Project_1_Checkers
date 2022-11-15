<div align="center">
    <img src="https://raw.githubusercontent.com/t-hoffman/Project_1_Checkers/main/images/screen_shot.png" width="200px">
</div>
<div align="center"><h1>Checkers - Planning</h1></div>
<div>Pseudo code coming ...</div>
<div>
playerTurn = -1, 1 [when adding/sub rows]

checkMoves(square) {
	red = position {row: 10, column: 3}
	black = position {row: 1, column: 2}
	ifLeftEdge = boolean
	ifRightEdge = boolean
	if (red) {
		if (!column > 1 && < 10)	openPostions = spot (93) - 9 or -11
			if (checkSpot(86 && 82)) if taken by black (taken) 
		else if (column === 1)	openPositions = spot (91) - 9
		else if (column === 10)	openPositions = spot (90) - 11
		ETC ETC
	} else {
		if (column > 1 && < 10)	openPositions = row+1 and column-1 or +1
		ETC ETC
	}
	CHECK IF SPOT TAKEN, if so red: open = row-2, column is 
}

checkSpot(id) {
	return id.classList.contains(‘taken');
}
</div>