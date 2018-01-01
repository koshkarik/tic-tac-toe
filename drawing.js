const sectionSize = 400 / 3;

function drawBoard() {
	ctx.fillStyle = "#22264B";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

}
function drawTieBoard(x, y, finalX, finalY) {
	ctx.fillStyle = "#22264B";
	ctx.fillRect(x, y, finalX, finalY);

}

function drawLines(width, style) {
	let firstCoordOfLine = sectionSize;
	let paddingOfLine = 20;
	ctx.lineWidth = width;
	ctx.strokeStyle = style;
	ctx.lineCap = 'round';
	ctx.beginPath();

	//horizontal lines
	for (let i = 1; i <= 2; i++) {
		ctx.moveTo(paddingOfLine, firstCoordOfLine * i);
		ctx.lineTo(canvas.width - paddingOfLine, firstCoordOfLine * i);
	}

	//vertical lines
	for (let i = 1; i<= 2; i++) {
		ctx.moveTo(firstCoordOfLine * i, paddingOfLine);
		ctx.lineTo(firstCoordOfLine * i, canvas.width - paddingOfLine);
	}

	ctx.stroke();
}

function drawO(xCord, yCord) {
	let halfSquare = (sectionSize) / 2;
	let centerX = xCord + halfSquare;
	let centerY = yCord + halfSquare;
	let radius = (sectionSize - 80) / 2;
	let startAngle = 0 * Math.PI;
	let endAngle = 2 * Math.PI;

	ctx.lineWidth = 10;
	ctx.strokeStyle = "#E6CF8B";
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	ctx.stroke();

}

function drawX(xCord, yCord) {
	ctx.strokeStyle = "#E8EDF3";
	ctx.beginPath();
	let offset = 50;
	ctx.moveTo(xCord + offset, yCord + offset);
	ctx.lineTo(xCord + sectionSize - offset, yCord + sectionSize - offset);

	ctx.moveTo(xCord + offset, yCord + sectionSize - offset);
	ctx.lineTo(xCord + sectionSize - offset, yCord + offset);

	ctx.stroke();
}

function drawWinningLine(xStart, yStart, xEnd, yEnd) {
	ctx.strokeStyle = "#DDDFD4";
	ctx.lineWidth = 20;
	ctx.lineCap = 'round';
	ctx.beginPath();
	ctx.moveTo(xStart, yStart);
	ctx.lineTo(xEnd, yEnd);
	ctx.stroke(); 
	
}  















