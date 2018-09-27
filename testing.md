# Testing
Testing is an important aspect of every application. Manually testing new features and simultaneously ensuring the stability of existing functionality is tedious. You don’t want to send dozens of request or visit all affected pages to verify the functionality.


## Introduction
Boost includes a testing utility called `base-test`. This testing utility is an implementation on top of [AVA](https://github.com/avajs/ava). AVA is a test runner taking advantage of parallel test runs through Node.js’ async nature.

The `base-test` abstracts the common AVA callback-style testing to a class-based testing. The benefit of class-based testing in Boost is that you can built your tests with helpers provided by the framework.

The default Boost application comes with a `test` directory. Put all your test files into this directory. The `test` directory contains the `integration` and `unit` folders. Unit tests focus on a small piece of your code, mostly on a single method. Integration tests in contrast test a multiple aspects of your code and how they interact with each other. Imagine an integration test like a request from an end user against your application.


## Environment
Text

`.env.testing`


## Run Tests
To test your application run the following command from your terminal:

```bash
npm test
```

The `npm test` command is defined in the `package.json` file that is located in Boost’s root directory. If you don’t want to rely on the default testing setup using AVA, update the script accordingly.


### Run a Single Test
Running `npm test` from your terminal will process all existing test files. Use the `npm run test-single` command to run a single test:

```bash
npm run test-single <testMethodName>
```

The `<testMethodName>` represents the class method that you want to test. AVA compares the given parameter value against the registered tests and only runs the match.


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
