let grid;
let col;
let row;
let w = 40;
let totalBombs = 60; 

function create2DArray(col, row) {
    let arr = new Array(col);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(row);
    }
    return arr;
}



function setup() {
    createCanvas(801, 801);
    col = floor(width / w);
    row = floor(height / w);
    grid = create2DArray(col, row);
    for (let i = 0; i < col; i++){
        for (let j = 0; j < row; j++){
            grid[i][j] = new Cell(i, j, w);
        }
    }

    let options = [];
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            options.push([i,j])
        }
    }
    // plasser ut totalBombs
    for (let n = 0; n < totalBombs; n++) {
        let index = floor(random(options.length));
        let choice = options[index];
        let i = choice[0];
        let j = choice[1];
        // sletter plasseringen for å fjerne den som alternativ
        options.splice(index, 1);
        grid[i][j].bomb = true;
    }

    for (let i = 0; i < col; i++){
        for (let j = 0; j < row; j++){
            grid[i][j].countBombs();
        }
    }
}

function gameOver() {
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            grid[i][j].revealed = true;
            // alert("Du tapte")
            
        }
    }
}

function mousePressed() {
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                grid[i][j].reveal();

                if (grid[i][j].bomb) {
                    gameOver();
                }
            };
        }
    }
}

function draw() {
    background(255);
    for (let i = 0; i < col; i++){
        for (let j = 0; j < row; j++){
            grid[i][j].show();
        }
    }
}