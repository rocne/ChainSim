// foo

var START_X = WIDTH / 2;
var START_Y = HEIGHT / 2;

var LINK_D = 30;

function Chain(len) {
	this.links = Array();
	alert(len);
	for (var i = 0; i < len; i++) {
		var link = new ChainLink(START_X + i * LINK_D,
					 START_Y + i * LINK_D,
					 LINK_D);
		this.links.push(link);
	}	
	
	this.show = function() {
//		for (var i = 0; i < this.links.length; i++) {
//			var link = this.links[i];
//			link.show();
//		}
		console.log("show chain");
	}

	this.update = function() {
	}
}
