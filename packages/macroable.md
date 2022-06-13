# Macroable


## Overview
The [`@supercharge/macroable`](https://github.com/supercharge/macroable) package provides a base class allowing you to extend the class prototype in a declarative way. Extending the prototype allows you to add functions to an ES6 class in JavaScript or TypeScript from third party packages.


## Installation
The [`@supercharge/macroable`](https://github.com/supercharge/macroable) package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/macroable
```


```success
You can use this package with every project even if it’s not build on Supercharge. Enjoy!
```


## CommonJS, ESM, and TypeScript Support
The macroable package supports both module loaders: CommonJS and ESM (and also TypeScript). Import the `Macroable` class in your projects like this:

```js
// ESM and TypeScript
import { Macroable } from '@supercharge/macroable'

// CommonJS
const { Macroable } = require('@supercharge/macroable')
```


## Traditional Approach


## Using Macroable
Tba.

### Adding Macros
Tba.

```js
import { Macroable } from '@supercharge/macroable'

class User extends Macroable {
  private firstname: string = 'Supercharge'
}

User.macro('hello', function () {
  return `Hello ${this.firstname}!`
})

const user = new User()

user.hello()
// Hello Supercharge!
```


### Has Macro
You can remove all macros from a class using the static `flushMacros` method:

```ts
Macroable.hasMacro('method-name')
```


### Deleting Macros
You can remove all macros from a class using the static `flushMacros` method:

```ts
Macroable.flushMacros()
```

**Notice:** flushing all macros removes all added methods from the class prototype, entirely. All macros are gone from the point you’re calling the flush method.

```ts
import { Macroable } from '@supercharge/macroable'

class User extends Macroable {
  private firstname: string = 'Supercharge'
}

User.macro('hello', function () {
  return `Hello ${this.firstname}!`
})

User.flushMacros()

const user = new User()
user.hello
// undefined
```


## Adding IntelliSense
Tba.

Use TypeScript interface merging.

```ts
declare module '@supercharge/http' {
  export class Request {
    session(): Session
  }
}
```
