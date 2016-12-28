require("pixi.js");

var socket = new WebSocket("ws://localhost:1126");

socket.onopen = function (event) {
    console.log('client connected: ' + event.currentTarget.url);
}

socket.onmessage = function (event) {
    console.log('client received message: ' + event.data);
}

var renderer = new PIXI.WebGLRenderer(800, 600);
renderer.backgroundColor = 0xeeeeee;

// The renderer will create a canvas element for you that you can then insert into the DOM.
document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
var stage = new PIXI.Container();

// Declare a global variable for our sprite so that the animate function can access it.
var logo = null;

// load the texture we need
PIXI.loader.add('logo', '../LOMS.png').load(function (loader, resources) {
    // This creates a texture from a 'bunny.png' image.
    logo = new PIXI.Sprite(resources.logo.texture);

    // Setup the position and scale of the bunny
    logo.position.x = 400;
    logo.position.y = 300;

    logo.scale.x = 1;
    logo.scale.y = 1;

    // Add the bunny to the scene we are building.
    stage.addChild(logo);

    // kick off the animation loop (defined below)
    animate();
});

function animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(animate);

    // each frame we spin the bunny around a bit
    logo.rotation += 0.01;

    // this is the main render call that makes pixi draw your container and its children.
    renderer.render(stage);
}