function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighbourCount = 0;
    this.bee = false;
    this.revealed = false;
};

Cell.prototype.show = function () {
    stroke(0);
    fill(240);
    rect(this.x, this.y, this.w, this.w)
    if (this.revealed) {
        if (this.bomb) {
            fill(127)
            stroke(0)
            ellipse(this.x + this.w*0.5, this.y + this.w*0.5, this.w * 0.5);
        } else {
            fill(200);
            rect(this.x, this.y, this.w, this.w);
            if (this.neighbourCount > 0) { 
                textAlign(CENTER);
                textSize(25)
                fill(0);
                text(this.neighbourCount, this.x + this.w * 0.5, this.y + this.w - 10);
            }
        }
    }
};

Cell.prototype.countBombs = function () {
    if (this.bomb) {
        this.neighbourCount = -1;
        return;
    }
    var total = 0;
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            var i = this.i + xOffset;
            var j = this.j + yOffset;
            if (i > -1 && i < col && j > -1 && j < row){
            let neighbour = grid[i][j];
            if (neighbour.bomb) {
                total++;
                }
            }
        }
    }
    this.neighbourCount = total;
}

Cell.prototype.contains = function (x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
};
Cell.prototype.reveal = function () {
    this.revealed = true;
    //flood fill algoritme
    if (this.neighbourCount == 0) {
        this.floodFill();
    }
};

Cell.prototype.floodFill = function () {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            var i = this.i + xOffset;
            var j = this.j + yOffset;
            if (i > -1 && i < col && j > -1 && j < row) {
                let neighbour = grid[i][j];
                if (!neighbour.bomb && !neighbour.revealed) {
                    neighbour.reveal();
                }
            }
        }
    }
}