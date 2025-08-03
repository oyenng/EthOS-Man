var HOME_PACMAN_STATE = 3;
var HOME_PACMAN_MAX_STATE = 6;
var HOME_PACMAN_TIMER = -1;
var HOME_PACMAN_SPEED = 50;

var TRAILER_TIMER = -1;
var TRAILER_SPEED = 50;

var TRAILER_PACMAN_X = 600;
var TRAILER_GHOST_BLINKY_X = 720;
var TRAILER_GHOST_PINKY_X = 800;
var TRAILER_GHOST_INKY_X = 880;
var TRAILER_GHOST_CLYDE_X = 960;

var PRESENTATION_TIMER = -1;
var PRESENTATION_SPEED = 2000;
var PRESENTATION_STATE = 0;

// --- NEW CODE SECTION ---
// Load your logo image so we can use it on the home screen.
var homeLogo = new Image();
homeLogo.src = 'img/my-logo.png';

// This function will run automatically as soon as the image is finished loading.
homeLogo.onload = function() {
	// Redraw the home screen elements that use the logo.
	drawHomePacman();
};
// --- END OF NEW CODE SECTION ---

function initHome() {
	HOME = true;
	$("#home").show();
	$("#panel").hide();
	
	if (HOME_PACMAN_TIMER === -1) {
		HOME_PACMAN_TIMER = setInterval("drawHomePacman()", HOME_PACMAN_SPEED);
	}
	
	startPresentation();
	startTrailer();
}

function drawHomePacman() {
	var canvas = document.getElementById('canvas-home-title-pacman');
	// Increased canvas size for a much bigger, higher-quality logo
	canvas.setAttribute('width', '200');
	canvas.setAttribute('height', '200');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		
		if (HOME_PACMAN_STATE < HOME_PACMAN_MAX_STATE) {
			HOME_PACMAN_STATE++;
		} else {
			HOME_PACMAN_STATE = 0;
		}
		
		ctx.clearRect(0, 0, 200, 200);
		
		// This is the new drawing code for your logo
		if (homeLogo.complete && homeLogo.naturalHeight !== 0) {
			// Draw the logo using the new, larger dimensions
			ctx.drawImage(homeLogo, 0, 0, 200, 200);
		}
	}
}

function startTrailer() {
	if (TRAILER_TIMER === -1) {
		TRAILER_TIMER = setInterval("trailer()", TRAILER_SPEED);
	}
}
function stopTrailer() {
	clearInterval(TRAILER_TIMER);
	TRAILER_TIMER = -1;
}
function trailer() {
	TRAILER_PACMAN_X -= 3;
	TRAILER_GHOST_BLINKY_X -= 3;
	TRAILER_GHOST_PINKY_X -= 3;
	TRAILER_GHOST_INKY_X -= 3;
	TRAILER_GHOST_CLYDE_X -= 3;
	
	if (TRAILER_PACMAN_X < -50) {
		TRAILER_PACMAN_X = 600;
	}
	if (TRAILER_GHOST_BLINKY_X < -80) {
		TRAILER_GHOST_BLINKY_X = 600;
	}
	if (TRAILER_GHOST_PINKY_X < -80) {
		TRAILER_GHOST_PINKY_X = 600;
	}
	if (TRAILER_GHOST_INKY_X < -80) {
		TRAILER_GHOST_INKY_X = 600;
	}
	if (TRAILER_GHOST_CLYDE_X < -80) {
		TRAILER_GHOST_CLYDE_X = 600;
	}
	
	drawTrailerPacman();
	drawTrailerGhost("blinky", "red", TRAILER_GHOST_BLINKY_X);
	drawTrailerGhost("pinky", "pink", TRAILER_GHOST_PINKY_X);
	drawTrailerGhost("inky", "blue", TRAILER_GHOST_INKY_X);
	drawTrailerGhost("clyde", "orange", TRAILER_GHOST_CLYDE_X);
}

