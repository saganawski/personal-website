$(document).ready(function(){

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

});