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
The typical approach extending a JavaScript class is applying a custom function to the class’ prototype. This adds the given function to the class and makes it callablel on class instances. Here’s how you would do it:

```ts
class User {
  private firstname: string = 'Supercharge'
}

// in another file/package
User.prototype.greet = function () {
  return `Hello ${this.firstname}!`
}
```


## Using Macroable
The `Macroable` class is a base class exposing methods to extends a class prototype in a declarative way. We call this declarative way "adding a macro". You may also determine whether a method is macro’ed to the class. Or you can remove all macros from a class.


### Adding Macros
Add a macro to a class by extending the `Macroable` class and calling the static `Class.macro(name, method)` function:

```js
import { Macroable } from '@supercharge/macroable'

class User extends Macroable {
  private firstname: string = 'Supercharge'
}

// in another file/package
User.macro('hello', function () {
  return `Hello ${this.firstname}!`
})

const user = new User()

user.hello()
// Hello Supercharge!
```


### Has Macro
You may determine whether a function on a class was added as a macro using the `hasMacro` method:

```ts
Macroable.hasMacro('method-name')
```

Here’s an example of checking whether a class’s method is a macro function:

```ts
import { Macroable } from '@supercharge/macroable'

class User extends Macroable {
  greeting(): string {
    return 'Hello World!'
  }
}

User.macro('hello', function () {
  return `Hello ${this.firstname}!`
})

User.hasMacro('hello')
// true

User.hasMacro('greeting')
// false   -- because "greeting" was not macro’ed to the class
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
A shortcoming for macros are IntelliSense in your editor. During development you want your editor to show autocompletions while typing. Dynamically adding methods to a class using macros won’t add type definitions to your code.

A way to add IntelliSense support is using TypeScript’s interface merging. For example, the `HttpRequest` class in the Supercharge framework is macroable. Any third-party package adding methods to the request can also inject typings using declaration merging. Merge your types by defining a module for the extended package and export the extended interface:

```ts
declare module '@supercharge/http' {
  export interface HttpRequest {
    session(): Session
  }
}
```

You should add the extended interface declarations in your typings file (typically a `.d.ts` file) or in one of your package’s exported files.
