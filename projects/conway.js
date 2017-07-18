$(document).ready(function(){

	var Game = function(board){
		this.board = board;
	};

	Game.prototype.tick = function(){
		nextRoundLiveCells = [];
		nextRoundDeadCells = [];

		for (var i = this.board.cellGrid.length - 1; i >= 0; i--) {
			for (var j = this.board.cellGrid[i].length - 1; j >= 0; j--) {
				var cell = this.board.cellGrid[i][j]
				var liveNeighborsCount = this.board.liveNeighbors(cell).length

				// rule 1
    		//   	any live cell with fewer then two live neighbors dies

    		if (cell.alive === true && liveNeighborsCount < 2) {
    			nextRoundDeadCells.push(cell);
    		};

    		// rule 2
    		// any live cell with two or three live neighbors lives on to the next generation
    		if (cell.allive === true && liveNeighborsCount === 2 || liveNeighborsCount === 3) {
    			nextRoundLiveCells.push(cell);
    		};

    		// rule 3
    		//  any live cell with more than 3 live neighbors dies

    		if (cell.alive === true && liveNeighborsCount > 3) {
    			nextRoundLiveCells.push(cell);
    		};

    		// Rule 4
    		//  any dead cell with exactly three live neighbors becomes alive
    		if (cell.alive === false && liveNeighborsCount === 3) {
    			nextRoundLiveCells.push(cell)
    		};
			};
		};

		for (var i = nextRoundLiveCells.length - 1; i >= 0; i--) {
			nextRoundLiveCells[i].revive();
		}

		for (var i = nextRoundDeadCells.length - 1; i >= 0; i--) {
			nextRoundDeadCells[i].kill();
		}
	};

	var Board = function(rows,cols){
		this.rows = rows;
		this.cols = cols;
		this.cellGrid = new Array(rows);
		// creates 2d grid
		for (var i = this.cellGrid.length - 1; i >= 0; i--) {
			this.cellGrid[i] = new Array(cols);
		};
		// populates 2d grid
		// TODO look into refactoring into the creation of the the 2d array
		for (var i = this.cellGrid.length - 1; i >= 0; i--) {
			for (var j = this.cellGrid[i].length - 1; j >= 0; j--) {
				this.cellGrid[i][j] = new Cell(i,j);
			};
			
		};
	};

	Board.prototype.liveNeighbors = function(cell){
		liveNeighborsArray = []

		// neighbor to the north
		if(cell.y > 0){
			canidate = this.cellGrid[cell.y - 1][cell.x];
			if(canidate.alive === true){
				liveNeighborsArray.push(canidate);
			};
		};

		// neighbor to the south
		if(cell.y < this.rows - 1){
			canidate = this.cellGrid[cell.y + 1][cell.x]
			if(canidate.alive === true){
				liveNeighborsArray.push(canidate);
			};
		};

		// neighbor to the east
		if(cell.x < this.cols - 1){
			canidate = this.cellGrid[cell.y][cell.x + 1]
			if(canidate.alive === true){
				liveNeighborsArray.push(canidate);
			};
		};

		// neighbor to the west
		if (cell.x >0) {
			canidate = this.cellGrid[cell.y][cell.x -1]
			if(canidate.alive === true){
				liveNeighborsArray.push(canidate);
			};
		};

		//  neighbor to the north east
		if (cell.y > 0 && cell.x < this.cols - 1) {
			canidate = this.cellGrid[cell.y - 1][cell.x + 1]
			if(canidate.alive === true){
				liveNeighborsArray.push(canidate);
			};
		};

		// neighbor to the north west
		if (cell.y > 0 && cell.x > 0) {
			canidate = this.cellGrid[cell.y - 1][cell.x - 1]
			if(canidate.alive === true){
				liveNeighborsArray.push(canidate);
			};
		};

		// neighbor to teh south east
		if (cell.y < this.rows - 1 && cell.x < this.cols -1) {
			canidate = this.cellGrid[cell.y + 1][cell.x + 1]
			if(canidate.alive === true){
				liveNeighborsArray.push(canidate);
			};
		};

		// neighbor to the south west
		if (cell.y < this.rows - 1 && cell.x > 0) {
			canidate = this.cellGrid[cell.y + 1][cell.x - 1]
			if(canidate.alive === true){
				liveNeighborsArray.push(canidate);
			};
		};

		return liveNeighborsArray
	};

	Board.prototype.randomolyPopulate = function(){
		tfArray = [true, false];
		// var rand = tfArray[Math.floor(Math.random() * tfArray.length)]

		for (var i = this.cellGrid.length - 1; i >= 0; i--) {
			for (var j = this.cellGrid[i].length - 1; j >= 0; j--) {
				this.cellGrid[i][j].alive = tfArray[Math.floor(Math.random() * tfArray.length)];
			};		
		};
	};

	Board.prototype.liveCount = function(game){
		liveCountArray = []
		for (var i = game.board.cellGrid.length - 1; i >= 0; i--) {
			for (var j = game.board.cellGrid[i].length - 1; j >= 0; j--) {
				if(game.board.cellGrid[i][j].alive === true){
					liveCountArray.push(game.board.cellGrid[i][j]);
				};
			};
		};
		return liveCountArray.length
	};

	Board.prototype.display = function(game){
		// remove class from all 
		for (i = 0; i < game.board.length; i++){
			$('.' + i + '').removeClass('active')
		}
		// If cell alive find html grid add active class to display 
		for (var i = game.board.cellGrid.length - 1; i >= 0; i--) {
			for (var j = game.board.cellGrid[i].length - 1; j >= 0; j--) {
				cell = game.board.cellGrid[i][j]
				if (cell.alive) {
					$('#' + cell.x + '').find('.' + cell.y + '').addClass('active')
				}
			};
			
		};
	}

	var Cell = function(x,y){
		this.alive = false;
		this.x = x;
		this.y = y;
	};
	// checks if its alive
	Cell.prototype.alive = function(){
		this.alive;
	};
	// kills cel
	Cell.prototype.kill =function(){
		this.alive = false;
	};
	// revies cell
	Cell.prototype.revive = function(){
		this.alive = true;
	};
// starts a new game 
board = new Board(10,10);
game = new Game(board);

game.board.randomolyPopulate();
// delays tick
var counter = 0;
var i = setInterval(function(){
    game.board.display(game);
		game.tick();
		console.log(counter)
    counter++;
    if(counter === 10) {
        clearInterval(i);
    }
	}, 1000);


});