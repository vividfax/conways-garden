class Player {

    constructor(x, y) {

        this.x = x;
        this.y = y;
    }

    display() {

        textSize(30);
        text("🧑‍🌾", this.x * cellSize, this.y * cellSize);
    }

    move(key) {

        if (key == UP_ARROW || key == 87) {
            this.y -= 1;

        } else if (key == DOWN_ARROW || key == 83) {
            this.y += 1;

        } else if (key == LEFT_ARROW || key == 65) {
            this.x -= 1;

        } else if (key == RIGHT_ARROW || key == 68) {
            this.x += 1;
        }
        if (this.x < 0) {
            this.x = cells.length - 1;

        } else if (this.x >= cells.length) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = cells[0].length - 1;

        } else if (this.y >= cells[0].length) {
            this.y = 0;
        }
    }
}
