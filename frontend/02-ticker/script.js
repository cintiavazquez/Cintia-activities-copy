(function () {
    var ticker = document.getElementById("myTicker");
    var wrapper = ticker.querySelector(".ticker-wrapper");
    var links = wrapper.getElementsByTagName("a");

    var width = ticker.offsetWidth;
    var currentLeft = width;
    var speed = 1;

    var animationID;

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("mouseenter", function () {
            window.cancelAnimationFrame(animationID);
        });

        links[i].addEventListener("mouseleave", animate);
    }

    function animate() {
        currentLeft -= speed;

        if (currentLeft + links[0].offsetWidth < 0) {
            currentLeft = 0;
            wrapper.appendChild(links[0]);
        }

        animationID = window.requestAnimationFrame(animate);
        wrapper.style.left = currentLeft + "px";
    }

    animate();
})();
