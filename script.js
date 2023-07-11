let pixels = 100;
const canvas = document.getElementById("canvas");
const canvasSize = canvas.style.width.slice(0, -2);

generateGrid(pixels, canvasSize);
function generateGrid(pixels, canvasSize = 300) {
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
	canvas.addEventListener(["mousedown" || "touchstart"], colorGrid, {
		capture: false,
		passive: true,
	});

	canvas.addEventListener(["mousemove" || "touchmove"], colorGrid, {
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
canvas.addEventListener(["mousedown" || "touchstart"], colorGrid, {
	capture: false,
	passive: true,
});
