class GameLogic {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.gameOver = false;
        this.visited = 0;
        this.winningCondition = gameBoard.rows * gameBoard.cols - gameBoard.totalMines;
    }
    leftClick(row, col) {
        if (this.gameOver) return;
        // click on cell never been reveal
        if (this.gameBoard.showBoard[row][col] === null) {
            // clicked on a mine
            if (this.gameBoard.board[row][col] === 'B') {
                this.showAllMines();
                this.updateColorAndRender(row, col, "red", 's', 'game-container');
                this.gameOver = true;
                alert("You lose!");
                return;
            }
            // cliced on number or empty cell
            this.reveal(row, col);
            this.checkIfWin();
            return;
        }
        // chording
        if (this.gameBoard.showBoard[row][col] === 's') {
            let flagCount = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    if (row + dr < 0 || row + dr >= this.gameBoard.rows ||
                        col + dc < 0 || col + dc >= this.gameBoard.cols) {
                        continue;
                    }
                    if (this.gameBoard.showBoard[row + dr][col + dc] === 'f') {
                        flagCount++;
                    }
                }
            }
            if (flagCount >= this.gameBoard.board[row][col]) {
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        if (row + dr < 0 || row + dr >= this.gameBoard.rows ||
                            col + dc < 0 || col + dc >= this.gameBoard.cols) {
                            continue;
                        }
                        if (dr === 0 && dc === 0) continue;
                        if (this.gameBoard.showBoard[row + dr][col + dc] === null) {
                            this.leftClick(row + dr, col + dc);
                        }
                    }
                }
            }
            return;
        }
    }
    
    rightClick(row, col) {
        if (this.gameOver) return;
        // flag
        if (this.gameBoard.showBoard[row][col] === null) {
            this.gameBoard.minesLeft--;
            this.updateAndRender(row, col, 'f', 'game-container');
        }
        // unflag
        else if (this.gameBoard.showBoard[row][col] === 'f') {
            this.gameBoard.minesLeft++;
            this.updateAndRender(row, col, null, 'game-container');
        }
    }

    reveal(row, col) {
        if (row < 0 || row >= this.gameBoard.rows
            || col < 0 || col >= this.gameBoard.cols || this.gameBoard.showBoard[row][col] === 's') {
            return;
        }

        this.updateColorAndRender(row, col, "gray", 's', 'game-container');
        this.visited++;

        if (this.gameBoard.board[row][col] !== null) {
            return;
        }

        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                this.reveal(row + dr, col + dc);
            }
        }

    }

    updateColorAndRender(row, col, color, flag, container) {
        this.gameBoard.updateColorBoard(row, col, color);
        this.updateAndRender(row, col, flag, container);
    }

    updateAndRender(row, col, flag, container) {
        this.gameBoard.updateShowBoard(row, col, flag);
        this.gameBoard.renderBoard(container);
    }

    
    checkIfWin() {
        if (this.visited >= this.winningCondition ) {
            this.gameOver = true;
            this.fillAllFlag();
            alert("You win!");
        }

        return;
    }

    // when game win
    fillAllFlag(){  
        // flag all mines that were not flagged
        this.gameBoard.mines.forEach(mine => {
            let r = mine[0];
            let c = mine[1];
            if (this.gameBoard.showBoard[r][c] === null) {
                this.updateAndRender(r, c, 'f', 'game-container');
            }
        });
    }

    // when game lose
    showAllMines() {    
        // show mines that are not realved
        this.gameBoard.mines.forEach(mine => {
            let r = mine[0];
            let c = mine[1];
            if (this.gameBoard.showBoard[r][c] === null) {
                this.updateColorAndRender(r, c, "gray", 's', 'game-container')
            }
        });
        // If flagged wrong
        this.gameBoard.flagMap.forEach(flag => {
            let r = flag[0];
            let c = flag[1];
            if (this.gameBoard.board[r][c] !== 'B') {
                this.updateColorAndRender(r, c, "red", 'f', 'game-container')
            }
        });
    }
}

export default GameLogic;