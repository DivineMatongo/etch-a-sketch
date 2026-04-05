let canvas = document.querySelector("#canvas");
const BUTTON_PANEL_SIZE = 75;  // Size of top panel containing buttons
const STARTING_SIZE = 16;  // Default size of grid on startup (16x16)


function sizeGrid() {
    /** Size canvas to fit within visible space of the window */
    availableHeight = window.innerHeight - BUTTON_PANEL_SIZE;
    const smallerDimension = Math.min(availableHeight, window.innerWidth);
    canvas.style.width = canvas.style.height = `${smallerDimension}px`;
}

function paintCell(target) {
    /** Gradually increase darkness of color in a cell with each call */
    if (target.classList.contains("painted")) {
        // Increase darkness of cell by 10%
        target.style.opacity = `${Number(target.style.opacity) + 0.1}`
    } else {
        target.classList.add("painted");
        target.style.opacity = "0.1";
    }
}

function createGrid(size) {
    /** Populate canvas div with (size x size) grid of cells */
    sizeGrid();
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        for (let ii = 0; ii < size; ii++) {
            let cell = document.createElement("div");
            cell.addEventListener("mouseenter", (e) => {
                /** Darken cell when mouse passes if the left mouse is clicked */
                if (e.buttons === 1) {
                    paintCell(e.target);
                }
            });
            cell.addEventListener("mousedown", (e) => {
                /** Darken cell when it is clicked */
                e.preventDefault();
                paintCell(e.target);
            });
            row.appendChild(cell);
        }
        canvas.appendChild(row);
    }
}

function clearGrid() {
    for (let row of canvas.children) {
        for (let cell of row.children) {
            cell.classList.remove("painted");
        }
    }
}

document.querySelector("#buttons").addEventListener("click", (e) => {
    /** Universal handler for buttons on the screen */
    if (e.target.textContent === "Clear Screen") {
        clearGrid();
    } else if (e.target.textContent === "Resize Grid") {
        let size = Number(prompt("Enter new size for grid"));
        if ((size) && (size > 0)) {
            if (size > 100) size = 100;
            canvas.replaceChildren();
            createGrid(size);
        }
    }
});

createGrid(STARTING_SIZE);