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

            var results = findCountries(query);

            // append the .no-results element in case there are no results
            if (!results.length) {
                $suggestionsWrapper.innerHTML +=
                    "<li class='no-results'>No results</li>";
                return;
            }

            // else, append a suggestion for every result
            results.forEach(
                (result) =>
                    ($suggestionsWrapper.innerHTML += `<li>${result}</li>`)
            );
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

    function findCountries(query) {
        // since the query is not going to change through the filter operation,
        // we can run the toLowerCase operation just once here
        var lowerQuery = query.toLowerCase();
        return countries
            .filter((country) => country.toLowerCase().startsWith(lowerQuery))
            .slice(0, MAX_COUNTRIES);
    }

    // hoisting helps ^^
    var countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Costa Rica",
        "Côte D'Ivoire",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Democratic People's Republic of Korea",
        "Democratic Republic of the Congo",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People’s Democratic Republic",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Republic of Korea",
        "Republic of Moldova",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Tajikistan",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United Republic of Tanzania",
        "United States of America",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Viet Nam",
        "Yemen",
        "Zambia",
        "Zimbabwe",
    ];
})();
