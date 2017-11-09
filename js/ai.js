function random_Driver() {
    this.list = [1, -1, 10, -10];
    this.count = 0;
    this.steer = function(grid, bike) {
        this.count++;
        let attemptedDirection = 0;

        let x = bike.x;
        let y = bike.y;
        let safe = [];

        if (grid.tiles[y - 1][x] == 0) {
            safe.push(-10);
            if (bike.direction == Direction.SOUTH) {
                return decodeAttempt(-10, bike.direction);
            }
        }
        if (grid.tiles[y][x + 1] == 0) {
            safe.push(1);
            if (bike.direction == Direction.EAST) {
                return decodeAttempt(1, bike.direction);
            }
        }
        if (grid.tiles[y + 1][x] == 0) {
            safe.push(10);
            if (bike.direction == Direction.NORTH) {
                return decodeAttempt(10, bike.direction);
            }
        }
        if (grid.tiles[y][x - 1] == 0) {
            safe.push(-1);
            if (bike.direction == Direction.WEST) {
                return decodeAttempt(-1, bike.direction);
            }
        }

        if (safe.length == 0) {
            decodeAttempt(0, bike.direction);
        }
        attemptedDirection = safe[Math.floor(Math.random() * safe.length)];
        return decodeAttempt(attemptedDirection, bike.direction);
    }
}

// Below are the player input options
function wasd_Driver() {
    this.steer = function(grid, bike) {
        let attemptedDirection = 0;
        if (keymap.a) {
            attemptedDirection -= little_cons;
        }
        if (keymap.d) {
            attemptedDirection += little_cons;
        }
        if (keymap.s) {
            attemptedDirection -= big_cons;
        }
        if (keymap.w) {
            attemptedDirection += big_cons;
        }
        return decodeAttempt(attemptedDirection, bike.direction);
    }

}

function arrow_Driver() {
    this.steer = function(grid, bike) {
        let attemptedDirection = 0;
        if (keymap.left) {
            attemptedDirection -= little_cons;
        }
        if (keymap.right) {
            attemptedDirection += little_cons;
        }
        if (keymap.down) {
            attemptedDirection -= big_cons;
        }
        if (keymap.up) {
            attemptedDirection += big_cons;
        }
        return decodeAttempt(attemptedDirection, bike.direction);
    }
}
