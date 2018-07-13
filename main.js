var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');  //get the component help you draw.

var width = canvas.width = window.innerWidth;  //the browser content width
var height = canvas.height = window.innerHeight; 

// function to generate random number between min and max

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
//Ball function like some kind of class or object
function Ball(){
	this.x = random(0,width);
	this.y = random(0,height);
	this.velX=random(-7,7);
	this.velY = random(-7,7);
	this.color = 'rgb(' + random(0,255)+',' + random(0,255)+',' + random(0,255)+')';
	this.size =random(10,20);
}

Ball.prototype.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x,this.y,this.size,0, 2*Math.PI); //弧形
	ctx.fill();
}

// when you add animation, it's will cover the static ball
var testBall = new Ball();
testBall.x
testBall.size
testBall.color;
testBall.draw();

Ball.prototype.update = function(){
	if((this.x + this.size)>=width){
		this.velX = -(this.velX);
	}

	if((this.x - this.size)<=0){
		this.velX = -(this.velX);
	}

	if((this.y + this.size) >= height){
		this.velY = -(this.velY);
	}

	if((this.y + this.size) <=0){
		this.velY = -(this.velY);
	}

	this.x +=this.velX;
	this.y +=this.velY;
}

Ball.prototype.collisionDetect = function(){
	for(j = 0; j< balls.length; j++){
		if( (!(this.x === balls[j].x && this.y ===balls[j].y && this.velX === balls[j].velX && this.velY === balls[j].velY))  ){
			var dx = this.x - balls[j].x;
			var dy = this.y - balls[j].y;
			var distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < this.size+ balls[j].size){
				balls[j].color = this.color ='rgb(' + random(0,255) +"," + random(0,255) +"," + random(0,255) + ")";
				/*balls[j].velX = -(balls[j].velX);
				this.velX = -(this.velX);

				balls[j].velY = -(balls[j].velY);
				this.velY = -(this.velY);*/
			}
		}
	}
}

var balls = [];

function loop(){
	ctx.fillStyle = 'rgba(0,0,0,0.25)';  //flush every time the balls move
	ctx.fillRect(0,0,width,height);

	while(balls.length <25){
		var ball = new Ball();
		balls.push(ball);
	}

	for(i=0; i < balls.length; i++){
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
	}

	window.requestAnimationFrame(loop);
}

loop();
