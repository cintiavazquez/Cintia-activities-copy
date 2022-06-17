# Handlebars

The challenge is to include the template in the HTML document itself, because it is code that's not having a direct visible effect right away.

This is a concept that should just be embraced for now - it was the actual way of doing it before the advent of bundlers.

For this activity one template is enough. It's still useful to include the template loader utility at the beginning of the file:

```js
function loadHandlebarTemplates() {
    // residual from moltiple <script> tag era, where this was the way of ensuring
    // a variable was initialised across files
    Handlebars.templates = Handlebars.templates || {};

    // compiles each template and populates the object above using the template element id attribute as key
    document
        .querySelectorAll('script[type="text/x-handlebars-template"]')
        .forEach(
            (script) =>
                (Handlebars.templates[script.id] = Handlebars.compile(
                    script.innerHTML
                ))
        );
}
```

Then one can simply do:

```js
loadHandlebarTemplates();

var authors = [...];

document.querySelector(<targetHTMLElement>).innerHTML = Handlebars.templates.authors({ authors });
```

The rest of the work is inside the template itself:

```handlebars
{{#authors}}
    <article class="author">
        <header>
            <h2>{{name}} <time>{{ born }}</time> - <time>{{ died }}</time></h2>
        </header>
        <img src="{{photo}}" alt="{{name}}"/>
        <blockquote>{{quote}}</blockquote>
        <section>
            <h3>Selected Works</h3>
            <ul>
                {{#selectedWritings}}
                <li>{{.}}</li>
                {{/selectedWritings}}
            </ul>
        </section>
    </article>
{{/authors}}
```