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
});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    console.log("Page fully loaded.");
    console.log("Initialize.js");

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
}