# Decorations


## Introduction
Tba.

- `server`
- `request`
- `toolkit`: also known as `(h)`


## Create a Decoration
In plugins

```js
module.exports = {
  name: 'decorate-request-docs',
  register: (server) => {
    server.decorate('request', 'docs')

}
```
