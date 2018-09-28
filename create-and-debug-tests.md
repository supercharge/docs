# Create and Debug Tests
Tba.


## Create Tests
Text


### Lifecycle Hooks
Text

```js
const BaseTest = util('base-test')

class TestWithLifecycleHooks extends BaseTest {
  async before (t) {}
  async beforeEach (t) {}

  async afterEach (t) {}
  async after (t) {}

  async alwaysAfter (t) {}
}
```

Text


### Assertions
Text

```js
const BaseTest = util('base-test')

class Assertions extends BaseTest {
  async assertions (t) {
    t.is(1, 1)

    // many more assertions

    t.pass()
  }
}
```

Text


### Run Tests Serially
Text

```js
const BaseTest = util('base-test')

class Serial extends BaseTest {
  async serialFirst (t) {
    // runs first
  }

  async serialSecond (t) {
    // runs second, after first finished
  }
}
```

Text


### Run Specific Tests
Text

```js
const BaseTest = util('base-test')

class Only extends BaseTest {
  async onlyTest (t) {
    // processed
  }

  async anotherTest (t) {
    // not processed
  }
}
```

Text


### Skip Tests
Text

```js
const BaseTest = util('base-test')

class Skip extends BaseTest {
  async skipTest (t) {
    // skipped
  }

async doNotSkip (t) {
    // not skipped
  }
}
```

Text


### Tests as “Todo”
Text

```js
const BaseTest = util('base-test')

class Todo extends BaseTest {
  async todoTest (t) {
    // marked as TODO
  }
}
```

Text


## Debug Tests
AVA runs tests in parallel using child processes. That’s why you need a workaround to attach a debugger to code in your tests.

Please follow the [advice on debugging with AVA](https://github.com/avajs/ava#debugging) given in the readme. You’ll find tips for populare IDEs and editors, like WebStorm and Visual Studio Code.
