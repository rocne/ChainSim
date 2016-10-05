// constants
var WIDTH = 0;//2500;
var HEIGHT = 0;//1400;

// debugging vars
var lastFrameTime = 0;
var shouldLogFrameRate = false;
var fooCount = 0;

// sim variables
var chain;

var LEN = 25;

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

	return input;
}

function createRangeInput(name, min, max, defaultValue, step, changeFunction) {	
	var input = document.createElement("INPUT");
	input.setAttribute("name", name);
	input.setAttribute("type", "range");
	input.setAttribute("min", min);
	input.setAttribute("max", max);
	input.setAttribute("step", step);
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
	return label;
}

function updateGrav() {
	var value = inputs["grav"].value;
	GRAV = value;	
	inputs["grav"].readOut.innerHTML = value;
}

function updateLen() {
	console.log("ffff");
	var value = inputs["len"].value;
	LEN = value;	
	inputs["len"].readOut.innerHTML = value;
	while (chain.length() > LEN)
		chain.removeLink();

	while (chain.length() < LEN)
		chain.addLink();
}

function setWidthAndHeight(w, h) {
	var inputHeight = document.getElementById("inputs").clientHeight;

	HEIGHT = (window.innerHeight - inputHeight) * 0.9;
	WIDTH = window.innerWidth * 0.9;

	if (WIDTH == 0 || HEIGHT == 0)
		WIDTH = HEIGHT = 720;
}

function createInputs() {
	var inputDiv = document.createElement("DIV");
	inputDiv.id = "inputs";

	var gravInput = createRangeInput("grav", 0, 0.75, GRAV, 0.005, updateGrav);
	var lenInput = createRangeInput("len", 1, 200, LEN, 1, updateLen);

	inputDiv.appendChild(gravInput);
	inputDiv.appendChild(document.createElement("BR"));

	inputDiv.appendChild(lenInput);
	inputDiv.appendChild(document.createElement("BR"));

	document.body.appendChild(inputDiv);
}

function setup() {
	frameRate(30);
	createInputs();
	setWidthAndHeight();

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
