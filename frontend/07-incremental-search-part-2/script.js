(function () {
    // DOM selectors at the top
    // $input and $suggestions are queried relatively to the parent $search
    var $search = document.getElementById("mySearch");
    var $input = $search.querySelector("input");
    var $suggestionsWrapper = $search.querySelector(".suggestions");

    var MAX_COUNTRIES = 4;

    ["input", "focus"].forEach((eventType) =>
        $input.addEventListener(eventType, function (event) {
            var query = event.target.value;

            // empty the suggestions in any case
            $suggestionsWrapper.innerHTML = "";

            if (!query.length) {
                return;
            }

            fetch("https://spicedworld.herokuapp.com/?q=" + query)
                .then((response) => response.json())
                .then((results) => {
                    if (query !== $input.value) {
                        return;
                    }
                    if (!results.length) {
                        // append the .no-results element in case there are no results
                        $suggestionsWrapper.innerHTML +=
                            "<li class='no-results'>No results</li>";
                        return;
                    }

                    // else, append a suggestion for every result
                    results.forEach(
                        (result) =>
                            ($suggestionsWrapper.innerHTML += `<li>${result}</li>`)
                    );
                });
        })
    );

    // #HACK - the timeout is needed to make the click work
    // otherwise the blur fires first, and hides the suggestions!
    $input.addEventListener("blur", function () {
        setTimeout(() => ($suggestionsWrapper.innerHTML = ""), 200);
    });

    // discard clicks on the .no-results item
    $search.addEventListener("click", function (event) {
        if (event.target.classList.contains("no-results")) {
            return;
        }
        $input.value = event.target.innerText;
    });

    $search.addEventListener("keydown", function (event) {
        // ignore the event if we are just displaying the .no-results element
        if ($suggestionsWrapper.querySelector(".no-results")) {
            return;
        }
        // cache the suggestions / selected suggestion for this function
        var $suggestions = $suggestionsWrapper.querySelectorAll("li");
        var $selected = $suggestionsWrapper.querySelector("li.selected");

        switch (event.key) {
            case "ArrowUp":
                moveSelection("up");
                break;
            case "ArrowDown":
                moveSelection("down");
                break;
            case "Enter":
                if (!$selected) {
                    return;
                }
                $input.value = $selected.innerText;
                $suggestionsWrapper.innerHTML = "";
                break;
            case "Escape":
                $suggestionsWrapper.innerHTML = "";
                break;
        }

        // this function is a nested utility
        // it gets passed direction (up/down) to decide what to do
        // but it sees the cached selections in order not to calculate them again / pass too many params
        // it is an acceptable compromise between readability and performance
        function moveSelection(direction) {
            if (!$suggestions.length) {
                return;
            }
            if (!$selected) {
                if (direction === "up") {
                    $suggestions[$suggestions.length - 1].classList.add(
                        "selected"
                    );
                    return;
                }
                $suggestions[0].classList.add("selected");
                return;
            }

            var $target =
                direction === "up"
                    ? $selected.previousElementSibling
                    : $selected.nextElementSibling;

            if (!$target) {
                return;
            }
            // since you just have one selected element at time
            // it is enough to remove the class from the current
            // and to add it to the $target (decided based on the direction)
            $selected.classList.remove("selected");
            $target.classList.add("selected");
        }
    });
})();
