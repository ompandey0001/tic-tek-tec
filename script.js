function makeMove(row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        document.getElementById('board').children[row * 3 + col].innerText = currentPlayer;
        if (checkWinner()) {
            if (currentPlayer === 'X') {
                drawWinLine(getWinningCells());
            }
            alert(currentPlayer + " wins!");
            resetBoard();
        } else if (checkDraw()) {
            alert("It's a draw!");
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function drawWinLine(cells) {
    let xCoords = [];
    let yCoords = [];

    cells.forEach(cell => {
        let rect = cell.getBoundingClientRect();
        xCoords.push(rect.left + rect.width / 2);
        yCoords.push(rect.top + rect.height / 2);
    });

    let winLine = document.getElementById('winLine');
    winLine.style.width = Math.max(...xCoords) - Math.min(...xCoords) + 'px';
    winLine.style.height = Math.max(...yCoords) - Math.min(...yCoords) + 'px';
    winLine.style.left = Math.min(...xCoords) + 'px';
    winLine.style.top = Math.min(...yCoords) + 'px';
    winLine.style.transform = `rotate(${Math.atan2(yCoords[1] - yCoords[0], xCoords[1] - xCoords[0]) * 180 / Math.PI}deg)`;
    winLine.style.zIndex = '1';
}
