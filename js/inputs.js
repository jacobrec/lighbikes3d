var keymap = {};
function initInput(grid) {

    resetInput(grid);

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

}
function resetInput(grid){


    selectBiker(grid.bike1, options.bikeOneController);
    selectBiker(grid.bike2, options.bikeTwoController);

    keymap.left = false;
    keymap.up = false;
    keymap.right = false;
    keymap.down = false;
    keymap.a = false
    keymap.w = false;
    keymap.d = false;
    keymap.s = false;
}

function selectBiker(bike, selection){
    if(selection == "WASD"){
        bike.driver = new wasd_Driver();
    }else if(selection == "ARROW"){
        bike.driver = new arrow_Driver();
    }else if(selection == "RANDOM"){
        bike.driver = new random_Driver();
    }
}

function onKeyDown(event) {
    const key = event.keyCode;
    //console.log(key);
    switch (key) {
        case 37: //left
        keymap.left = true;
            break;
        case 38: //up
        keymap.up = true;
            break;
        case 39: //right
        keymap.right = true;
            break;
        case 40: //down
        keymap.down = true;
            break;

        case 65: //a
        keymap.a = true;
            break;
        case 87: //w
        keymap.w = true;
            break;
        case 68: //d
        keymap.d = true;
            break;
        case 83: //s
        keymap.s = true;
            break;
        default:

    }

}

function onKeyUp(event) {
    const key = event.keyCode;
    //console.log(key);
    switch (key) {
        case 37: //left
        keymap.left = false;
            break;
        case 38: //up
        keymap.up = false;
            break;
        case 39: //right
        keymap.right = false;
            break;
        case 40: //down
        keymap.down = false;
            break;

        case 65: //a
        keymap.a = false;
            break;
        case 87: //w
        keymap.w = false;
            break;
        case 68: //d
        keymap.d = false;
            break;
        case 83: //s
        keymap.s = false;
            break;
        default:

    }
}


function getInput(grid) {
    steerBike(grid, grid.bike1);
    steerBike(grid, grid.bike2);
}
function steerBike(grid, bike){
        bike.direction = bike.driver.steer(grid, bike);
        if(bike == grid.bike2){
            console.log(bike.direction);
        }
}

function decodeAttempt(attempt, notAllowed){
    //console.log(attempt);
    if(attempt == little_cons && notAllowed != Direction.EAST){
        return Direction.WEST;
    }else if(attempt == -little_cons&& notAllowed != Direction.WEST){
        return Direction.EAST;
    }else if(attempt == big_cons&& notAllowed != Direction.SOUTH){
        return Direction.NORTH;
    }else if(attempt == -big_cons&& notAllowed != Direction.NORTH){
        return Direction.SOUTH;
    }else {
        return notAllowed;
    }
}
const little_cons = 1;
const big_cons = 10;
