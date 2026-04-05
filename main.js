const grid = document.querySelector("#grid");

function createGrid(size) {
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        for (let ii = 0; ii < size; ii++) {
            let cell = document.createElement("div");
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

createGrid(16);