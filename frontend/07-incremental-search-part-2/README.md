# Incremental search - part 2

The change is just:

```js
$input.addEventListener(..., function (event) {
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
```

This ensures that the response matches what the user is typing:

```js
if (query !== $input.value) {
    return;
}
```