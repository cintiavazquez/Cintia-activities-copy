(function () {
    console.log("Hamburger Menu");
    document
        .querySelectorAll(".nav-toggle")
        .forEach((el) =>
            el.addEventListener("click", () =>
                document.body.classList.toggle("nav-open")
            )
        );
})();
