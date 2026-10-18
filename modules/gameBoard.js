class GameBoard {
    constructor(rows, cols, totalMines) {
        this.rows = rows;
        this.cols = cols;
        this.mines = [];
        this.colorBoard = [];
        this.flagMap = [];
        this.minesLeft = totalMines;
        this.totalMines = totalMines;
        this.board = this.createBoard(totalMines);
        this.showBoard = this.createShowBoard();
    }

    createBoard(totalMines) {
        const board = [];
        this.colorBoard = [];
        for (let r = 0; r < this.rows; r++) {
            let row = [];
            let crow = [];
            for (let c = 0; c < this.cols; c++) {
                row.push(null);
                crow.push(null);
            }
            board.push(row);
            this.colorBoard.push(crow);
        }
        this.generateMines(totalMines, board);
        this.createNumbersSurround(board);
        console.log(this.mines);

        return board;
    }

    createShowBoard() {
        const board = [];
        for (let r = 0; r < this.rows; r++) {
            let row = [];
            for (let c = 0; c < this.cols; c++) {
                row.push(null);
            }
            board.push(row);
        }
        return board;
    }

    renderBoard(containerId) {
        this.showMinesLeft(containerId);
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        const table = document.createElement("table");
        table.classList.add("game-board");

        for (let r = 0; r < this.rows; r++) {
            const row = document.createElement("tr");
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement("td");
                cell.style.backgroundColor = this.colorBoard[r][c];
                cell.textContent = this.showBoard[r][c] === 's' ? this.board[r][c] : this.showBoard[r][c];
                if (cell.textContent === 'B') {
                    cell.textContent = "💣";
                }
                if (cell.textContent === 'f') {
                    cell.textContent = "🚩";
                }

                cell.dataset.row = r;
                cell.dataset.col = c;
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        container.appendChild(table);

    }

    generateMines(totalMines, board) {
        var mines = 0;
        while (mines < totalMines) {
            let r = this.getRandomInt(this.rows);
            let c = this.getRandomInt(this.cols);
            if (this.mines.some(mine => mine[0] === r && mine[1] === c)) {
                continue;
            }
            else {
                this.mines.push([r, c]);
                board[r][c] = "B";
                mines++;
            }
        }
    }


    createNumbersSurround(board) {
        this.mines.forEach(mine => {
            this.exploreSurroundAndInc(board, mine);

        });
    }

    showMinesLeft(containerId) {
        const container = document.getElementById(containerId);
        let numMinesTag = document.getElementById("numMines");
        if (!numMinesTag) {
            numMinesTag = document.createElement('h2');
            numMinesTag.id = 'numMines';
        }

        numMinesTag.textContent = `Number of Mines Left: ${this.minesLeft}.`;
        container.before(numMinesTag);
    }

    updateShowBoard(row, col, flag) {
        // unflag - update flagMap
        if (this.flagMap.some(f => f[0] === row && f[1] === col) && flag !== 'f') {
            this.flagMap.splice(f => f[0] === row && f[1] === col);
        }

        this.showBoard[row][col] = flag;
        // flag - update flagMap
        if (flag === 'f') {
            if (this.flagMap.some(flag => flag[0] === row && flag[1] === col)) {
                return;
            }
            this.flagMap.push([row, col]);
        }


        // this.printShowBoardinConsole();
    }

    updateColorBoard(row, col, color) {
        this.colorBoard[row][col] = color;
    }

    //debug use
    printShowBoardinConsole() {
        console.log(this.showBoard);
        console.log(this.board);
    }

    exploreSurroundAndInc(board, mine) {
        let r = mine[0];
        let c = mine[1];


        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;

                const newRow = r + dr;
                const newCol = c + dc;
                if (newRow < 0 || newRow >= this.rows ||
                    newCol < 0 || newCol >= this.cols || board[newRow][newCol] === 'B') continue;

                board[newRow][newCol] = (board[newRow][newCol] ?? 0) + 1;

            }
        }

        // // top left
        // if (r > 0 && c > 0 && board[r - 1][c - 1] !== 'B') {
        //     board[r - 1][c - 1] = (board[r - 1][c - 1] ?? 0) + 1;
        // }
        // // top
        // if (r > 0 && board[r - 1][c] !== 'B') {
        //     board[r - 1][c] = (board[r - 1][c] ?? 0) + 1;
        // }
        // // top right
        // if (r > 0 && c < this.cols - 1 && board[r - 1][c + 1] !== 'B') {
        //     board[r - 1][c + 1] = (board[r - 1][c + 1] ?? 0) + 1;
        // }
        // // left
        // if (c > 0 && board[r][c - 1] !== 'B') {
        //     board[r][c - 1] = (board[r][c - 1] ?? 0) + 1;
        // }
        // // right
        // if (c < this.cols - 1 && board[r][c + 1] !== 'B') {
        //     board[r][c + 1] = (board[r][c + 1] ?? 0) + 1;
        // }
        // // let bot
        // if (r < this.rows - 1 && c > 0 && board[r + 1][c - 1] !== 'B') {
        //     board[r + 1][c - 1] = (board[r + 1][c - 1] ?? 0) + 1;
        // }
        // //bot
        // if (r < this.rows - 1 && board[r + 1][c] !== 'B') {
        //     board[r + 1][c] = (board[r + 1][c] ?? 0) + 1;
        // }
        // //right bot
        // if (r < this.rows - 1 && c < this.cols - 1 && board[r + 1][c + 1] !== 'B') {
        //     board[r + 1][c + 1] = (board[r + 1][c + 1] ?? 0) + 1;
        // }
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

}





export default GameBoard;