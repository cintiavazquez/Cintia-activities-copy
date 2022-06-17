# Incremental search

Use `type="search"` and `autocomplete="off"` before you get crazy!

In isolation, discuss how to return an array of countries from the general array, given a query string:

```js
function findCountries(query) {
    // since the query is not going to change through the filter operation,
    // we can run the toLowerCase operation just once here
    var lowerQuery = query.toLowerCase();
    return countries
        .filter((country) => country.toLowerCase().startsWith(lowerQuery))
        .slice(0, MAX_COUNTRIES);
}
```

You can use a regular `for` + `array.push`. The important thing is to wrap the considerations inside a function in order to keep the DOM code clean.

Clearing results: ok, clearing the `innerHTML` is not the best way - [this would be](https://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript). Bur for keeping the work short it is acceptable (this was done with `$(...).empty()`) before.

## User stories

It's a nice chance for discussing feature requirements - everything can and should be expressed in clear and written form _before_ starting to work:

- as a user, when I start typing in the field, I should see country suggestions matching what I am typing;
- as a user, when I click on a suggestion, the input field should be filled with such suggestion and the suggestion list should go away;
- as a user, if I type something that does not match any suggestion, a "no results" entry should be displayed;
- as a user, when the suggestion list is open and no suggestion is selected, if I press the down key the first suggestion should become selected;
- as a user, when the suggestion list is open and no suggestion is selected, if I press the up key the last suggestion should become selected;
- as a user, when the suggestion list is open and any suggestion is selected, if I press the up key the previous suggestion should become selected;
- as a user, when the suggestion list is open and any suggestion is selected, if I press the down key the next suggestion should become selected;
- as a user, when the suggestion list is open and any suggestion is selected, if I press the Enter key the input field should be filled with the selected suggestion and the suggestion list should go away;
- as a user, when the suggestion list is open and any suggestion is selected, if I press the Esc key the input the suggestion list should go away.

(and we are leaving out the focus and blur ones)

If they think this is too much nitpicking for a single input field, show them [the most successful single field ever](https://www.google.com).
