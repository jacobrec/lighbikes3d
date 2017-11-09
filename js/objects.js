var Tiles = {
    EMPTY: {
        value: 0
    },
    BIKE1: {
        value: 1
    },
    BIKE2: {
        value: 2
    },
    WALL1: {
        value: 3
    },
    WALL2: {
        value: 4
    },
    WALL3: {
        value: 5
    }
}

var Direction = {
    NORTH: {
        value: 0
    },
    EAST: {
        value: 1
    },
    SOUTH: {
        value: 2
    },
    WEST: {
        value: 3
    }
}

function Grid(width, height) {
    this.bike1 = new Bike(0, height / 2, 0xff4d4d);
    this.bike2 = new Bike(width - 1, height / 2, 0x00c400);
    this.tiles = [];

    for (let i = 0; i < height; i++) {
        this.tiles.push([]);
        for (let j = 0; j < width; j++) {
            if (i == 0 || j == 0 || i == (height - 1) || j == (width - 1)) {
                this.tiles[i].push(5);
            } else {
                this.tiles[i].push(0);
            }

        }
    }

    this.bike1.direction = Direction.WEST;
    this.bike1.x = 1+5;
    this.bike2.x = width-2-5;
    this.bike2.direction = Direction.EAST;
}

function Bike(posX, posY, colour) {
    this.x = posX;
    this.y = posY;
    this.colour = colour;
    this.direction = Direction.NORTH;
    this.alive = true;
}
