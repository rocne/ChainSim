var SIZ = 20;
var DENSITY = 100;

var INDICATOR_SIZE_RATIO = 0.1;

var GRAV = 0;//5;

var MAX_RAND_VEL = 25;

var BOUNCE_FACTOR = 0.8;

var DRAG = 0.5;

var MASS_CONST = 100;

function ChainLink(x, y, d) {
	// fields
	this.mass = MASS_CONST + Math.random() * MASS_CONST;

	this.pos = createVector(x, y);
	this.vel = createVector(25, 0);
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

	this.applyAirResistance = function() {
		var speed = this.vel.mag();
		var dragForce = p5.Vector.mult(this.vel, -1).normalize();
		dragForce.mult(speed * speed * DRAG);
		this.accumulateForce(dragForce);
	}

	this.applyGravity = function() {
		this.accumulateForce(createVector(0, GRAV * this.mass));
	}

	this.update = function() {
		this.applyGravity();
		this.applyAirResistance();

		this.applyAccumulatedForce();
		this.handleEdgeBounce();

		this.updatePosition();
	}

	this.interactWith = function(otherLink) {
		var dist = this.distanceTo(otherLink);
		var otherToMe = p5.Vector.sub(this.pos, otherLink.pos).normalize();
		var meToOther = p5.Vector.sub(otherLink.pos, this.pos).normalize();

		var force = dist * 100;// + 0.0001 * dist * dist;

		meToOther.mult(force);
		otherToMe.mult(force);

		this.accumulateForce(meToOther);
		otherLink.accumulateForce(otherToMe);
	}

	this.handleEdgeBounce = function() {
		var r = this.getRadius();
		
		// bounce the balls off the edges of the play area
		if (this.pos.x - r <= 0 && this.vel.x < 0)
			this.vel.x *= -BOUNCE_FACTOR;
		if (this.pos.x >= WIDTH - r && this.vel.x > 0)
			this.vel.x *= -BOUNCE_FACTOR;
		if (this.pos.y - r <= 0 && this.vel.y < 0)
			this.vel.y *= -BOUNCE_FACTOR;
		if (this.pos.y >= HEIGHT - r && this.vel.y > 0)
			this.vel.y *= -BOUNCE_FACTOR;
	}

	this.updatePosition = function() {
		this.pos.add(this.vel);
	}
	
	this.show = function () {
		var r = Math.floor(this.getRadius());

		fill('rgba(20, 20, 20, 1)');
		ellipse(this.pos.x, this.pos.y, 2 * r);

		fill('rgba(200, 200, 200, 0.25)');
		ellipse(this.pos.x, this.pos.y, 0.9 * 2 * r);	
	}

}
