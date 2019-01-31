# Database Testing


## Introduction
Supercharge helps you to test your database-driven application. When using Supercharge's `base-test` utility, it will automatically connect to your default database connection. This ensures an active database connection throughout each test case.

Supercharge closes open database connections after finishing the test runs. You don’t need to care about database connection handling.


## Manually Reset the Database After Test Runs
Supercharge will not automatically clean up your database after tests. You need manually delete test entries and [fake data](/docs/{{version}}/testing-fakes) created while running your tests.

The [testing lifecycle hooks](/docs/{{version}}/create-and-debug-tests#lifecycle-hooks) are well-suited to clean up your test data.


## Fake Users
Some of your test cases may rely on existing database entries. Supercharge provides the `async fakeUser()` method to conveniently create a fake user in the database. You may want to delete it after your test runs.

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


## Delete Fake Users
You need to manually delete test data from your database. Supercharge exposes convenience methods to remove fake users from the database.


### Delete User
Deleting a single user in Supercharge tests can be done using the  `deleteUser(user)` or ´deleteUserById(id)` methods:

```js
const BaseTest = util('base-test')

class FakeUserTest extends BaseTest {
  async deleteUser (t) {
    const user = await this.fakeUser()

    await this.deleteUser(user)
    // or
    await this.deleteUserById(user.id)

    t.pass()
  }
}

module.exports = new FakeUserTest()
```


### Delete All Users
Instead of deleting users one by one, you can delete all entries at once using the `deleteUsers()` method:

```js
const BaseTest = util('base-test')

class FakeUserTest extends BaseTest {
  async deleteAllUsers (t) {
    await this.deleteUsers()

    t.pass()
  }
}

module.exports = new FakeUserTest()
```

