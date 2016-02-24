# PostCSS Remove Nodes [![Build Status][ci-img]][ci]

[PostCSS] plugin to remove rules and declarations from stylesheets.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/esko/postcss-remove-nodes.svg
[ci]:      https://travis-ci.org/esko/postcss-remove-nodes

```css
/* Input */

.foo {
    background-color: black;
}

#bar {
    width: 100%;
}

@remove #bar;

.foo {
    @remove background-color;
    background-color: black;    
}
```

```css
/* Output */

.foo {}

.foo {
    background-color: black;
}
```

Also works inside media queries: 

```css
/* Input */


.foo {
    color: blue;
}

@media screen and (min-width: 750px) {
    .foo {
        color: black;
    }
    
    .bar {
        text-decoration: blink;    
    }
}

@media screen and (min-width: 750px) {
    .foo {
        @remove color;
        color: red;
    }
    
    @remove .bar;
}
```

```css
/* Output */

.foo {
    color: blue;
}

@media screen and (min-width: 750px) {
    .foo { }
}

@media screen and (min-width: 750px) {
    .foo {
        color: red;
    }
}

```

## Usage

```js
postcss([ require('postcss-remove-nodes') ])
```

See [PostCSS] docs for examples for your environment.
