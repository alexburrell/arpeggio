function Arpeggio() {}

Arpeggio.prototype.chordTemplate =
	'<div class="arpeggio-chord">' +
		'<ul class="arpeggio-frets">' +
			'<li class="arpeggio-fret-1"></li>' +
			'<li class="arpeggio-fret-2"></li>' +
			'<li class="arpeggio-fret-3"></li>' +
			'<li class="arpeggio-fret-4"></li>' +
			'<li class="arpeggio-fret-5"></li>' +
		'</ul>' +
		'<ul class="arpeggio-strings">' +
			'<li class="arpeggio-highE-string"></li>' +
			'<li class="arpeggio-A-string"></li>' +
			'<li class="arpeggio-D-string"></li>' +
			'<li class="arpeggio-G-string"></li>' +
			'<li class="arpeggio-B-string"></li>' +
			'<li class="arpeggio-lowE-string"></li>' +
		'</ul>' +
		'<ul class="arpeggio-positions">' +
			'<li class="arpeggio-highE-position"></li>' +
			'<li class="arpeggio-A-position"></li>' +
			'<li class="arpeggio-D-position"></li>' +
			'<li class="arpeggio-G-position"></li>' +
			'<li class="arpeggio-B-position"></li>' +
			'<li class="arpeggio-lowE-position"></li>' +
		'</ul>' +
	'</div>';

Arpeggio.prototype.defaultSize = {
	'width': 200,
	'height': 200
};

Arpeggio.prototype.generateChord = function(element, config) {
	if (typeof element === 'string') {
		if (element[0] === '#') {
			element = element.substr(1);
		}
		element = document.getElementById(element);
	} else if (typeof element === 'object') {
		element = element[0];
	}

	element.innerHTML = this.chordTemplate;

	this.setStyling(element, config.size || this.defaultSize);
	this.setPositioning(element, config.position, config.size || this.defaultSize);
};

Arpeggio.prototype.setStyling = function(element, size) {
	element.style.width = size.width + 'px';
	element.style.height = size.height + 'px';

	var uls = element.childNodes[0].childNodes;
	for (var i=0; i<uls.length; i++) {
		uls[i].style.width = size.width + 2 + 'px';
		uls[i].style.height = size.height + 'px';
	}
};

Arpeggio.prototype.setPositioning = function(element, positionConfig, size) {
	var uls = element.childNodes[0].childNodes,
		positions;

	for (var i=0; i<uls.length; i++) {
		if (uls[i].className.indexOf('positions') >= 0) {
			positions = uls[i].childNodes;
			break;
		}
	}

	for (var j=0; j<positions.length; j++) {
		var string = positions[j].className.split('-')[1];
		positions[j].style.left = ((size.width / 5) * j) + 'px';
		if (positionConfig[string] === false) {
			positions[j].className += ' none';
		} else if (positionConfig[string] === 0) {
			positions[j].className += ' open';
		} else {
			positions[j].style.top = ((size.height / 5) * positionConfig[string]) + 'px';
		}
	}
};
