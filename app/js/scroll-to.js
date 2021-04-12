var Scroll_To = function() {
	var _self = this;

	this.cof = 0.05;

	this.currentPosition = 0;
	this.displacement = 0;
	this.newPosition = 0;

	this.intervalSpeed = 10;
	this.scrollInterval;
	this.scrollTarget;
	this.scrollSpeed = 0;
	this.interpolatedScrollPosition = 0;

	this.triggers = document.getElementsByClassName('scroll-to-js');

	this.init = function() {
		this.addListeners();
	}

	this.addListeners = function() {
		for (var i = 0; i < _self.triggers.length; i++) {
			_self.triggers[i].addEventListener('click', function(e) {
				e.preventDefault();

				var _domElementId = e.target.getAttribute('href')
				var _target = document.getElementById(_domElementId);

				_self.initInterval(_target);
			});
		}

		// Regain control if user scrolls after click
		window.addEventListener('wheel', throttle(_self.stopInterval, 120));
		window.addEventListener('touchstart', _self.stopInterval, false);
	}

	this.getCurrentPosition = function() {
		_self.currentPosition = window.pageYOffset;
	}

	this.getDisplacement = function(target) {
		_self.displacement = target.getBoundingClientRect().y;
	}

	this.getNewPosition = function() {
		_self.newPosition = _self.currentPosition + _self.displacement;
	}

	this.goTo = function(target) {
		// console.log(target);

		inviewTriggerInSmoothScroll = true;

		_self.getCurrentPosition();
		_self.getDisplacement(target);
		_self.getNewPosition();

		window.scroll(0, _self.newPosition);
	}

	this.getTo = function() {
		_self.getCurrentPosition();
		_self.getDisplacement(_self.scrollTarget);
		_self.getNewPosition();
		// console.log("_self.currentPosition: " + _self.currentPosition + ". _self.displacement: " + _self.displacement + ". _self.newPosition: " + _self.newPosition);
		// console.log("_self.newPosition: " + _self.newPosition);

		_self.interpolatedScrollPosition = _self.currentPosition;
		_self.scrollSpeed = (_self.newPosition - _self.currentPosition ) * _self.cof;
		if ( Math.abs(_self.scrollSpeed) < 1 ) _self.scrollSpeed = _self.scrollSpeed / Math.abs(_self.scrollSpeed);


		_self.interpolatedScrollPosition += _self.scrollSpeed;
		// console.log('speed: ' + _self.scrollSpeed);
		// console.log('displacement: ' + _self.displacement);


		if (_self.displacement < 5 && _self.displacement > -5) {
			_self.stopInterval();
			// console.log("threshold reached, interval stopped");

		}


		window.scroll(0, _self.interpolatedScrollPosition);
	}


	this.initInterval = function(target) {
		// console.log('init interval');
		_self.scrollTarget = target;
		_self.stopInterval();
		_self.scrollInterval = setInterval(_self.getTo, _self.intervalSpeed);
	}

	this.stopInterval = function() {
		clearInterval(_self.scrollInterval);
		// console.log('stopped interval')
	}
}