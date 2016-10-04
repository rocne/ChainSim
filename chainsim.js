// constants
var WIDTH = 0;//2500;
var HEIGHT = 0;//1400;

var INITIAL_NUM_THINGS = 250;

// debugging vars
var lastFrameTime = 0;
var shouldLogFrameRate = false;
var fooCount = 0;

// sim variables
var chain;

var LEN = 10;

var inputs = {};

var stopped = false;

window.onload = function() {
}

function createButtonInput(name, clickedFunction) {
	var input = document.createElement("BUTTON");
	input.setAttribute("name", name);
	input.onclick = clickedFunction;
	input.innerHTML = name;
	inputs[name] = input;

	document.body.appendChild(input);
	document.body.appendChild(document.createElement("BR"));
}

function createRangeInput(name, min, max, defaultValue, changeFunction) {	
	var input = document.createElement("INPUT");
	input.setAttribute("name", name);
	input.setAttribute("type", "range");
	input.setAttribute("min", min);
	input.setAttribute("max", max);
	input.setAttribute("step", 0.005);
	input.setAttribute("defaultValue", defaultValue);
	input.value = defaultValue;
	input.onchange = changeFunction;
	inputs[name] = input;

	var label = document.createElement("LABEL");
	label.setAttribute("for", name);
	label.innerHTML = name;	

	var readOut = document.createElement("SPAN");
	readOut.innerHTML = defaultValue;
	input.readOut = readOut;
	
	label.appendChild(input);
	label.appendChild(readOut);
	document.body.appendChild(label);
	document.body.appendChild(document.createElement("BR"));
}

function updateGrav() {
	console.log(inputs);
	var value = inputs["grav"].value;
	GRAV = value;	
	inputs["grav"].readOut.innerHTML = value;
	console.log("updated grav to " + value);

}

function setWidthAndHeight(w, h) {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	if (WIDTH == 0 || HEIGHT == 0)
		WIDTH = HEIGHT = 720;
}

function createInputs() {
	createRangeInput("grav", 0, 0.25, GRAV, updateGrav);
}

function setup() {
	setWidthAndHeight();
	createInputs();

	createCanvas(WIDTH, HEIGHT);
	
	chain = new Chain(LEN);

	lastFrameTime = getTime();
	imageMode(CORNER);
}

function draw() {
	fooCount++;
	if (shouldLogFrameRate)
		logFrameRate();

	background(25);
	
	fill(255);	
	rect(10, 10, WIDTH -20, HEIGHT -20);

	chain.update();
	chain.show();
}

function logFrameRate() {
	var currTime = getTime();
	console.log("Time since last frame: " + currTime - lastFrameTime);
	console.log("Frame rate: " + 1000.0 / (currTime - lastFrameTime) + "\n\n");
	lastFrameTime = currTime;
}

function stopAtFrameCount(count) {
	fooCount++;
	if (fooCount > count)
		while(true)
			;
}

function getTime() {
	return new Date().getTime();
}
