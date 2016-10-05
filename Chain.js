var LINK_D = 30;

function Chain(len) {
	this.links = Array();
	alert(len);
	for (var i = 0; i < len; i++) {
		var link = new ChainLink(mouseX + i * LINK_D,
					 mouseY + i * LINK_D,
					 LINK_D);
		this.links.push(link);
	}	
	
	this.show = function() {
		for (var i = 0; i < this.links.length; i++) {
			var link = this.links[i];
			link.show();
		}
	}

	this.removeLink = function() {
		if (this.links.length > 1)
			this.links.pop();
	}

	this.addLink = function() {
		var lastLink = this.links[this.links.length - 1];
		this.links.push(new ChainLink(lastLink.pos.x, lastLink.pos.y, lastLink.radius * 2));
	}

	this.length = function() {
		return this.links.length;
	}

	this.update = function() {
		this.applyMouseForce();
		
		for (var i = 1; i < this.links.length; i++) {
			this.links[i].update();
			this.links[i - 1].interactWith(this.links[i]);
		}
	}

	this.applyMouseForce = function() {
		/*var mouse = createVector(mouseX, mouseY);
		var forceVector = p5.Vector.sub(mouse, this.links[0].pos);
		var dist = forceVector.mag() / 10;
		forceVector.normalize();
		forceVector.mult( (dist));
		this.links[0].accumulateForce(forceVector);
		console.log(forceVector.mag());
	*/
		this.links[0].pos.x = mouseX;
		this.links[0].pos.y = mouseY;
	}
}
