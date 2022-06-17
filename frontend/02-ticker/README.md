# Ticker

Using `document.getElementsByTagName` for retrieving the elements saves you a lot of time, because the `HTMLCollection` it returns is synchronised with the DOM (while a `NodeList`, returned by `document.querySelectorAll` is not!).

Having a `speed` var for incrementing positions makes showing thing faster (and configurable for the final user);

Selecting elements like:

```js
var ticker = document.getElementById("myTicker");
var wrapper = ticker.querySelector(".ticker-wrapper");
var links = wrapper.getElementsByTagName("a");
```

shows how it is possible to make specific selections inside already selected elements - good for performance, even if not noticeable here.

Even if not a proper recursion, the animation uses two of the recursion definition rules:

- the recursive function calls itself;
- ~the recursive function makes a decision about when to stop the recursion~;
- the recursive function is called at least once somewhere in the code! (people usually forget this)