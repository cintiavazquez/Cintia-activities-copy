// 0    1
// 1    2
// 2    0

(function () {
    var carousel = document.getElementById("carousel");
    var slides = carousel.querySelectorAll(".slide");
    var dots = carousel.querySelectorAll(".dots li");

    var DELAY = 2000;

    var currentSlide = 0;
    var nextSlide = 1;

    var isTransitioning = false;
    var timeoutID = -1;

    function moveSlides() {
        slides[currentSlide].classList.add("exit");
        slides[currentSlide].classList.remove("onscreen");
        slides[nextSlide].classList.add("onscreen");

        currentSlide = nextSlide;

        // if we reached the end of the slides
        if (currentSlide === slides.length - 1) {
            nextSlide = 0;
        } else {
            nextSlide++;
        }

        isTransitioning = true;
    }

    function updateDots() {
        dots.forEach(function (dot, index) {
            if (index == currentSlide) {
                dot.classList.add("current");
                return;
            }
            dot.classList.remove("current");
        });
    }

    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            if (isTransitioning) {
                return;
            }
            nextSlide = index;
            clearTimeout(timeoutID);
            moveSlides();
        });
    });

    // check when the sliding transition ends
    carousel.addEventListener("transitionend", function (event) {
        // discard one of the two events
        if (!event.target.classList.contains("exit")) {
            return;
        }
        isTransitioning = false;
        event.target.classList.remove("exit");
        // call the next moveSlides();
        updateDots();
        timeoutID = setTimeout(moveSlides, DELAY);
    });

    // start the carousel
    timeoutID = setTimeout(moveSlides, DELAY);
})();
