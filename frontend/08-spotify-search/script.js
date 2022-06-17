(function () {
    var API_URL = "https://spicedify.herokuapp.com/spotify/";
    var DEFAULT_THUMBNAIL = "https://via.placeholder.com/150x150";

    // form selectors
    var $form = document.querySelector("form");
    var $queryField = $form.querySelector(".query-field");
    var $typeField = $form.querySelector(".type-field");

    // result selectors
    var $results = document.querySelector(".results");
    var $resultTitle = $results.querySelector(".result-title");
    var $resultList = $results.querySelector(".result-list");
    var $moreButton = $results.querySelector(".load-more-button");

    // state variables
    var currentQuery;
    var currentType;
    var currentOffset = 0;

    $moreButton.addEventListener("click", function () {
        getSpotifyData(
            currentQuery,
            currentType,
            document.querySelectorAll(".result").length,
            function (items, hasNext) {
                $moreButton.classList.toggle("visible");
                if (!hasNext) {
                    currentOffset += 20;
                }

                $resultTitle.innerHTML =
                    "Results for <em>" +
                    currentQuery +
                    "</em> (" +
                    currentType +
                    ")";

                renderItems(items);
            }
        );
    });

    $form.addEventListener("submit", function (event) {
        event.preventDefault();

        var query = $queryField.value;
        var type = $typeField.value;

        if (query !== currentQuery || type !== currentType) {
            $resultList.innerHTML = "";
            $resultTitle.innerHTML = "";
            currentQuery = query;
            currentType = type;
            currentOffset = 0;
        }

        getSpotifyData(
            query,
            type,
            document.querySelectorAll(".result").length,
            function (items, hasNext) {
                $moreButton.classList.toggle("visible");
                if (!hasNext) {
                    currentOffset += 20;
                }

                $resultTitle.innerHTML =
                    "Results for <em>" + query + "</em> (" + type + ")";

                renderItems(items);
            }
        );
    });

    function renderItems(items) {
        items.forEach(function (item) {
            var img;

            if (item.images.length) {
                img = item.images[0].url;
            } else {
                img = DEFAULT_THUMBNAIL;
            }

            var output = "";
            // wrap the item name inside an <a> that points
            // to item.external_links.spotify
            output =
                "<li class='result'><img src='" +
                img +
                "'><a target='_blank' href='" +
                item.external_urls.spotify +
                "'>" +
                item.name +
                "</a></li>";
            $resultList.innerHTML += output;
        });
    }

    function getSpotifyData(query, type, offset, callback) {
        fetch(
            `${API_URL}?${new URLSearchParams({
                q: query,
                type: type,
                offset: offset,
            })}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (type === "artist") {
                    var hasNext = !!data.artists.next;
                    callback(data.artists.items, hasNext);
                } else {
                    var hasNext = !!data.albums.next;
                    callback(data.albums.items, hasNext);
                }
            });
    }
})();
