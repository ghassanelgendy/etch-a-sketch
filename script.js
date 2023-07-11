let pixels = 400;
function generateGrid(pixels, canvasSize = 500) {
	const canvas = document.getElementById("canvas");
	for (let i = 0; i < pixels; i++) {
		let pixel = document.createElement("div");
		pixel.classList.add("pixel");
		const pixelSize = canvasSize / Math.sqrt(pixels);
		pixel.style.width = `${pixelSize}px`;
		pixel.style.height = `${pixelSize}px`;
		canvas.appendChild(pixel);
	}
}

generateGrid(pixels);
