class UserInput {
    constructor(gameLogic){
        this.gameLogic = gameLogic;
        this.addEventListeners();
    }

    addEventListeners(){
        const gameContainer = document.querySelector('#game-container');
        gameContainer.addEventListener("click", this.handleClick.bind(this));
        gameContainer.addEventListener("contextmenu", this.handleRightClick.bind(this));
    }


    handleClick(event){
        const [row, col] = this.findCell(event);
        if(row !== null && col !== null){
            this.gameLogic.leftClick(row, col);
            // console.log(`${row}, ${col} is clicked...`)
        }
    }

    handleRightClick(event){
        const [row, col] = this.findCell(event);
        if(row !== null && col !== null){
            event.preventDefault();
            this.gameLogic.rightClick(row, col);
            // console.log(`${row}, ${col} is right clicked...`)
        }
    }
    
    findCell(event){
        const cell = event.target.closest("td");
        if (!cell){
            return null;
        }
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        return [row, col];
    }

}

export default UserInput;