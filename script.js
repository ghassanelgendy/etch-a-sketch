const canvas = document.getElementById("canvas");
const startButton = document.getElementById("startButton");
const welcomeScreen = document.getElementById("welcomeScreen");
const pixelGet = document.getElementsByName("canvasSize");
const root = document.querySelector(":root");
//checks for device type
window.mobileCheck = function () {
	let check = false;
	(function (a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				a
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4)
			)
		)
			check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};
let canvasSize;
//chooses the canvas size (300 => mobile, 600 => desktop)
if (mobileCheck()) {
	canvas.style.width = "300px";
	canvas.style.height = "300px";
	canvasSize = 300;
} else {
	canvasSize = 600;
}
//returns the pixels chosen by user
function setCanvasSize() {
	for (let i = 0; i < pixelGet.length; i++) {
		if (pixelGet[i].checked) {
			pixels = pixelGet[i].value;
		}
	}
	console.log("pixels chosen: ", pixels);
	return pixels;
}

//generates the grid
function generateGrid(pixels = 64, canvasSize) {
	for (let i = 0; i < pixels; i++) {
		let pixel = document.createElement("div");
		pixel.classList.add("pixel");
		const pixelSize = canvasSize / Math.sqrt(pixels);
		pixel.style.width = `${pixelSize}px`;
		pixel.style.height = `${pixelSize}px`;
		canvas.appendChild(pixel);
	}
}

//removes the welcome screen
function fadeout(el) {
	el.parentElement.classList.add("faded-out");

	//removes the welcome screen after animating the fade out
	setTimeout(() => {
		el.parentElement.remove();
	}, 460);
}
console.log(
	"\n",
	"pixels: ",
	setCanvasSize(),
	"\n",
	"canvas size: ",
	canvasSize
);

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
if (!canvas.hasChildNodes() && welcomeScreen.childElementCount === 0) {
	generateGrid(16, canvasSize);
}

//fade out the welcome screen
startButton.addEventListener(
	"click",
	(e) => {
		fadeout(e.target);
	},
	{
		once: true,
	}
);
mode("draw");
//eventListener for the erasing of the whole grid
const chosenColor = document.getElementById("color");

function eraseAll() {
	const grid = document.querySelectorAll(".pixel");
	grid.forEach((pixel) => {
		console.log(pixel.classList.length);
		if (pixel.classList.length > 1) {
			pixel.className = "pixel";
			pixel.style.backgroundColor = "";
		}
	});
}
const colorSwatch = document.querySelectorAll(".swatchy-color-button");
colorSwatch.forEach((color) => {
	color.addEventListener("click", () => {
		colorsChangeable();
		chosenColor.style.color = color.style.backgroundColor;
		changeCssColor(chosenColor.style.color);
	});
});

function colorsChangeable() {
	const grid = document.querySelectorAll(".pixel");
	grid.forEach((pixel) => {
		let pixelColor = getComputedStyle(pixel).backgroundColor;
		let pixelNonRGB = "c" + pixelColor.replace(/[rgb(), ]/g, "");

		if (pixelColor != "rgb(255, 255, 255)") {
			pixel.className = `${pixelNonRGB}`;
			let newColored = document.querySelectorAll(`.${pixelNonRGB}`);
			newColored.forEach((pixel) => {
				pixel.style.backgroundColor = pixelColor;
			});

			pixel.classList.remove("colored");
			pixel.classList.add("pixel");
		}
	});
}
function changeCssColor(color) {
	root.style.setProperty("--coloring", `${color}`);
}

//------

//coloring function for mobile devices
function coloringMobile(e) {
	const grid = document.querySelectorAll(".pixel");
	grid.forEach((element) => {
		const rect = element.getBoundingClientRect();
		if (
			e.touches[0].clientX <= rect.right &&
			e.touches[0].clientX >= rect.left &&
			e.touches[0].clientY <= rect.bottom &&
			e.touches[0].clientY >= rect.top &&
			e.touches.length > 0
		) {
			element.classList.add("colored");
		}
	});
}

function coloring(e) {
	if (e.buttons < 2) {
		const grid = document.querySelectorAll(".pixel");
		grid.forEach((element) => {
			const rect = element.getBoundingClientRect();
			if (
				e.clientX <= rect.right &&
				e.clientX >= rect.left &&
				e.clientY <= rect.bottom &&
				e.clientY >= rect.top &&
				e.buttons > 0
			) {
				element.classList.add("colored");
			}
		});
	}
}

function erasingMobile(e) {
	const grid = document.querySelectorAll(".pixel");
	grid.forEach((element) => {
		const rect = element.getBoundingClientRect();
		if (
			e.touches[0].clientX <= rect.right &&
			e.touches[0].clientX >= rect.left &&
			e.touches[0].clientY <= rect.bottom &&
			e.touches[0].clientY >= rect.top &&
			e.touches.length > 0
		) {
			if (element.classList.length > 1) {
				element.className = "pixel";
				element.style.backgroundColor = "";
			}
		}
	});
}

function erasing(e) {
	const grid = document.querySelectorAll(".pixel");
	grid.forEach((element) => {
		const rect = element.getBoundingClientRect();
		if (
			e.clientX <= rect.right &&
			e.clientX >= rect.left &&
			e.clientY <= rect.bottom &&
			e.clientY >= rect.top &&
			e.buttons > 0
		) {
			if (element.classList.length > 1) {
				element.className = "pixel";
				element.style.backgroundColor = "";
			}
		}
	});
}
const modeName = document.getElementById("modeName");
const toggleButton = document.getElementById("toggleButton");
const toggleIcon = document.getElementById("toggleIcon");
//event listener to the toggle button
toggleButton.addEventListener("click", function () {
	// Toggle the active class on the button
	toggleButton.classList.toggle("active");

	// Update the icon based on the active state
	if (toggleButton.classList.contains("active")) {
		mode("draw");
		modeName.textContent = "Drawing";
		toggleIcon.classList.remove("fa-eraser"); // Remove the inactive icon class
		toggleIcon.classList.add("fa-pencil-alt"); // Add the active icon class
	} else {
		toggleIcon.classList.remove("fa-pencil-alt");
		mode("erase");
		modeName.textContent = "Erasing";
		// Remove the active icon class
		toggleIcon.classList.add("fa-eraser"); // Add the inactive icon class
	}
});

function mode(selectedMode) {
	switch (selectedMode) {
		case "erase":
			console.log("Erase mode");
			canvas.removeEventListener("mousemove", coloring);
			canvas.removeEventListener("mousedown", coloring);
			canvas.removeEventListener("touchmove", coloringMobile);
			canvas.removeEventListener("touchstart", coloringMobile);

			canvas.addEventListener("mousemove", erasing);
			canvas.addEventListener("mousedown", erasing);
			canvas.addEventListener("touchmove", erasingMobile);
			canvas.addEventListener("touchstart", erasingMobile);
			break;
		case "draw":
			console.log("Draw mode");
			canvas.removeEventListener("mousemove", erasing);
			canvas.removeEventListener("mousedown", erasing);
			canvas.removeEventListener("touchmove", erasingMobile);
			canvas.removeEventListener("touchstart", erasingMobile);

			canvas.addEventListener("mousemove", coloring);
			canvas.addEventListener("mousedown", coloring);
			canvas.addEventListener("touchmove", coloringMobile);
			canvas.addEventListener("touchstart", coloringMobile);
			break;
		default:
			console.log("Invalid mode");
			break;
	}
}
