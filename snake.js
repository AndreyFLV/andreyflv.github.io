var head;
var food;
//var extras = [];
var tail = [];
var scale = 25;

function moveSnek(vel) {
	switch(vel) {
	//up
	case 38: changeVelY(-10); 
	//document.getElementById('tail').innerHTML = "^^^ " + head.velY;
	break;

	//down
	case 40: changeVelY(10);
	//document.getElementById('tail').innerHTML = "!!! " + head.velY;
	break;

	//left
	case 37: changeVelX(-10);
	//document.getElementById('tail').innerHTML = "<<< " + head.velX;
	break;

	//right
	case 39: changeVelX(10);
	//document.getElementById('tail').innerHTML = ">>> " + head.velX;
	break;
    }
}

var board = {
	start : function() {
		canvas = document.getElementById('canvas');
		canvas.width = 250;
		canvas.height = 250;
		window.addEventListener('keydown', function(e) {
			moveSnek(e.keyCode);
		})
	}
}

function spawnExtras() { 
	rx = Math.floor(Math.random()*25)*10;
    	ry = Math.floor(Math.random()*25)*10;
    	if(rx == head.getX() && ry == head.getY())
		spawnExtras();
	else extras.push(new component(rx,ry,10,10));
}

function drawExtras() { 
	if(extras.length > 0)
	for(var i = 0; i < extras.length; i++)
		extras[i].draw();
}

function startGame() {
	board.start();
	head = new component(0,0,10,10);
    	spawnFood();
    	interval = setInterval(updateGame, 110);
}

function restartGame() {
	clearInterval(Interval);
	startGame();
}

function component(x,y,w,h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.setX = function(k) { x = k; }
	this.setY = function(k) { y = k; }
	this.getX = function() { return x; }
	this.getY = function() { return y; }
	this.velX = 0;
	this.velY = 0;
	this.setVelX = function(v) { 
	velX = v;
	velY = 0;
	}
    this.setVelY = function(v) { 
	velY = v;
	velX = 0;
    }
    this.update = function() {
	document.getElementById('demo').innerHTML = x;
	if(x < 0 || x > 240) {x -= velX; velX = 0;}
	document.getElementById('test').innerHTML = y;
	if(y < 0 || y > 240) {y -= velY; velY = 0;}
	x += velX;
	y += velY;
    }
    this.draw = function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctx.fillStyle = 'rgb(50,150,75)';
	ctx.fillRect(x,y,w,h);
		}
    this.clear = function() { 
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctx.clearRect(0,0,canvas.width,canvas.height);
    }
}

function changeVelX(v) { head.setVelX(v); }
function changeVelY(v) { head.setVelY(v); }

function eat() { 
	dx = Math.floor(Math.abs(food.getX()-head.getX()));
    	dy = Math.floor(Math.abs(food.getY()-head.getY()));
    if(dx < 10 && dy < 10) {
	    for(var i = 0; i < 6; i++) { addTail(); }
	spawnFood();
	//spawnExtras();
    }
}

function addTail() { 
	if(tail.length == 0)
		tail.push(new component(head.getX(),head.getY(),10,10));
    	else {tail.push(new component
		(tail[tail.length-1].getX(),
    		tail[tail.length-1].getY(),10,10));
    		document.getElementById('tail').innerHTML = tail.length;
    }
}

function updateTail() {
	if(tail.length > 0) {
	if(tail.length > 1) {
		for(var i = 1; i < tail.length; i++) {
					tail[tail.length-i].setX(tail[tail.length-i-1].getX());
		tail[tail.length-i].setY(tail[tail.length-i-1].getY());
				}
	}
	tail[0].setX(head.getX());
	tail[0].setY(head.getY());
    }
}

function drawTail() {
	if(tail.length > 0)
	for(var i = 0; i < tail.length; i++) 
		tail[i].draw();
}

function spawnFood() {
	rx = Math.floor(Math.random()*25)*10;
    ry = Math.floor(Math.random()*25)*10;
		food = new component(rx,ry,10,10);
	}

function ouroboros() {
		for(var i = 0; i < tail.length; i++) {
	if(zeroDistance(head, tail[i])) gameOver();
    }
}

function gameOver() {
	clearInterval(interval);
	tail = [];
	document.getElementById('tail').innerHTML = "GAMEOVER";
}

function zeroDistance(a, b) {
	dx = Math.floor(Math.abs(a.getX() - b.getX()));
    dy = Math.floor(Math.abs(a.getY() - b.getY()));
    if(dx < 10 && dy < 10) return true;
    else return false;
}

function updateGame() {
	ouroboros();
    head.clear();
    updateTail();
	eat();
		head.update();
    head.draw();
    food.draw();
    drawTail();
    //drawExtras();
}
