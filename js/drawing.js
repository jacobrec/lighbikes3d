var renderer;
var camera;
var scene;

var cubeGeo = new THREE.BoxGeometry(1, 1, 1);
var wallGeo = new THREE.BoxGeometry(1, 1, 0.5);
var sphereGeo = new THREE.SphereGeometry(1, 100, 100);
var planeGeo;

var groundMaterial;

var wallMaterial1;
var wallMaterial2;

var car1Material;
var car2Material;

var light = new THREE.PointLight(0xFFFFFF);

function initRenderer(grid) {

    groundMaterial = new THREE.MeshLambertMaterial({
        color: 0x4da6ff
    });

    wallMaterial1 = new THREE.MeshLambertMaterial({
        color: grid.bike1.colour
    });

    wallMaterial2 = new THREE.MeshLambertMaterial({
        color: grid.bike2.colour
    });

    car1Material = new THREE.MeshLambertMaterial({
        color: grid.bike1.colour
    });

    car2Material = new THREE.MeshLambertMaterial({
        color: grid.bike2.colour
    });


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;


    renderer.shadowCameraNear = 3;
    renderer.shadowCameraFar = 1000;
    renderer.shadowCameraFov = 50;

    renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 0.5;
    renderer.shadowMapWidth = 1024;
    renderer.shadowMapHeight = 1024;

    let size = 1300;
    renderer.setSize(size, size * 9 / 16);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
        35, // Field of view
        16 / 9, // Aspect ratio
        0.1, // Near plane
        10000 // Far plane
    );

    planeGeo = new THREE.PlaneGeometry(grid.tiles[0].length, grid.tiles.length);

    light.position.set(10, 10, 10);
    light.castShadow = true;

    initScene(grid);
}

var bike1;
var bike2;

var walls = [];

function resetRenderer(grid) {
    //clear scene
    walls = [];
    initScene(grid);
}


function initScene(grid) {

    scene = new THREE.Scene();

    x = grid.tiles.length/2;
    y = 25;
    z = 2*grid.tiles.length-30;

    camera.position.set(x, y, z);
    camera.lookAt(x, y + 15, 0);

    planeGeo = new THREE.PlaneGeometry(grid.tiles[0].length, grid.tiles.length);


    console.log(grid);

    var plane = new THREE.Mesh(planeGeo, groundMaterial);
    plane.position.set(grid.tiles[0].length / 2 - 0.5, grid.tiles.length / 2 - 0.5, -0.5);
    plane.receiveShadow = true;

    bike1 = new THREE.Mesh(cubeGeo, car1Material);
    bike1.position.set(grid.bike1.x, grid.bike1.y, 0);
    bike1.castShadow = true;

    bike2 = new THREE.Mesh(cubeGeo, car2Material);
    bike2.position.set(grid.bike2.x, grid.bike2.y, 0);
    bike2.castShadow = true;

    for (let y = 0; y < grid.tiles.length; y++) {
        walls.push([]);
        for (let x = 0; x < grid.tiles[y].length; x++) {
            var wall = new THREE.Mesh(wallGeo, groundMaterial);
            wall.position.set(x, y, -0.25);
            wall.castShadow = true;
            wall.receiveShadow = true;
            wall.added = false;
            if (grid.tiles[y][x] == 5) {
                wall.added = true;
                scene.add(wall);
            }
            walls[y].push(wall);
        }
    }

    scene.add(plane);
    scene.add(bike1);
    scene.add(bike2);


    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    renderer.setClearColor(0xdddddd, 1);
    renderer.render(scene, camera);
}

function draw(grid) {

    camera.position.set(x, y, z);

    bike1.position.set(grid.bike1.x, grid.bike1.y, 0);
    bike2.position.set(grid.bike2.x, grid.bike2.y, 0);

    for (let y = 0; y < grid.tiles.length; y++) {
        for (let x = 0; x < grid.tiles[y].length; x++) {
            if (grid.tiles[y][x] == 3 && !walls[y][x].added) {
                walls[y][x].added = true;
                walls[y][x].material = wallMaterial1;
                scene.add(walls[y][x]);
            }
            if (grid.tiles[y][x] == 4 && !walls[y][x].added) {
                walls[y][x].added = true;
                walls[y][x].material = wallMaterial2;
                scene.add(walls[y][x]);
            }

        }
    }

    renderer.render(scene, camera);
}
