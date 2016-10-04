var SIZ = 20;
var DENSITY = 100;

var INDICATOR_SIZE_RATIO = 0.1;

var GRAV = 0.01;

var MAX_RAND_VEL = 25;

function ChainLink(x, y, d) {
	// fields
	this.mass = 1000 + Math.random() * 100;

	this.pos = createVector(x, y);
	this.vel = createVector(0, 0);
	this.radius = d / 2;
	this.accumulatedForce = createVector(0, 0);

	// public functions
	this.getRadius = function() {
		return this.radius;
	}

	this.distanceTo = function(otherThing) {
		var vectorToOther = p5.Vector.sub(this.pos, otherThing.pos);
		var dist = vectorToOther.mag();
		return dist;
	
	}

	this.accumulateForce = function(force) {
		this.accumulatedForce.add(force);
	}

	this.applyAccumulatedForce = function() {
		var accelarationMag = this.accumulatedForce.mag() / this.mass;
		if (this.accumulatedForce.mag() == 0)
			accelarationMag = 0;
	
		var accelaration = this.accumulatedForce.copy();
		accelaration.normalize();
		accelaration.mult(accelarationMag);
		
		this.vel.add(accelaration);
		this.accumulatedForce.set(0, 0);
	}

	this.isCollidingWith = function(otherThing) {
		return this.distanceTo(otherThing) <= this.getRadius() + otherThing.getRadius();
	}

	this.update = function() {
		this.updatePosition();
		this.handleEdgeBounce();
	}

	this.handleEdgeBounce = function() {
		var r = this.getRadius();
		
		// bounce the balls off the edges of the play area
		if (this.pos.x - r <= 0 && this.vel.x < 0)
			this.vel.x *= -1;
		if (this.pos.x >= WIDTH - r && this.vel.x > 0)
			this.vel.x *= -1;
		if (this.pos.y - r <= 0 && this.vel.y < 0)
			this.vel.y *= -1;
		if (this.pos.y >= HEIGHT - r && this.vel.y > 0)
			this.vel.y *= -1;
	}

	this.updatePosition = function() {
		this.pos.add(this.vel);
	}
	
	this.show = function () {
		var r = Math.floor(this.getRadius());

		fill(20);
		ellipse(this.pos.x, this.pos.y, 2 * r);

		fill(200);
		ellipse(this.pos.x, this.pos.y, 0.9 * 2 * r);	
	}

}
