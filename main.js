let grid = document.querySelector("#grid");

function sizeGrid() {
    const smallerDimension = Math.min(window.innerHeight, window.innerWidth);
    grid.style.width = grid.style.height = `${smallerDimension}px`;
}

function createGrid(size) {
    sizeGrid();
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        for (let ii = 0; ii < size; ii++) {
            let cell = document.createElement("div");
            cell.addEventListener("mouseenter", (e) => {
                e.target.classList.add("painted");
            });
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

createGrid(16);