class Cell {

    constructor(x, y, state) {

        this.x = x;
        this.y = y;
        this.state = state;
        this.cache;
        this.emoji = "";
        this.age;
        this.size = 0;
    }

    display() {

        if (this.x == player.x && this.y == player.y) {

            if (this.emoji == "🌲" || this.emoji == "🌳") {
                textSize(90);
                text(this.emoji, this.x * cellSize, this.y * cellSize-25);
            }
            player.display();
            return;
        }
        textAlign(CENTER, CENTER);

        if (this.emoji == "🌲" || this.emoji == "🌳") {
            textSize(90);
            text(this.emoji, this.x * cellSize, this.y * cellSize-25);

        } else {
            textSize(30);
            text(this.emoji, this.x * cellSize, this.y * cellSize);
        }
    }

    update() {

        let plants = ["🌱", "🌿", "☘️", "🍀", "🍃", "🍄", "🌾", "🌷", "🌺", "🌸", "🌼", "🌻"];
        let trees = ["🌲", "🌳"];

        if (!this.cache && this.state) {
            this.emoji = random(plants);

        } else if (!this.state) {
            this.emoji = " ";

        } else if (this.emoji == "") {
            this.emoji = random(plants);
        }
        if (player.x == this.x && player.y == this.y) {
            return;
        }
        if (this.cache == this.state && this.state) {
            this.age += 1;
        } else {
            this.age = 0;
        }
        if (this.age == 6 && random() > 0.7) {
            this.emoji = random(trees);
        }
    }
}
