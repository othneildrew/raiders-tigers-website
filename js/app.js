// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu interactions
    var landingMobileMenu = new Mobile_Menu();
    landingMobileMenu.init();

    // Scroll to on click interactions
    var clickScroll = new Scroll_To();
    clickScroll.init();

    setFullYearText();
});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    // console.log("Page fully loaded.");
    // console.log("Initialize.js");

    // Load animation
    document.getElementById('header-nav').classList.add('animate');
    document.getElementById('hero-info').classList.add('animate');
    document.getElementById('hero-image').classList.add('animate');


    // General inview animation, linked with "Cascading" system
    var inviewObjects = document.getElementsByClassName('motion-cascade');

    // Cascade animation timing values
    for (var i = 0; i < inviewObjects.length; i++) {
        var inview = InView(inviewObjects[i], function(isInView, data) {
            if ((this.el.getBoundingClientRect().top - window.innerHeight) < 0) {
                this.el.classList.add('animate');

            } else {
                this.el.classList.remove('animate');
            }
        })
    }

    setupAutoSliderCarousel();
}

function setFullYearText() {
    let elems = document.getElementsByClassName('datetime__year');

    for (var i = 0; i < elems.length; i++) {
        elems[i].textContent = new Date().getFullYear();
    }
}

function setupAutoSliderCarousel() {
    var slider = document.querySelector('.img-carousel ._inner-wrapper');
    var reviewItems = document.querySelectorAll('.img-carousel ._img-container');
    var progressContainer = document.querySelector('.img-carousel ._pagination');
    var progressIndicators = document.querySelectorAll('._pagination ._indicator');
    var timerId = null;

    // let currentSlide = 0;

    function setSlide(num) {
        var current = Number(progressContainer.getAttribute('data-selected'));
        var selected = Number(num);
        
        var distanceToSlide = slider.clientWidth * selected * -1;

        // console.log(currentSlide, selected)

        // if (current > selected) {
        //     // distanceToSlide *= -1;

        //     console.log('current more than selected')
        // }



        // console.log(distanceToSlide)


        // slider.style.transform = `translateX(${distanceToSlide}px)`;

        slider.style.left = `${distanceToSlide}px`;


        // console.log('set', Number(num));

        // Set the current number the slide is now on
        progressContainer.setAttribute('data-selected', selected);
        // currentSlide = selected;

        // Show indicators as bubbles
        setProgress(num);
    }

    function setProgress(num) {
        for (let i = 0; i < progressIndicators.length; i++) {
            if (Number(num) === Number(i)) {
                progressIndicators[i].classList.add('active');
            }
                else {
                    progressIndicators[i].classList.remove('active');        
                }
        }
    }

    function startAutoSlide() {
        timerId = setInterval(() => {
            let current = Number(progressContainer.getAttribute('data-selected'));
            let slideNext = (current + 1) % reviewItems.length;
            setSlide(slideNext);
        }, 6000); 
    }

    for (let i = 0; i < progressIndicators.length; i++) {
        progressIndicators[i].addEventListener('click', function(e) {
            clearInterval(timerId);
            setSlide(i);
            startAutoSlide();
        }.bind(this));
    }

    // Slide the cards every x interval
    startAutoSlide()
    
}

