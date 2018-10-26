# Database Testing


## Introduction
Boost helps you to test your database-driven application. When using Boost's `base-test` utility, it will automatically call connect your default database connection. This ensures an active database connection throughout each test.

Boost closes open database connections after finishing all test cases in a test file. You don't need to care about database connection handling.


## Reset the Database after Each Test
Boost will not automatically clean up your database after tests. This is a manual task and left in your hands. You need manually delete test entries and [fake data](/docs/{{version}}/testing-fakes) created while running your tests.

The [testing lifecycle hooks](/docs/{{version}}/create-and-debug-tests#lifecycle-hooks) are well-suited methods to clean up your test data.


## Fake Users
Some of your test cases may rely on existing database entries. Boost provides the `async fakeUser()` method to conveniently create a fake user. This user will be stored in the database. You may want to delete it after your test runs.

```js
const BaseTest = util('base-test')

class FakeUserTest extends BaseTest {
  async createFakeUser (t) {
    const user = await this.fakeUser()

    t.pass()
  }
}

module.exports = new FakeUserTest()
```

You can also pass user data to `async fakeUser(data)`. This is helpful for test cases where you need to know the exact user data, e.g. for assertions.

```js
const BaseTest = util('base-test')

class FakeUserTest extends BaseTest {
  async createFakeUser (t) {
    const user = await this.fakeUser({
      password: 'tester',
      email: 'user@fs.io',
      scope: ['admin', 'user']
    })

    t.pass()
  }
}

module.exports = new FakeUserTest()
```
