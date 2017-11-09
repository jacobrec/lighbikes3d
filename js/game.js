function initWorld(size) {
    let g = new Grid(size+2, size+2);
    return g;
}
var frame = 0;
const speed = 1; // in block per frame

function update(grid) {

    if (grid.bike1.alive && grid.bike2.alive) {

        moveBike(grid.bike1, grid, speed);
        moveBike(grid.bike2, grid, speed);

        addTiles(grid.bike1, grid, 3);
        addTiles(grid.bike2, grid, 4);
    }else{
        if(grid.bike1.alive && !grid.bike2.alive){
            alert("Player 1 Wins");
        }else if(grid.bike2.alive && !grid.bike1.alive){
            alert("Player 2 Wins");
        }else{
            alert("You tied");
        }
        resetGame(80);
        goToMenu();
    }
}
function resetGame(size){
    world = initWorld(Math.max(size, 10));
    resetRenderer(world);
    resetInput(world);
}

function addTiles(bike, grid, value) {
    if (bike.direction == Direction.NORTH || bike.direction == Direction.WEST) {
        if (grid.tiles[Math.floor(bike.y)][Math.floor(bike.x)] == 0) {
            grid.tiles[Math.floor(bike.y)][Math.floor(bike.x)] = value;
        }
    } else if (bike.direction == Direction.SOUTH || bike.direction == Direction.EAST) {
        if (grid.tiles[Math.ceil(bike.y)][Math.ceil(bike.x)] == 0) {
            grid.tiles[Math.ceil(bike.y)][Math.ceil(bike.x)] = value;
        }
    }
}

function checkCollisions(bike, grid) {
    if (grid.tiles[bike.y][bike.x] != 0) {
        bike.alive = false;
    }
}



function moveBike(bike, grid, speed) {
        if (bike.direction == Direction.NORTH) {
            bike.y += speed;
        } else if (bike.direction == Direction.WEST) {
            bike.x += speed;
        } else if (bike.direction == Direction.SOUTH) {
            bike.y -= speed;
        } else if (bike.direction == Direction.EAST) {
            bike.x -= speed;
        }
        checkCollisions(bike, grid);
}
