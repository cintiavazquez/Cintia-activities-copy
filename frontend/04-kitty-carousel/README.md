# Kitty Carousel

A kitty carousel should contain kittens. This example contains flat-filled slides, so it does not qualify as a kitty carousel. Works pretty much like one though.

## Part 1

The container should have fixed sizes to prevent overflow:

```css
.carousel {
	height: 300px;
	width: 100vw;
	position: relative;
	overflow: hidden;
}
```

The single slides should be stacked on top of each other (pos: absolute + top/left = 0), then moved offscreen by translating them 100% to the right:

```css
.carousel .slide {
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	transform: translateX(100%);
	transition-property: transform;
	transition-timing-function: ease-in-out;
}
```

Then observe how any slide can have 2 further statuses, `.onscreen` and `.exit`:

```css
.carousel .slide.onscreen {
	transform: translateX(0);
	transition-duration: 2s;
}

.carousel .slide.exit {
	transform: translateX(-100%);
	transition-duration: 2s;
}
```

**Important:** the `transition-duration` cannot be set on the `.carousel .slide` definition itself, because we don't want any animation when going from `.slide.exit` to `.slide`.

Now you can play from the devtools to show the animation by toggling the classes.

For the js:

```js
var carousel = document.getElementById("carousel");
var slides = carousel.querySelectorAll(".slide");

// the most important lines of the file!
var currentSlide = 0;
var nextSlide = 1;

// no magic numbers!
// vars with name ftw
var DELAY = 2000;

function moveSlides() {
    // slides[currentSlide] goes away
    // i.e. it gets the exit class, and loses the onscreen one
    // slides[nextSlide] enters (gets the onscreen class)
    //
    // see below about how to update the indexes
}

// check when the sliding transition ends
carousel.addEventListener("transitionend", function (event) {
    // discard one of the two events,
    // since two transitions run at each time (slide exiting, slide entering)
    if (!event.target.classList.contains("exit")) {
        return;
    }
    event.target.classList.remove("exit");
    // call the next moveSlides();
    updateDots();
    setTimeout(moveSlides, DELAY);
});

// start the carousel
setTimeout(moveSlides, DELAY);
```

In order to update `currentSlide` and `nextSlide`, let a working version of the carousel run, and let the students compile the state of the app:

| currentSlide | nextSlide |
|--------------|-----------|
| 0            | 1         |
| 1            | 2         |
| 2            | 3         |
| 3            | 0         |

They (and you!) will realise that the relationship between the previous row and the next one is:

```js
currentSlide = nextSlide;

// if we reached the end of the slides
if (currentSlide === slides.length - 1) {
    nextSlide = 0;
} else {
    nextSlide++;
}
```

You can use modulo operations, but an explicit `if` goes a long way here.

## Part 2 - dots

Challenges:

- ignore dot clicks when the carousel is transitioning (a `isTransitioning` flag does the job);
- the already scheduled animation should be cancelled when clicking on a dot - storing the timeout id in a var and calling `clearTimeout` at the appropriate place helps;
- setting `nextSlide` to the dot index seals the deal.