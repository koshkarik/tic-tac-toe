function fromNumbToDiff() {
	numPlayersMenu.classList.add("hidden");
	console.log(this);
	console.log(this.dataset.numb);
	if (this.dataset.numb === '1') {
		ticTac.playerNum = 1;
		diffMenu.classList.remove("hidden");
	} else {
		ticTac.playerNum = 2;
		gameMenu.classList.add("hidden");
		back.classList.remove("hidden");
		canvas.classList.remove("hidden");
		ticTac.on = true;
		ticTac.startGameLoop();
	}
}

function goSymblolChoice() {
	ticTac.on = true;
	diffMenu.classList.add("hidden");
	symbolChoice.classList.remove("hidden");

	if (this.dataset.diff === '0') {
		ticTac.difficulty = 0;
		console.log(0);
	} else if (this.dataset.diff === '1') {
		ticTac.difficulty = 1;
		console.log(1);
	} else if (this.dataset.diff === '2') {
		ticTac.difficulty = 2;
		console.log(2);
	}

}

function beginGame() {
	symbolChoice.classList.add("hidden");
	gameMenu.classList.add("hidden");
	canvas.classList.remove("hidden");
	back.classList.remove("hidden");

	if (this.dataset.symbol === 'x') {
		ticTac.playerSymbol = 'x';
		ticTac.startGameLoop();
		
	} else {
		ticTac.playerSymbol = 'o';
		ticTac.startGameLoop();
	}
}

function checkMouse(e) {
	if (ticTac.on) {
		ticTac.getMouseCoords(e);
	}
}

function whichGame() {

	if(ticTac.playerNum === 2) {
		ticTac.twoPlayerMove();
	}
	else if (ticTac.playerNum === 1) {
		ticTac.onePlayerGame();
	}
}

numPlayersButtons.forEach(btn => {
	btn.addEventListener("click", fromNumbToDiff);
});

diffButtons.forEach(btn => {
	btn.addEventListener("click", goSymblolChoice);
});

symbolChoiceButtons.forEach(btn => {
	btn.addEventListener("click", beginGame);
});

canvas.addEventListener("mousemove", checkMouse);
canvas.addEventListener("click", whichGame);
back.addEventListener("click", ticTac.backToMenu);






