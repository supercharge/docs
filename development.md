# Development


## Accessing Supercharge Classes
The Supercharge framework provides a solid core for your application. You may pull out classes from the framework and use them into your app. For example, you can access Supercharge’s configuration utility like this:

```js
const Config = require('@supercharge/framework/config')
```


## Debugging
It’s common during development to debug individual pieces of your code. Here are some tips we noticed being helpful while debugging Supercharge apps.


### Visual Studio Code
Visual Studio Code ships with a solid debugger. The default debugger configuration for Node.js steps into every file, also the Node.js core and imported packages.

You may want to focus the Visual Studio Code debugger to only step through your application code. We recommended the following debugging configuration that uses the `skipFiles` property to skip any dependency from the Node.js core and `node_modules`:

```json
{
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "My Supercharge App",
      "program": "${workspaceFolder}/server.js",
      "skipFiles": [
        "node_modules/**/*.js",
        "<node_internals>/**/*.js"
      ]
    }
  ]
}
```
