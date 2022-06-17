# Spotify Search

## Markup

The important elements are the `<form>` and the `.results` section.

The form has an input for the query, and a select for the type (a radio would work too):

```html
<form>
    <input
        type="search"
        name="query"
        placeholder="Type some text to search"
        required
        class="query-field"
    />
    <select name="type" class="type-field">
        <option value="artist">Artist</option>
        <option value="album">Album</option>
    </select>
    <button type="submit">Search</button>
</form>
```

The results should have an empty title, an empty list, and a more button of some kind, that should be hidden by default and displayed just if there are more results to show:

```html
<section class="results">
    <h2 class="result-title"></h2>
    <ul class="result-list"></ul>
    <p>
        <button class="load-more-button">More</button>
    </p>
</section>
```

## JS

First, listen to the submit form of the event (prevent the default behaviour), then show how to extract the data. Either getting them from previous cached selectors or from the `event.target` is fine:

```js
const query = $queryField.value;
const type = $typeField.value;
// OR
const query = event.target.query.name;
const type = event.target.type.name;
```

It's time for having a dry run of a fetch call to the API with the params.
Students should already have embraced the asynchronous nature of fetch operations, so they story will continue in the callback / `.then`.

From there, do some considerations about manipulating the DOM with the just retrieved data.

Split the work in opportune functions - `getSpotifyData`, `renderItems`...also a good moment for reviewing function scope, since some variables are visible from within those auxiliary functions.

Don't get carried away with making the code too clever - it's important that the student feel the "pain" of working imperatively - they will enjoy React later!