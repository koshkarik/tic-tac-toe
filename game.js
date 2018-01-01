function Game() {
	this.numTurn = 0;
	this.fc = 0;
	this.difficulty;
	this.boardLength = 3;
	this.sectionSize = canvas.width / this.boardLength;
	this.on = false;
	this.gameLoop;
	this.difficulty; // can be easy, medium, hard
	this.playerNum; //can be one or two;
	this.playerSymbol; //can be one = x, can be two = o
	this.map = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	this.mouseX;
	this.mouseY;
	this.playerOneTurn = true;
	this.arrayIndex;
	this.player1 = 1;
	this.player2 = 2;
	this.winningLineFrom = [];
	this.winningLineTo = [];
	this.endOfRound = false;
	this.winningLineCurPosX;
	this.winningLineCurPosY;
	this.winningLineSpeed = 12;
	this.endFlag = false;
	this.tie = false;
	this.aiTurn = false;
	this.playerTurn = true;
	const obj = this;
	this.tieC = 0;
	this.middle = 4; 
	this.corners = [0, 2, 6, 8];
	this.restMoves = [1, 3, 5, 7];
	this.whoFirst = 'player';
	this.beginOfGame = true;

	this.drawGameBoard = function() {
		drawBoard();
		drawLines(10, '#B56969');
	}

	this.backToMenu = function() {
		this.endFlag = false;
		this.tie = false;
		this.aiTurn = false;
		this.playerTurn = true;
		obj.clear();
		obj.aiTurn = false;
		obj.playerSymbol = undefined;
		gameInfo.textContent = "Player Turn";
		setTimeout(function(){
		obj.gameLoop = clearInterval(obj.gameLoop);
		canvas.classList.add("hidden");
		gameMenu.classList.remove("hidden");
		numPlayersMenu.classList.remove("hidden");
		back.classList.add("hidden");
		gameInfo.classList.add("hidden");

	}, 1000 / 30);
		
	}

	this.changeInfo = function() {
		if (gameInfo.classList.contains("hidden")) {
			gameInfo.classList.remove("hidden");
		}
		if (this.tie) {
			gameInfo.textContent = "DRAW";
		}
		if (this.playerNum === 2) {
			if (!this.endFlag && this.playerOneTurn && !this.tie) {
			gameInfo.textContent = "Player 1 turn";
		}
		else if (!this.endFlag && !this.playerOneTurn && !this.tie) {
			gameInfo.textContent = "Player 2 turn";
		}
		else if (this.endFlag && !this.playerOneTurn && !this.tie) {
			gameInfo.textContent = "Player 1 win";
		}
		else if (this.endFlag && this.playerOneTurn && !this.tie) {
			gameInfo.textContent = "Player 2 win";
		}
		}
		

	}

	this.clear = function() {

		this.map = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		this.endFlag = false;
		this.endOfRound = false;
		this.winningLineCurPosX = undefined;
		this.winningLineCurPosY = undefined;
		this.exp = false;
		this.tie = false;
		this.tieC = 0;
		this.numTurn = 0;
		
		if (obj.playerNum === 1) {

			this.changeFirstMove();
			obj.beginOfGame = true;
		}
		

		
		

	}

	this.twoInLine = function(line, symb) {
      let ind = -1;
      let linePieces = [];
      line.forEach(index => {
      	if (obj.map[index] === symb) {
      		linePieces.push(index);
      	}
      	if (obj.map[index] === 0) {
      		ind = index;
      	}
      });
  
      if (linePieces.length === 2 && ind >= 0) {

      	obj.aiMove = ind;
      	return true;
      }
	}

	this.checkLines = function(symb) {
	
		let lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
		lines.forEach(line => {
			obj.twoInLine(line, symb)
			
		});
	}

	this.makeGame = function() {

		if (!obj.tieC) {
			this.on = true;
			obj.drawGameBoard();
			obj.draw();
		}
		if (obj.beginOfGame && obj.aiTurn && obj.playerNum === 1) {
			obj.beginOfGame = false;
			obj.onePlayerGame();
		}
		
			obj.changeInfo();

		
		
		if (obj.endFlag) {
			
			obj.moveWinningLine();
			
			if (obj.winningLineCurPosX >= obj.winningLineTo[0] && obj.winningLineCurPosY >= obj.winningLineTo[1]) {
				drawWinningLine(obj.winningLineFrom[0], obj.winningLineFrom[1], obj.winningLineCurPosX, obj.winningLineCurPosY);
				setTimeout(function(){
					obj.clear();
					
				}, 10);
				
			} else if (obj.exp && obj.winningLineCurPosX >= obj.winningLineTo[0] && obj.winningLineCurPosY <= obj.winningLineTo[1]) {
				drawWinningLine(obj.winningLineFrom[0], obj.winningLineFrom[1], obj.winningLineCurPosX, obj.winningLineCurPosY);
				setTimeout(function(){
					obj.clear();
					//obj.beginOfGame = true;
				}, 10);
			}
			else {
				drawWinningLine(obj.winningLineFrom[0], obj.winningLineFrom[1], obj.winningLineCurPosX, obj.winningLineCurPosY);
				//obj.beginOfGame = true;
			}
		}
		if (obj.tie) {
			obj.tieDraw();
			if (obj.tieC < 400) {
			
				drawTieBoard(0, 0, obj.tieC, obj.tieC);
			} else {
				obj.clear();
				//obj.beginOfGame = true;
			}
			// setTimeout(function() {
			// 	obj.clear();
			// }, 1000);
		}
		

	}

	this.moveWinningLine = function() {
		if (this.winningLineCurPosX === undefined) {
			this.winningLineCurPosX = this.winningLineFrom[0];
		}
		if (this.winningLineCurPosY === undefined) {
			this.winningLineCurPosY = this.winningLineFrom[1];
		}
		if (this.winningLineCurPosX < this.winningLineTo[0]) {
			this.winningLineCurPosX += this.winningLineSpeed;
		}
		if (this.winningLineCurPosY < this.winningLineTo[1]) {
			this.winningLineCurPosY += this.winningLineSpeed;
		}
		if (this.exp && this.winningLineCurPosY > this.winningLineTo[1]) {
			this.winningLineCurPosY -= this.winningLineSpeed;
		}
	}

	this.tieDraw = function() {
		if (this.tieC < canvas.height) {
			this.tieC += this.winningLineSpeed;
		}
	}

	this.indexFromXy = function(x, y) {
		return x * this.boardLength + y;
	}

	this.indexFromMouseCoords = function() {
		let x = Math.floor(obj.mouseX / obj.sectionSize);
		let y = Math.floor(obj.mouseY / obj.sectionSize);
		return this.indexFromXy(y, x);
	}

	this.draw = function() {
		for (let y = 0; y < 3; y++) {
			for (let x = 0; x < 3; x++) {
				let index = this.indexFromXy(y, x);

				if (obj.map[index] === 2) {
					drawO(x * obj.sectionSize, y * obj.sectionSize);
				} else if (obj.map[index] === 1) {
					drawX(x * obj.sectionSize, y * obj.sectionSize);
				}
			}
		}
	}


	this.startGameLoop = function() {
		this.gameLoop = setInterval(obj.makeGame, 1000 / fps);
	}

	this.getMouseCoords = function(e) {
		if (this.on) {
			let rect = canvas.getBoundingClientRect();
			this.mouseX = e.clientX - rect.left;
			this.mouseY = e.clientY - rect.top;
			this.arrayIndex = this.indexFromMouseCoords();
		}
		
	}

	this.onePlayerGame = function() {
		
		if (!obj.aiTurn && obj.map[obj.arrayIndex] === 0 && !obj.endOfRound) {
			
			if (this.playerSymbol === 'x') {
				obj.map[obj.arrayIndex] = 1;
				if (obj.winning(1)) {
					obj.endOfRound = true;
					gameInfo.textContent = "Player WIN";
					//obj.changeFirstMove();
					return;
				}
				
			} else if (this.playerSymbol === 'o') {
				obj.map[obj.arrayIndex] = 2;
				if (obj.winning(2)) {
					obj.endOfRound = true;
					gameInfo.textContent = "Player WIN";
					//obj.changeFirstMove();
					return;
				}
			}
			gameInfo.textContent = "AI turn";
			obj.aiTurn = !obj.aiTurn;
			obj.numTurn++;
			

	}		
		if (obj.aiTurn) {
			if (this.difficulty === 0) {
					if (this.playerSymbol === 'x') {
						this.easyGame(2,'easy');
					} else {
						this.easyGame(1, 'easy');
					}
				if (!obj.endOfRound){
					obj.aiTurn = !obj.aiTurn;
				}
		
			} else if (this.difficulty === 1) {
				if (this.playerSymbol === 'x') {
						
						this.easyGame(2, 'medium');
					} else {
						
						this.easyGame(1, 'medium');
					}
				if (!obj.endOfRound){
					obj.aiTurn = !obj.aiTurn;
				}
			} else if (this.difficulty === 2) {
				if (this.playerSymbol === 'x') {
					console.log(this.playerSymbol + '!!!!!!');
						this.humanPlayer = 1;
						this.aiPlayer = 2;
						this.hardGame(obj.aiPlayer);
						obj.numTurn++;
					} else {
						console.log(this.playerSymbol + '§11111');
						this.humanPlayer = 2;
						this.aiPlayer = 1;
						this.hardGame(obj.aiPlayer);
						obj.numTurn++;
					}
				if (!obj.endOfRound){
					obj.aiTurn = !obj.aiTurn;
				}
			}
		}

	}	

	this.miniMaxWinning = function(board, player){
 if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else {
        return false;
    }

}

    this.availSpots = function(board) {
    	let availInd = [];
    	board.forEach(function(spot, index) {
    		if (spot === 0) {
    			availInd.push(index);
    		}
    	});
    	return availInd;
    }


	this.minMax = function(board, player) {
		let freeSpots = obj.availSpots(board);
		obj.fc++;
		//console.log(obj.fc);
		if (obj.miniMaxWinning(board, obj.aiPlayer)) {
			return {score: 10};
		} else if (obj.miniMaxWinning(board, obj.humanPlayer)) {
			return {score: -10};
		} else if (freeSpots.length === 0) {
			return {score: 0};
		}

		let moves = [];

		for (let i = 0; i < freeSpots.length; i++) {
			
				var move = {};
				move.index = freeSpots[i];
				board[freeSpots[i]] = player;

				if (player === obj.aiPlayer) {
					let result = obj.minMax(board, obj.humanPlayer);
					move.score = result.score;
				} else {
					let result = obj.minMax(board, obj.aiPlayer);
					move.score = result.score;
				}
				board[freeSpots[i]] = 0;
				moves.push(move);
			
		}
		let bestMove;

		if (player === obj.aiPlayer) {
			let bestScore = -10000;
			for (let j = 0; j < moves.length; j++) {
				if (moves[j].score > bestScore) {
					bestScore = moves[j].score;
					bestMove = j;
				}
			}
		} else {
			let bestScore = 10000;
			for (let j = 0; j < moves.length; j++) {
				if (moves[j].score < bestScore) {
					bestScore = moves[j].score;
					bestMove = j;
				}
			}
		}
		console.log(moves);
		return moves[bestMove];
	}

	this.changeFirstMove = function() {
		if (obj.whoFirst !== undefined && obj.whoFirst === 'player') {
			obj.whoFirst = 'ai';
			obj.aiTurn = true;
			gameInfo.textContent = "AI turn";
		} else if (obj.whoFirst !== undefined && obj.whoFirst === 'ai') {
			gameInfo.textContent = "Player turn";
			obj.whoFirst = 'player';
			obj.aiTurn = false;
		}
	
	}
	this.hardGame = function(symb) {
		if (obj.numTurn < 2) {
			obj.easyGame(symb, 'medium');
		}
		else {
			let board = obj.map.slice();
			console.log(board);
			let turnInd = this.minMax(board, obj.aiPlayer).index;
			console.log(turnInd);
			setTimeout(function() {
				gameInfo.textContent = "Player turn";
				obj.map[turnInd] = symb;
				 if (obj.winning(symb)) {
				 	gameInfo.textContent = "AI WIN";
				 	obj.endOfRound = true;
				 	//obj.changeFirstMove();
			 	
			 }
		}, 500);
		}
		
	}

	this.easyGame = function(symb, dif) {
		let playerSymb;
		if(symb === 1) {
			playerSymb = 2;
		} else if (symb === 2) {
			playerSymb = 1;
		}
		if (dif === 'medium') {
			obj.checkLines(playerSymb);
			obj.checkLines(symb);
		}
		if (dif === 'easy') {
			//obj.checkLines(symb);
			obj.checkLines(playerSymb);
		}
		
		let availableCorners = [];
		let availableRestMoves = [];
		obj.corners.forEach(corner => {
			if (obj.map[corner] === 0) {
				availableCorners.push(corner);
			}
		});
		obj.restMoves.forEach(restMove => {
			if (obj.map[restMove] === 0) {
				availableRestMoves.push(restMove);
			}
		});
		setTimeout(function() {
			gameInfo.textContent = "Player turn";
			if (obj.aiMove !== undefined) {
			
				obj.map[obj.aiMove] = symb;
				obj.aiMove = undefined;
			}

			  else if (obj.map[obj.middle] === 0) {
				obj.map[obj.middle] = symb;
			} else if (availableCorners.length > 0) {
				let numb = availableCorners.length;
				let choice = Math.floor(Math.random() * numb);
				obj.map[availableCorners[choice]] = symb;
			} 
			 else {
			 	let numb = availableRestMoves.length;
			 	let choice = Math.floor(Math.random() * numb);
			 	obj.map[availableRestMoves[choice]] = symb;
			 }
			 if (obj.winning(symb)) {
			 	gameInfo.textContent = "AI WIN";
			 	obj.endOfRound = true;
			 	//obj.changeFirstMove();
			 	
			 }
		}, 500);
		
		return;
	}
	

	this.twoPlayerMove = function() {
		if(obj.playerOneTurn && obj.map[obj.arrayIndex] === 0 && !obj.endOfRound) {
			obj.map[obj.arrayIndex] = 1;
			obj.playerOneTurn = !obj.playerOneTurn;
			if (obj.winning(obj.player1)) {
				console.log('player 1 wins!!!!!!!!!!');
				obj.endOfRound = true;
			}
		} else if (!obj.playerOneTurn && obj.map[obj.arrayIndex] === 0 && !obj.endOfRound) {
			obj.map[obj.arrayIndex] = 2;
			obj.playerOneTurn = !obj.playerOneTurn;
			if (obj.winning(obj.player2)) {
				console.log('player 2 wins!!!!!!!!!!');
				obj.endOfRound = true;
			}
		}
	}

	this.winning = function(player) {
		if (this.map[0] === player && this.map[1] === player && this.map[2] === player) {
			this.winningLineFrom = [0 * obj.sectionSize + obj.sectionSize / 2, 0 * obj.sectionSize + obj.sectionSize / 2];
			this.winningLineTo = [2 * obj.sectionSize + obj.sectionSize / 2, 0 * obj.sectionSize + obj.sectionSize / 2];
			this.endFlag = true;
			//obj.changeFirstMove();
			return true;
		}
		else if (this.map[3] === player && this.map[4] === player && this.map[5] === player) {
			this.winningLineFrom = [0 * obj.sectionSize + obj.sectionSize / 2, 1 * obj.sectionSize + obj.sectionSize / 2];
			this.winningLineTo = [2 * obj.sectionSize + obj.sectionSize / 2, 1 * obj.sectionSize + obj.sectionSize / 2];
			this.endFlag = true;
			//obj.changeFirstMove();
			return true;
		}
		else if (this.map[6] === player && this.map[7] === player && this.map[8] === player) {
			this.winningLineFrom = [0 * obj.sectionSize + obj.sectionSize / 2, 2 * obj.sectionSize + obj.sectionSize / 2];
			this.winningLineTo = [2 * obj.sectionSize + obj.sectionSize / 2, 2 * obj.sectionSize + obj.sectionSize / 2];
			this.endFlag = true;
			
			return true;
		}
		else if (this.map[0] === player && this.map[3] === player && this.map[6] === player) {
			this.winningLineFrom = [0 * obj.sectionSize + obj.sectionSize / 2, 0 * obj.sectionSize + obj.sectionSize / 2];
			this.winningLineTo = [0 * obj.sectionSize + obj.sectionSize / 2, 2 * obj.sectionSize + obj.sectionSize / 2];
			this.endFlag = true;
			//obj.changeFirstMove();
			return true;
		}
		else if (this.map[1] === player && this.map[4] === player && this.map[7] === player) {
			this.winningLineFrom = [1 * obj.sectionSize + obj.sectionSize / 2, 0 * obj.sectionSize + obj.sectionSize / 2];
			this.winningLineTo = [1 * obj.sectionSize + obj.sectionSize / 2, 2 * obj.sectionSize + obj.sectionSize / 2];
			this.endFlag = true;
			//obj.changeFirstMove();
			return true;
		}
		else if (this.map[2] === player && this.map[5] === player && this.map[8] === player) {
			this.winningLineFrom = [2 * obj.sectionSize + obj.sectionSize / 2, 0 * obj.sectionSize + obj.sectionSize / 2];
			this.winningLineTo = [2 * obj.sectionSize + obj.sectionSize / 2, 2 * obj.sectionSize + obj.sectionSize / 2];
			this.endFlag = true;
			//obj.changeFirstMove();
			return true;
		}
		else if (this.map[0] === player && this.map[4] === player && this.map[8] === player) {
			this.winningLineFrom = [0 * obj.sectionSize + obj.sectionSize / 2, 0 * obj.sectionSize + obj.sectionSize / 2];
			this.winningLineTo = [2 * obj.sectionSize + obj.sectionSize / 2, 2 * obj.sectionSize + obj.sectionSize / 2];
			this.endFlag = true;
			//obj.changeFirstMove();
			return true;
		}
		else if (this.map[2] === player && this.map[4] === player && this.map[6] === player) {
			
			this.winningLineFrom = [0 * obj.sectionSize + obj.sectionSize / 2, 2 * obj.sectionSize + obj.sectionSize / 2];
			this.winningLineTo =   [2 * obj.sectionSize + obj.sectionSize / 2, 0 * obj.sectionSize + obj.sectionSize / 2];
			this.exp = true;
			this.endFlag = true;
			//obj.changeFirstMove();
			return true;
		} 
		else if (this.map.indexOf(0) === -1) {
		
			this.tie = true;
			//obj.changeFirstMove();
		}
		else {
			return false;
		}
	}








 
}

var ticTac = new Game();