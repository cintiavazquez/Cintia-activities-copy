# Hamburger Menu

First, show how the transition works by directly manipulating the element class attribute inside the browser devtools!

Then proceed to run `document.body.classList.add('nav-open')` inside the console, and let the students think how/where they should call the instructions inside their code.

---

One can quickly show abominations like:

```js
const openButton = document.querySelector(".nav-toggle");
        
openButton.addEventListener("click", () => {
    if (document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
    } else {
        document.body.classList.add('nav-open');
    }
})
```

Just so that students can see the superiority of `Element.classList.toggle` ^^

Since openers and closers cannot be visible at the same time, having one single action handler + toggle is enough!

Also, having the opaque overlay makes things easy: intercepts events "outside" the nav, and provides a nicer UI effects by focusing the nav more.

Bonus: how to make the nav come from the left?