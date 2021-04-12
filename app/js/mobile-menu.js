var Mobile_Menu = function() {
	var _self = this;

	this.opened = false;
	this.initScrollPosition = 0;
	this.pageScroll = document.body;
	this.transitionDuration = 900; // in ms

	this.trigger = document.getElementById('mobile-menu-trigger');
	this.container = document.getElementById('mobile-menu');
	this.pageNavs = document.getElementsByClassName('mob-menu-page-scroll');


	this.init = function() {
		this.addListeners();
	}

	this.addListeners = function() {
		this.trigger.addEventListener('click', function() {
			if (!_self.opened) {
				_self.openIt();

			} else {
				_self.closeIt();
				window.scrollTo(0, _self.initScrollPosition);
			}
		});

		for (var i = 0; i < _self.pageNavs.length; i++) {
			_self.pageNavs[i].addEventListener('click', function() {
				_self.closeIt();
			});
		}
	}

	this.openIt = function() {
		this.trigger.classList.add('opened');
		this.container.classList.add('opened');

		this.initScrollPosition = window.pageYOffset;

		this.opened = true;
	}
	this.closeIt = function() {
		this.trigger.classList.remove('opened');
		this.container.classList.remove('opened');


		this.opened = false;
	}
}