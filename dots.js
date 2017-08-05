var head;
var food;
var extras = [];
var tail = [];
        
function spawnExtras() { 
    rx = Math.floor(Math.random()*30)*10;
      ry = Math.floor(Math.random()*30)*10;
      if(rx == head.getX() && ry == head.getY())
        spawnExtras();
else extras.push(new component(rx,ry,10,10));
  }

  function drawExtras() { 
    if(extras.length > 0)
        for(var i = 0; i < extras.length; i++)
            extras[i].draw();
  }

function start() {
    head = new component(0,0,10,10);
      spawnFood();
      interval = setInterval(updateGame, 200);
  }

  function component(x,y,w,h) {
    this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
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
        if(x < 0 || x > 290) {x -= velX; velX = 0;}
          document.getElementById('test').innerHTML = y;
          if(y < 0 || y > 290) {y -= velY; velY = 0;}
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
        addTail();
          spawnFood();
          spawnExtras();
      }
  }

  function addTail() { 
    tail.push(new component(head.getX(),head.getY(),10,10));
      document.getElementById('tail').innerHTML = tail.length;
  }

  function drawTail() {
    if(tail.length > 0)
        for(var i = 0; i < tail.length; i++)
            tail[i].draw();
  }

  function spawnFood() {
    rx = Math.floor(Math.random()*30)*10;
      ry = Math.floor(Math.random()*30)*10;
food = new component(rx,ry,10,10);
}

  function ouroboros() {
for(var i = 0; i < tail.length; i++) {
        if(zeroDistance(head, tail[i])) gameOver();
      }
  }

  function gameOver() {
    clearInterval(interval);
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
    eat();
    head.clear();
head.update();
      head.draw();
      food.draw();
      drawTail();
      drawExtras();
}
