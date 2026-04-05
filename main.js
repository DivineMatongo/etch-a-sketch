let grid = document.querySelector("#grid");
const BUTTON_SIZE = 75;   
const STARTING_SIZE = 16;

function sizeGrid() {
    availableHeight = window.innerHeight - BUTTON_SIZE;
    const smallerDimension = Math.min(availableHeight, window.innerWidth);
    grid.style.width = grid.style.height = `${smallerDimension}px`;
}

function paintCell(target) {
    if (target.classList.contains("painted")) {
        target.style.opacity = `${Number(target.style.opacity) + 0.1}`
    } else {
        target.classList.add("painted");
        target.style.opacity = "0.1";
    }
}

function createGrid(size) {
    sizeGrid();
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        for (let ii = 0; ii < size; ii++) {
            let cell = document.createElement("div");
            cell.addEventListener("mouseenter", (e) => {
                if (e.buttons === 1) {
                    paintCell(e.target);
                }
            });
            cell.addEventListener("mousedown", (e) => {
                e.preventDefault();
                paintCell(e.target);
            });
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function clearGrid() {
    for (let row of grid.children) {
        for (let cell of row.children) {
            cell.classList.remove("painted");
        }
    }
}

document.querySelector("#buttons").addEventListener("click", (e) => {
    if (e.target.textContent === "Clear Screen") {
        clearGrid();
    } else if (e.target.textContent === "Resize Grid") {
        let size = Number(prompt("Enter new size for grid"));
        if ((size) && (size > 0)) {
            if (size > 100) size = 100;
            grid.replaceChildren();
            createGrid(size);
        }
    }
});

createGrid(STARTING_SIZE);