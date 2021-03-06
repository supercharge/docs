# Testing
Testing is an important aspect of every application. Manually testing new features and simultaneously ensuring the stability of existing functionality is tedious. You don’t want to send dozens of request or visit all affected pages to verify the functionality.


## Introduction
Supercharge includes a testing utility called `base-test`. This testing utility is an implementation on top of [AVA](https://github.com/avajs/ava). AVA is a test runner taking advantage of parallel test runs through Node.js’s async nature.

The `base-test` abstracts the common AVA callback-style testing to a class-based testing. The benefit of class-based testing in Supercharge is that you can built your tests with helpers provided by the framework.

The default Supercharge application comes with a `test` directory. The `test` directory is the place where you put all your test files. Inside of `test`, you’ll find the `integration` and `unit` directories. Put your files in one of the two folders, depending on the type of test you write.

Unit tests focus on a small piece of your code, mostly on a single method. Integration tests in contrast test a multiple aspects of your code and how they interact with each other. Imagine an integration test like a request from an end user against your application.


## Environment
Running tests in Supercharge will automatically set up a testing environment. Supercharge sets the `NODE_ENV=testing` environment variable and also initializes the [global helper functions](/docs/{{version}}/globals). All globals are available in your tests as they are during application development.

In the `testing` environment, Supercharge tries to load the configuration from an `.env.testing` file. The `.env.testing` file should be located in the root of your project. Notice that Supercharge won't load the `.env` file in the testing environment.


## Run Tests
To test your application run the following command from your terminal:

```bash
npm test
```

The `npm test` command is defined in the `package.json` file. This file is located in Supercharge’s root directory. If you want to use another Node.js test runner, go ahead and update the command to your needs.


### Run a Single Test
Running `npm test` from your terminal will process all existing test files. Use the `npm run test-single` command to run a single test:

```bash
npm run test:method <testMethodName>
```

The `<testMethodName>` represents the class method that you want to test. AVA compares the given parameter value with the registered tests and only runs the matches.


## Ignored Files and Folders
Supercharge will ignore the directories named `fixtures`, `helper` and `node_modules` when running tests. Supercharge also ignores all files if the file name starts with an underscore `_`. This convention lets you put helper files in the same directory as your test files.
