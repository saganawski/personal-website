const selectXBtn = document.querySelector(".playerX");
const selectOBtn = document.querySelector(".playerO");


const Player = (mark) => {
    const getMark = () => mark; 
    let isAcitve = false;

    const getIsActive = () =>{
        return isAcitve;
    }

    const setIsActive = (activeBoolean) =>{
        isAcitve = activeBoolean;
    }

    return{getMark,getIsActive,setIsActive}
};

const grid = (() => {
    let grid = [];
    // create empty 2d grid
    const generateEmptyGrid = () => {
        grid = Array(3).fill(null).map(() => Array(3).fill(""));
    }

    const getGrid = () => {
        return grid;
    }

    //update grid on click with mark 
    const addMarkToGrid = (position, mark) => {
        const positionArray = position.split("");
        const positionOne =  parseInt(positionArray[0]);        
        const positionTwo =  parseInt(positionArray[1]);
        
        grid[positionOne][positionTwo] = mark;
        checkGameProcess();
    }

    // check win status TODO: this should be refactored maybe into gameplay
    const checkGameProcess = () => {
        const allEqual = arr => arr.every(value => value === arr[0] && arr[0] != "");
        const arrayColumn = (arr, n) => arr.map(x => x[n]);
        const notEmpty = (arr) => arr.every(value => value != "");

        const leftToRightDiagonal = () => {
            let arr = [];
            
            arr.push(grid[0][0]);
            arr.push(grid[1][1]);
            arr.push(grid[2][2]);
            return arr;
        } 

        const rightToLeftDiagonal = () => {
            let arr = [];
            
            arr.push(grid[0][2]);
            arr.push(grid[1][1]);
            arr.push(grid[2][0]);
            return arr;
        } 

        for(let i=0; i < grid.length; i++ ){
            // left to right check
            if(allEqual(grid[i])){
                playBoard.hide();

                const mark = grid[i][0];
                //declare game over
                resultBox.showResults(mark);
                return;
            }

            // vertical check
            const column = arrayColumn(grid,i);
            if(allEqual(column)){
                playBoard.hide();
                const mark = grid[i][0];
                resultBox.showResults(mark);

                return;
            }
            
        }
        
        // diagonal check
        const leftToRightDiagonalArray = leftToRightDiagonal();
        if(allEqual(leftToRightDiagonalArray)){
            playBoard.hide();
            const mark = leftToRightDiagonalArray[0];
            resultBox.showResults(mark);

            return;
        }

        const rightToLeftDiagonalArray = rightToLeftDiagonal();
        if(allEqual(rightToLeftDiagonalArray)){
            playBoard.hide();
            const mark = rightToLeftDiagonalArray[0];
            resultBox.showResults(mark);
            return;
        }

        // draw check
        if(notEmpty(grid[0]) && notEmpty(grid[1]) && notEmpty(grid[2]) ){

            playBoard.hide();
            resultBox.showResults("Draw");

            return;
        }
    }

    return { generateEmptyGrid, getGrid, addMarkToGrid}

})(); 

const gamePlay = (() => {

    const playersArray = [];
    
    const createPlayers = () => {
        const playerO = Player("O");
        const playerX = Player("X");

        playersArray.push(playerO);
        playersArray.push(playerX);
    }
    
    // find active player
    const activePlayer = () => {
        return playersArray.find(p => p.getIsActive() === true );
    }

    const setActivePalyer = (playersMark) => {
        const player = playersArray.find(p => p.getMark() === playersMark);
        player.setIsActive(true);
        return player;
    }

    // switch players
    const switchPlayer = (currentPlayer) => {

        const nextPlayer = playersArray.find(p => p.getIsActive() === false);
        nextPlayer.setIsActive(true);
        
        currentPlayer.setIsActive(false);

        playBoard.switchPlayer(nextPlayer);

    }

    const resetPlayersActive = () => {
        playersArray.forEach(player => {
            player.setIsActive(false);
        })
    }

    return {createPlayers, activePlayer,setActivePalyer, switchPlayer, resetPlayersActive};

})();

// PlayBoard Module 
const playBoard = (() => {
    const playersDiv = document.querySelector(".players");
    const playBoard = document.querySelector(".play-board");
    const allBox = document.querySelectorAll("section span");

    const show = () => {
        playBoard.classList.add("show");
        removeMarks();
    }

    const hide = () => {
        playBoard.setAttribute("class", "play-board");
    }

    const addAttributeOnclickEventToEachSpan = () => {
        allBox.forEach(span => {
            span.setAttribute("onclick","clickedBox(this)");
        })
    }

    const closeBox = (boxElement) => {
        boxElement.style.pointerEvents = "none";
    }

    const switchPlayer = (player) => {
        if(player.getMark() === "O"){
            playersDiv.setAttribute("class", "players active"); 
        }else{
            playersDiv.setAttribute("class", "players"); 
        }

    }

    const removeMarks = () => {
        allBox.forEach(span => {
            span.innerHTML = "";
            span.style.pointerEvents = "";
        })
    }

    return {show, addAttributeOnclickEventToEachSpan, closeBox, switchPlayer,hide, removeMarks};
})();

// selectBox module
const selectBox = (() =>{
    const selectBox = document.querySelector(".select-box");
    
    const hide = () =>{
        selectBox.classList.add("hide");
    }

    const show = () => {
        selectBox.setAttribute("class", "select-box");
    }
    return {hide,show};

})();

function clickedBox(box){
    //find active player
    activePlayer = gamePlay.activePlayer();
    mark = activePlayer.getMark();
    // set Mark on active player
    box.innerHTML = mark;
    playBoard.closeBox(box);

    // upadte grid
    const position = box.dataset.position;
    grid.addMarkToGrid(position,mark);

    // switch player
    gamePlay.switchPlayer(activePlayer);
}

const resultBox = (() =>{
    const box = document.querySelector(".result-box");
    const winner = document.querySelector(".won-text");
    const player = winner.querySelector("p");
    
    const showResults = (mark) => {
        if(mark != "Draw"){
            player.textContent = mark;
        }else {
            winner.textContent = mark;
        }
        
        show();
    }

    const show = () => {
        box.classList.add("show");
        setEventListernerToReplay();
    }

    const hide = () => {
        box.setAttribute("class", "result-box");
    }

    const setEventListernerToReplay = () => {
        const replay = document.getElementById("replay");
        replay.addEventListener("click", ( )=> {
            hide();
            //show selection
            selectBox.show();
            //empty grid
            grid.generateEmptyGrid();
            //reset players
            gamePlay.resetPlayersActive();
        });


    }

    return {showResults,hide};

})();

window.onload = ()=>{
    playBoard.addAttributeOnclickEventToEachSpan();
    gamePlay.createPlayers();
    grid.generateEmptyGrid();

    selectXBtn.onclick = ()=>{
        selectBox.hide();
        playBoard.show();

        gamePlay.setActivePalyer("X");

        const player = gamePlay.activePlayer();
        playBoard.switchPlayer(player);
    }

    selectOBtn.onclick = ()=>{
        selectBox.hide();
        playBoard.show();

        gamePlay.setActivePalyer("O");

        const player = gamePlay.activePlayer();
        playBoard.switchPlayer(player);
    }

}
