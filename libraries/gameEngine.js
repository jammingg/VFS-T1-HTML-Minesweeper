import GameBoard from "../modules/gameBoard.js";
import UserInput from "../modules/userInput.js";
import GameLogic from "../modules/gameLogic.js";

class GameEngine{
    constructor(containerId){
        var rows = 9;
        var cols = 9;
        var totalMines = 10;
        this.gameBoard = new GameBoard(rows, cols, totalMines);
        this.gameLogic = new GameLogic(this.gameBoard);
        this.UserInput = new UserInput(this.gameLogic);
        this.gameBoard.renderBoard(containerId);

    }
}

export default GameEngine;