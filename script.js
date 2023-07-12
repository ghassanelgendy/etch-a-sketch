const canvas = document.getElementById("canvas");
const canvasSize = 300;
const startButton = document.getElementById("startButton");
const welcomeScreen = document.getElementById("welcomeScreen");
const pixelGet = document.getElementsByName("canvasSize");

//returns the pixels chosen by user
function setCanvasSize() {
	for (let i = 0; i < pixelGet.length; i++) {
		if (pixelGet[i].checked) {
			pixels = pixelGet[i].value;
		}
	}
	console.log("function setCanvas:", pixels);
	return pixels;
}

//generates the grid
function generateGrid(pixels = 16, canvasSize) {
	for (let i = 0; i < pixels; i++) {
		let pixel = document.createElement("div");
		pixel.classList.add("pixel");
		const pixelSize = canvasSize / Math.sqrt(pixels);
		pixel.style.width = `${pixelSize}px`;
		pixel.style.height = `${pixelSize}px`;
		canvas.appendChild(pixel);
	}
	console.log("function generateGrid:", pixels);
}

//removes the welcome screen
function fadeOut(el) {
	el.parentElement.classList.add("faded-out");
	el.style.display = "none";
}

//set  the pixels chosen by user and runs the generate grid function
startButton.addEventListener(
	"click",
	() => {
		const pixels = setCanvasSize();
		generateGrid(pixels, canvasSize);
	},
	{ once: true }
);
//if the canvas is empty and the welcome screen is not displayed, generate a grid
if (!canvas.hasChildNodes() && welcomeScreen.style.display === "none") {
	generateGrid(16, canvasSize);
}
//fade out the welcome screen
startButton.addEventListener(
	"click",
	(e) => {
		fadeOut(e.target);
	},
	{
		once: true,
	}
);

const grid = document.querySelectorAll(".pixel");
Array.from(grid);
canvas.addEventListener("mousedown", colorGrid, {
	capture: false,
	passive: true,
});

function colorGrid(e) {
	canvas.addEventListener("mousedown", colorGrid, {
		capture: false,
		passive: true,
	});

	canvas.addEventListener("mousemove", colorGrid, {
		capture: false,
		passive: true,
	});

	for (let i = 0; i < grid.length; i++) {
		if (
			e.clientX <= grid[i].getBoundingClientRect().right &&
			e.clientX >= grid[i].getBoundingClientRect().left &&
			e.clientY <= grid[i].getBoundingClientRect().bottom &&
			e.clientY >= grid[i].getBoundingClientRect().top &&
			e.buttons > 0
		) {
			grid[i].classList.add("colored");
		}
	}
}