;function throttle(fn, minDelay, scope) {
    var lastCall = 0;
    return function() {
        var now = +new Date();
        if (now - lastCall < minDelay) {
            return;
        }
        lastCall = now;
        fn.apply(scope, arguments);
    };
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
;(function (root) {
  function throttle (fn, threshhold, scope) {
    threshhold || (threshhold = 100)
    var last,
      deferTimer

    return function () {
      var context = scope || this

      var now = +(new Date())

      var args = arguments
      if (last && now < last + threshhold) {
        clearTimeout(deferTimer)
        deferTimer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, threshhold)
      } else {
        last = now
        fn.apply(context, args)
      }
    }
  }

  function hasClass (el, name) {
    return new RegExp(' ' + name + ' ').test(' ' + el.className + ' ')
  }

  function addClass (el, name) {
    if (!hasClass(el, name)) {
      el.className += ' ' + name
    }
    return el
  }

  function removeClass (el, name) {
    var newClass = ' ' + el.className.replace(/[\t\r\n]/g, ' ') + ' '
    if (hasClass(el, name)) {
      while (newClass.indexOf(' ' + name + ' ') >= 0) {
        newClass = newClass.replace(' ' + name + ' ', ' ')
      }
      el.className = newClass.replace(/^\s+|\s+$/g, '')
    }
    return el
  }

  function removeEvent (el, name, fn) {
    if (el.removeEventListener) {
      return el.removeEventListener(name, fn)
    } else if (el.detachEvent) {
      return el.detachEvent('on' + name, fn)
    }
  }

  function addEvent (el, name, fn) {
    if (el.addEventListener) {
      return el.addEventListener(name, fn, false)
    } else if (el.attachEvent) {
      return el.attachEvent('on' + name, fn)
    }
  }

  function getScrollTop () {
    if (typeof window.pageYOffset !== 'undefined') {
      return window.pageYOffset
    } else {
      var b = document.body
      var d = document.documentElement
      d = d.clientHeight ? d : b
      return d.scrollTop
    }
  }

  function isInView (obj) {
    var winTop = getScrollTop()

    var winBottom = winTop + window.innerHeight

    var objTop = obj.getBoundingClientRect().top + document.documentElement.scrollTop

    var objBottom = objTop + obj.offsetHeight

    var offset = 0

    if ((objTop <= winBottom + offset) && (objBottom >= winTop)) {
      return true
    }

    return false
  }

  /**
   * @desc Create an InView instance.
   *
   * @class
   * @func InView
   * @param {HTMLElement} element - element to detect when scrolled to view
   * @param {scrollCallback} scrollCallback - callback function fired on scroll event
   * @return {HTMLElement} - element
   *
   * @example
   * var el = document.querySelector('.item');
   *
   * var InView = InView(el, function(isInView, data) {
   *   if (isInView) {
   *     console.log('in view');
   *   } else {
   *     if (data.windowScrollTop - (data.elementOffsetTop - data.inViewHeight) > data.inViewHeight) {
   *       console.log('not in view (scroll up)');
   *     } else {
   *       console.log('not in view (scroll down)');
   *     }
   *   }
   * });
   */
  function InView (el, callback) {
    var _this = this
    if (!(_this instanceof InView)) {
      return new InView(el, callback)
    }

    _this.el = el
    _this.callback = callback.bind(_this)
    _this.destroy = function () {}

    if (!el) {
      return _this
    }

    var isDestroyed = false

    var check = function check (e) {
      if (isDestroyed) return false

      var params = {
        windowScrollTop: getScrollTop(),
        elementOffsetTop: _this.el.offsetTop,
        inViewHeight: window.innerHeight,
        elementOffsetTopInViewHeight: window.innerHeight - (getScrollTop() - (_this.el.offsetTop - window.innerHeight))
      }
      if (isInView(_this.el)) {
        addClass(_this.el, 'inview')
        _this.callback.call(_this, true, params)
      } else {
        removeClass(_this.el, 'inview')
        _this.callback.call(_this, false, params)
      }
    }

    var throttledCheck = throttle(check, 100)

    addEvent(window, 'scroll', throttledCheck)

    _this.destroy = function () {
      isDestroyed = true
      removeEvent(window, 'scroll', throttledCheck)
    }

    throttledCheck()

    return _this
  }

  /**
   * @desc InView callback
   *
   * @callback scrollCallback
   * @param {boolean} isInView - is in view
   * @param {object} data - scroll data
   * @param {number} data.windowScrollTop - scrolled amount
   * @param {number} data.elementOffsetTop - element top offset
   * @param {number} data.inViewHeight - height of visible area
   * @param {number} data.elementOffsetTopInViewHeight - element top offset relative to height of visible area
   */

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = InView
    }
    exports.InView = InView
  } else {
    root.InView = InView
  }
})(window);
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
;var Scroll_To = function() {
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
;
//# sourceMappingURL=app.js.map