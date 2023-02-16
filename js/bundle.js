(function () {
    'use strict'
    var siteMenuClone = function () {
        var jsCloneNavs = document.querySelectorAll('.js-clone-nav');
        var siteMobileMenuBody = document.querySelector('.site-mobile-menu-body');
        jsCloneNavs.forEach(nav => {
            var navCloned = nav.cloneNode(true);
            navCloned.setAttribute('class', 'site-nav-wrap');
            siteMobileMenuBody.appendChild(navCloned);
        });
        setTimeout(function () {
            var hasChildrens = document.querySelector('.site-mobile-menu').querySelectorAll(' .has-children');
            var counter = 0;
            hasChildrens.forEach(hasChild => {
                var refEl = hasChild.querySelector('a');
                var newElSpan = document.createElement('span');
                newElSpan.setAttribute('class', 'arrow-collapse collapsed');
                hasChild.insertBefore(newElSpan, refEl);
                var arrowCollapse = hasChild.querySelector('.arrow-collapse');
                arrowCollapse.setAttribute('data-bs-toggle', 'collapse');
                arrowCollapse.setAttribute('data-bs-target', '#collapseItem' + counter);
                var dropdown = hasChild.querySelector('.dropdown');
                dropdown.setAttribute('class', 'collapse');
                dropdown.setAttribute('id', 'collapseItem' + counter);
                counter++;
            });
        }, 1000);
        var menuToggle = document.querySelectorAll(".js-menu-toggle");
        var mTog;
        menuToggle.forEach(mtoggle => {
            mTog = mtoggle;
            mtoggle.addEventListener("click", (e) => {
                if (document.body.classList.contains('offcanvas-menu')) {
                    document.body.classList.remove('offcanvas-menu');
                    mtoggle.classList.remove('active');
                    mTog.classList.remove('active');
                } else {
                    document.body.classList.add('offcanvas-menu');
                    mtoggle.classList.add('active');
                    mTog.classList.add('active');
                }
            });
        })
        var specifiedElement = document.querySelector(".site-mobile-menu");
        var mt, mtoggleTemp;
        document.addEventListener('click', function (event) {
            var isClickInside = specifiedElement.contains(event.target);
            menuToggle.forEach(mtoggle => {
                mtoggleTemp = mtoggle
                mt = mtoggle.contains(event.target);
            })
            if (!isClickInside && !mt) {
                if (document.body.classList.contains('offcanvas-menu')) {
                    document.body.classList.remove('offcanvas-menu');
                    mtoggleTemp.classList.remove('active');
                }
            }
        });
    };
    siteMenuClone();
})();

(function () {
    'use trict';
    // How long you want the animation to take, in ms
    const animationDuration = 2000;
    // Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
    const frameDuration = 1000 / 60;
    // Use that to calculate how many frames we need to complete the animation
    const totalFrames = Math.round(animationDuration / frameDuration);
    // An ease-out function that slows the count as it progresses
    const easeOutQuad = t => t * (2 - t);
    const numberWithCommas = n => {
        return n.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
    }
    // The animation function, which takes an Element
    const animateCountUp = el => {
        let frame = 0;
        const countTo = parseInt(el.innerHTML, 10);
        // Start the animation running 60 times per second
        const counter = setInterval(() => {
            frame++;
            // Calculate our progress as a value between 0 and 1
            // Pass that value to our easing function to get our
            // progress on a curve
            const progress = easeOutQuad(frame / totalFrames);
            // Use the progress value to calculate the current count
            const currentCount = Math.round(countTo * progress);
            // If the current count has changed, update the element
            if (parseInt(el.innerHTML, 10) !== currentCount) {
                el.innerHTML = numberWithCommas(currentCount);
            }		// If we’ve reached our last frame, stop the animation
            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameDuration);
    };
    // Run the animation on all elements with a class of ‘countup’
    const runAnimations = () => {
        const countupEls = document.querySelectorAll('.countup');
        countupEls.forEach(animateCountUp);
    };

    // In Viewed
    var elements;
    var windowHeight;

    function init() {
        elements = document.querySelectorAll('.section-counter');
        windowHeight = window.innerHeight;
    }

    function checkPosition() {
        var i;
        for (i = 0; i < elements.length; i++) {
            var element = elements[i];
            var positionFromTop = elements[i].getBoundingClientRect().top;
            if (positionFromTop - windowHeight <= 0) {
                if (!element.classList.contains('viewed')) {
                    element.classList.add('viewed');
                    runAnimations();
                } else {
                    if (element.classList.contains('viewed')) {
                    }
                }
            }
        }
    }

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);
    init();
    checkPosition();
})();

(function () {
    'use strict'
    AOS.init({duration: 800, easing: 'slide', once: true});
    var preloader = function () {
        var loader = document.querySelector('.loader');
        var overlay = document.getElementById('overlayer');

        function fadeOut(el) {
            el.style.opacity = 1;
            (function fade() {
                if ((el.style.opacity -= .1) < 0) {
                    el.style.display = "none";
                } else {
                    requestAnimationFrame(fade);
                }
            })();
        }

        setTimeout(function () {
            fadeOut(loader);
            fadeOut(overlay);
        }, 200);
    };
    preloader();
    var tinyslider = function () {
        var el = document.querySelectorAll('.testimonial-slider');
        if (el.length > 0) {
            var tnsSlider = tns({
                container: '#testimonial-slider',
                mode: 'carousel',
                speed: 700,
                items: 3,
                gutter: 10,
                autoplay: true,
                autoplayButtonOutput: false,
                controlsContainer: '#testimonial-nav',
                responsive: {0: {items: 1}, 700: {items: 2}, 1000: {items: 3}}
            });
        }
    }
    tinyslider();
})();
