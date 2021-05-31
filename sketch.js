let colors = {
    background: "#B0C3A4"
}
let cells;
let player;

let cellSize = 20;

function setup() {

    createCanvas(windowWidth, windowHeight);

    cells = [...Array(floor(windowWidth / cellSize - 1))].map(e => Array(floor(windowHeight / cellSize - 1)));

    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {

            cells[i][j] = new Cell(i, j, "🤍");

            let noiseScale = 0.1;
            let perlin = noise(i * noiseScale, j * noiseScale);

            if (perlin > 0.6) {
                cells[i][j].state = true;
            } else {
                cells[i][j].state = false;
            }
        }
    }
    player = new Player(int(cells.length / 2), int(cells[0].length / 2));
}

function draw() {

    background(colors.background);

    if (frameCount % (24 * 1) == 1) {
        live();
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                cells[i][j].update();
            }
        }
    }
    translate(width - floor(windowWidth / cellSize - 1) * cellSize, height - floor(windowHeight / cellSize - 1) * cellSize);

    for (let j = 0; j < cells[0].length; j++) {
        for (let i = 0; i < cells.length; i++) {
            cells[i][j].display();
        }
    }
    plant(player.x, player.y);
}

function keyPressed() {

    player.move(keyCode);
}

function live() {

    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {

            cells[i][j].cache = cells[i][j].state;
        }
    }
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {

            let neighbours = 0;

            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {

                    let x = i + k;
                    let y = j + l;

                    if (x < 0) {
                        x = cells.length - 1;

                    } else if (x >= cells.length) {
                        x = 0;
                    }
                    if (y < 0) {
                        y = cells[i].length - 1;

                    } else if (y >= cells[i].length) {
                        y = 0;
                    }
                    neighbours += cells[x][y].cache;
                }
            }
            neighbours -= cells[i][j].cache;

            if (!cells[i][j].cache && neighbours == 3) {
                cells[i][j].state = true;

            } else if (cells[i][j].cache && neighbours <= 1) {
                cells[i][j].state = false;

            } else if (cells[i][j] && neighbours >= 4) {
                cells[i][j].state = false;

            } else {
                cells[i][j].state = cells[i][j].cache;
            }
        }
    }
}

function plant(x, y) {

    cells[x][y].state = true;
    cells[x][y].update();
}
