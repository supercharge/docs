# Development


## Accessing Supercharge Classes
The Supercharge framework provides a solid core for your application. You may pull out classes from the framework and use them into your app.

You have two options to access Supercharge framework classes:

1. Destructure the needed classes
2. Import “namespace-like” each class individually

```js
const { Config } = require('@supercharge/framework')

const Config = require('@supercharge/framework/config')
```

When using destructuring, you may pull out multiple classes at once:

```js
const { Config, Database, Mailer } = require('@supercharge/framework')
```

There’s no advantage for one method over the other. Choose your imports the way you like it.


## Debugging
It’s common during development to debug individual pieces of your code. Here are some tips we noticed to be helpful while debugging Supercharge apps.


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
