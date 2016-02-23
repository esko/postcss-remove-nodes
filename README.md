# PostCSS Remove Nodes [![Build Status][ci-img]][ci]

[PostCSS] plugin to remove rules and properties from stylesheets..

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/esko/postcss-remove-nodes.svg
[ci]:      https://travis-ci.org/esko/postcss-remove-nodes

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-remove-nodes') ])
```

See [PostCSS] docs for examples for your environment.
