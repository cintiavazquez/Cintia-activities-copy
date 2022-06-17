# Colorful Console

**Important** the `chalk` module is ESM only from v5 onwards.

Please install v4 this way:

```bash
npm i chalk@4
```

The exercise is just:

- a GET route with a from;
- a POST that logs the sent text in the sent color in the server console, and sends it back to the browser as well.

You may show:

```js
const { color, text } = request.body;

if (color === 'red') {
    console.log(chalk.red(text));
} else if (color == 'blue') {
    console.log(chalk.blue(text));
} else ...
```

And then explain why this would cause physical pain to you.

Nice to demo the bug you get when you do:

```js
console.log(chalk[color](text));
```

When `color` is something not included in the `chalk` library (editing the select options via devtools should suffice). Let the students come up to a solution, usually the 2 schools of thought are defaulting with `||` or try/catch.