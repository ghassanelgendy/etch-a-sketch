const canvas = document.getElementById("canvas");
const canvasSize = 300;
const startButton = document.getElementById("startButton");
let pixels;
startButton.addEventListener("click", () => {
	const welcomeScreen = document.getElementById("welcomeScreen");
	const pixelGet = document.getElementsByName("canvasSize");

	for (let i = 0; i < pixelGet.length; i++) {
		if (pixelGet[i].checked) {
			pixels = pixelGet[i].value;
		}
	}
	generateGrid(pixels, canvasSize);

	welcomeScreen.style.display = "none";
});
function generateGrid(pixels, canvasSize) {
	for (let i = 0; i < pixels; i++) {
		let pixel = document.createElement("div");
		pixel.classList.add("pixel");
		const pixelSize = canvasSize / Math.sqrt(pixels);
		pixel.style.width = `${pixelSize}px`;
		pixel.style.height = `${pixelSize}px`;
		canvas.appendChild(pixel);
	}
}

const grid = document.querySelectorAll(".pixel");
Array.from(grid);

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
canvas.addEventListener("mousedown", colorGrid, {
	capture: false,
	passive: true,
});