function drawTrailerPacman() {
	var canvas = document.getElementById('trailer');
	canvas.setAttribute('width', '600');
	canvas.setAttribute('height', '50');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, 600, 50);
		
		// This is the new drawing code for your logo in the trailer animation
		if (homeLogo.complete && homeLogo.naturalHeight !== 0) {
			ctx.drawImage(homeLogo, TRAILER_PACMAN_X, 0, 50, 50);
		}
	}
}

function drawTrailerGhost(name, color, x) {
	var canvas = document.getElementById('trailer');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		
		var y = 25;
		
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, 15, 1 * Math.PI, 2 * Math.PI, false);
		ctx.lineTo(x + 15, y + 15);
		ctx.lineTo(x + 10, y + 10);
		ctx.lineTo(x + 5, y + 15);
		ctx.lineTo(x, y + 10);
		ctx.lineTo(x - 5, y + 15);
		ctx.lineTo(x - 10, y + 10);
		ctx.lineTo(x - 15, y + 15);
		ctx.fill();
		ctx.closePath();
		
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(x - 5, y - 5, 5, 0, 2 * Math.PI, false);
		ctx.arc(x + 5, y - 5, 5, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
		
		ctx.fillStyle = "blue";
		ctx.beginPath();
		ctx.arc(x - 5, y - 5, 2, 0, 2 * Math.PI, false);
		ctx.arc(x + 5, y - 5, 2, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
	}
}

function startPresentation() {
	if (PRESENTATION_TIMER === -1) {
		PRESENTATION_TIMER = setInterval("presentation()", PRESENTATION_SPEED);
	}
}
function stopPresentation() {
	clearInterval(PRESENTATION_TIMER);
	PRESENTATION_TIMER = -1;
}
function presentation() {
	
	if (PRESENTATION_STATE === 0) {
		PRESENTATION_STATE = 1;
		$("#presentation-character-blinky").addClass("yo");
		drawPresentationGhost("blinky", "red");
	} else if (PRESENTATION_STATE === 1) {
		PRESENTATION_STATE = 2;
		$("#presentation-character-blinky").removeClass("yo");
		$("#presentation-character-pinky").addClass("yo");
		drawPresentationGhost("pinky", "pink");
	} else if (PRESENTATION_STATE === 2) {
		PRESENTATION_STATE = 3;
		$("#presentation-character-pinky").removeClass("yo");
		$("#presentation-character-inky").addClass("yo");
		drawPresentationGhost("inky", "blue");
	} else if (PRESENTATION_STATE === 3) {
		PRESENTATION_STATE = 4;
		$("#presentation-character-inky").removeClass("yo");
		$("#presentation-character-clyde").addClass("yo");
		drawPresentationGhost("clyde", "orange");
	} else if (PRESENTATION_STATE === 4) {
		PRESENTATION_STATE = 0;
		$("#presentation-character-clyde").removeClass("yo");
	}
}

function drawPresentationGhost(name, color) {
	var canvas = document.getElementById('canvas-presentation-' + name);
	canvas.setAttribute('width', '30');
	canvas.setAttribute('height', '30');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		
		ctx.clearRect(0, 0, 30, 30);
		
		var x = 15;
		var y = 15;
		
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, 14, 1 * Math.PI, 2 * Math.PI, false);
		ctx.lineTo(x + 14, y + 14);
		ctx.lineTo(x + (14 / 2), y + 14 - 5);
		ctx.lineTo(x, y + 14);
		ctx.lineTo(x - (14 / 2), y + 14 - 5);
		ctx.lineTo(x - 14, y + 14);
		ctx.fill();
		ctx.closePath();
		
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(x - 6, y - 3, 4, 0, 2 * Math.PI, false);
		ctx.arc(x + 6, y - 3, 4, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
		
		ctx.fillStyle = "blue";
		ctx.beginPath();
		ctx.arc(x - 6 + 1, y - 3, 2, 0, 2 * Math.PI, false);
		ctx.arc(x + 6 + 1, y - 3, 2, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
	}
}
