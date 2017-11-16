var canvas=document.getElementById("game");
var context=canvas.getContext("2d");
//定义板初始属性值
var board = {
	imagePath : "board.png",
	x : 130,
	y : 120,
	boardSpeed : 5,
	shouldLeft : false,
	shouldRight : false,
}
//定义球初始属性值
var ball = {
	imagePath : "ball.png",
	x : 145,
	y : 112,
	speedX : 4,
	speedY : 4,
	shouldBallMove: false
}
//定义砖块初始属性值
var block ={
	x : 120,
	y : 30,
	imagePath : "block.png",
	grade : 0
}
//生成Game对象
function Game(board,ball,block){

}
//将方法写入原型便于复用
Game.prototype={
	constructor : Game,
	gameIsLife : true ,
	gameOverImgPath : "gameover.png",
	boardX : board.x ,
	boardY : board.y ,
	ballX : ball.x,
	ballY : ball.y,
	blockX : block.x,
	blockY : block.y,
	grade : block.grade,
	//游戏结束时初始化游戏
	gameIntial : function (){
		Game.prototype.gameIsLife = true ;
		Game.prototype.boardX = board.x ;
		Game.prototype.boardY = board.y ;
		Game.prototype.ballX = ball.x;
		Game.prototype.ballY = ball.y;
		Game.prototype.blockX = block.x;
		Game.prototype.blockY = block.y;
		Game.prototype.grade = block.grade;
		Game.prototype.ballStop();
		var gradeBoard = document.getElementById("grade");
			gradeBoard.innerHTML = "0";
	},
	//判断游戏是否结束
	gameIsOver : function (){
		if(Game.prototype.ballY > 150){
			Game.prototype.gameIsLife = false ;
		}
	},
	//根据给定范围生成对应区间的随机整数
	getRondomNub : function (max,min){
		var Range = max - min;
      	var Rand = Math.random();
      	var num = min + Math.floor(Rand * Range); 
      	return num;
	},
	//在canvas中绘制对应图像
	draw : function(img,x,y){
		context.drawImage(img,x,y);
	},
	//清除canvas中图像
	clearRect : function(){
		context.clearRect(0,0,400,400);
	},
	//根据给定的路径生产对应的图像对象
	imageFromPath : function (path) {
		var img = new Image();
		img.src = path;
		return img;
	},
	//修改shouldLeft值以至于让板可以向左移动
	boardCanMoveLeft : function(){
		board.shouldLeft = true;
	},
	//对板判断位置后再向左进行移动以避免板出界
	boardMoveLeft : function(){
		if(board.shouldLeft && Game.prototype.boardX > 0 ){
			Game.prototype.boardX -= board.boardSpeed;
		}
	},
	//修改shouldRight值以至于让板可以向左移动
	boardCanMoveRight : function (){
		board.shouldRight = true;
	},
	//对板判断位置后再向右进行移动以避免板出界
	boardMoveRight : function (){
		if(board.shouldRight && Game.prototype.boardX < 260){
			Game.prototype.boardX += board.boardSpeed;
		}
	},
	//通过绑定KeyUp事件改变shouldLeft值实现板的正常位移
	boardStopMoveLeft : function(){
		board.shouldLeft = false;
	},
	//通过绑定KeyUp事件改变shouldRight值实现板的正常位移
	boardStopMoveRight : function(){
		board.shouldRight = false;
	},
	ballCanMove : function(){
		ball.shouldBallMove = true;
	},
	ballStop : function (){
		ball.shouldBallMove = false;
	},
	//球发生碰撞时实现反弹
	ballReboundX : function(){
		ball.speedX = -ball.speedX;
	},
	ballReboundY : function(){
		ball.speedY = -ball.speedY;
	},
	//判断球和板的位置关系并处理
	collisionByBorad : function(){
		var rightBoundary = Game.prototype.boardX + 40;
		var topBoundary = Game.prototype.ballY - Game.prototype.boardY + 5;
		if((Game.prototype.ballX + 5) > Game.prototype.boardX && Game.prototype.ballX < rightBoundary && topBoundary > 0 && topBoundary < 3)
			Game.prototype.ballReboundY();
	},
	//判断球是否可以移动并将其限制在CANVAS区域内
	ballMove : function(){
		if(ball.shouldBallMove){
			Game.prototype.collisionByBorad();
			if(Game.prototype.ballX < 0 || Game.prototype.ballX > 265){
				Game.prototype.ballReboundX();
			}
			if(Game.prototype.ballY< 0){
				Game.prototype.ballReboundY();
			}
			Game.prototype.ballX -= ball.speedX;
			Game.prototype.ballY-= ball.speedY;
		}
	},
	//判断砖块是否被击打并进行生产下一块砖块的动作
	isBlockDie : function(){
		var blockRightBoundary = Game.prototype.blockX + 40;
		var blockTopBoundary = Game.prototype.blockY -Game.prototype. ballY ;
		if((Game.prototype.ballX + 5 ) > Game.prototype.blockX && Game.prototype.ballX < blockRightBoundary && blockTopBoundary > 0 && blockTopBoundary < 3){
			Game.prototype.ballReboundY();
			Game.prototype.blockX= Game.prototype.getRondomNub(200,0);
			var gradeBoard = document.getElementById("grade");
			Game.prototype.grade ++ ;
			gradeBoard.innerHTML = Game.prototype.grade;

		}
	},
	//刷新函数，让游戏以三十帧的码率进行正常渲染
	refresh : function(){
		setInterval(function(){
			Game.prototype.gameIsOver();
			if(Game.prototype.gameIsLife){
				Game.prototype.isBlockDie();
				Game.prototype.boardMoveLeft();
				Game.prototype.boardMoveRight();
				Game.prototype.ballMove();
				Game.prototype.clearRect();
				var blockImg=Game.prototype.imageFromPath(block.imagePath);
				var boardImg=Game.prototype.imageFromPath(board.imagePath);
				var ballImg=Game.prototype.imageFromPath(ball.imagePath);
				Game.prototype.draw(boardImg,Game.prototype.boardX,Game.prototype.boardY);
				Game.prototype.draw(ballImg,Game.prototype.ballX,Game.prototype.ballY);
				Game.prototype.draw(blockImg,Game.prototype.blockX,Game.prototype.blockY);
			}else{
				Game.prototype.clearRect();
				var gameoverImg=Game.prototype.imageFromPath(Game.prototype.gameOverImgPath);
				Game.prototype.draw(gameoverImg,50,0);
			}
		},1000/30)
	}
};
//绑定Keydown的S键事件令游戏开始
EventUtil.addHandler(window,"keydown",function(event){
	var k=event.key;
	if(k == "s"){
		game.ballCanMove();
		EventUtil.addHandler(window,"keydown",function(event){
			var k=event.key;
			if(k == "a"){
				game.boardCanMoveLeft();
			}else if(k == "d"){
			game.boardCanMoveRight();
			}
		});
		EventUtil.addHandler(window,"keyup",function(event){
			var k=event.key;
			if(k == "a"){
				game.boardStopMoveLeft();
			}else if(k == "d"){
				game.boardStopMoveRight();
			}
		});
	}
});
//绑定Keydown的R键事件来进行游戏初始化
EventUtil.addHandler(window,"keydown",function(event){
	var k=event.key;
	if(!game.gameIsLife){
		if(k == "r"){
			game.gameIntial();
		}
	}
});
var game = new Game(board,ball,block);
function GameStar(game){
	game.refresh();
}
GameStar(game);