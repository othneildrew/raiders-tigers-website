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
    let elems = document.getElementsByClassName('dt_year');

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
