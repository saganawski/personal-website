$(document).ready(function(){

	var Board = function(rows,cols){
		this.rows = rows;
		this.cols = cols;
		this.cellGrid = new Array(rows);
		// creates 2d grid
		for (var i = this.cellGrid.length - 1; i >= 0; i--) {
			this.cellGrid[i] = new Array(cols);
			console.log(i)
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
		if(cell.x < cols - 1){
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
		if (cell.y > 0 && cell.x < cols - 1) {
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
		if (cell.y < this.rows - 1 && cell.x < cols -1) {
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

		return liveNeighbors
	};

	Board.prototype.randomolyPopulate = function(){
		tfArray = [true, false];
		var rand = tfArray[Math.floor(Math.random() * tfArray.length)]

		for (var i = this.cellGrid.length - 1; i >= 0; i--) {
			for (var j = this.cellGrid[i].length - 1; j >= 0; j--) {
				this.cellGrid[i][j].alive = rand;
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
		for (i = 0; i < 10; i++){
			$('.' + i + '').removeClass('active')
		}
		// If cell alive find html grid add active class to display 
		for (var i = game.board.cellGrid.length - 1; i >= 0; i--) {
			for (var i = game.board.cellGrid[i].length - 1; i >= 0; i--) {
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


// cell = new Cell(5,10);
// console.log(cell.x);
// console.log(cell.y);
// cell.revive();
// console.log(cell.alive);
// cell.kill();
// console.log(cell.alive)

// board = new Board(3,3)
// console.log(board.cellGrid)
// console.log(board.cellGrid[2][0])
// console.log(board.cellGrid[1][1])



});