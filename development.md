# Development
Tba.


## Accessing Supercharge Classes
Tba.

```js
const { Config } = require('@supercharge/framework')

const Config = require('@supercharge/framework/config')
```


## Debugging
Tba.


### Visual Studio Code
Tba.

A recommended debugging configuration:

```json
{
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Supercharge",
      "program": "${workspaceFolder}/server.js",
      "skipFiles": [
        "node_modules/**/*.js",
        "<node_internals>/**/*.js"
      ]
    }
  ]
}
```
