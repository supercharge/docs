# Testing Fakes
Complex setups should be as easy to test as possible. In unit tests, you may need to stub out methods from third-party libraries to mock behavior of individual methods. Boost's `base-test` wraps [Sinon.js](https://sinonjs.org/) to easily  create mocks, stubs, and spies or access Sinon itself.


## Sinon
Sinon is a powerful library and Boost's `base-test` does not expose all Sinon methods. It exposes the Sinon instance in your test cases via `this.sinon()` to quickly configure testing helpers in your test methods.


## Stubs
Boost lets you quickly stub out methods via `this.stub(args)`. This method uses Sinon to create the stub and passes all arguments down to Sinon. It returns the stub instance:

```js
const BaseTest = util('base-test')

class StubTest extends BaseTest {
  async createStub (t) {
    const stub = this.stub(console, 'log')

    t.pass()

    console.log.restore() // same as `stub.restore()`
  }
}

module.exports = new StubTest()
```

You need to manually restore created stubs. You can either call `stub.restore()` on the stub instance or `.restore()` on the stubbed method.


## Mocks
Create a mock in test methods using `this.mock(args)`. It uses Sinon to create the mock and passes all arguments down to Sinon. It returns the mock instance:

```js
const BaseTest = util('base-test')

class MockTest extends BaseTest {
  async createMock (t) {
    const api = { method: () => {} }
    api.method()

    const mocked = this.mock(api)
    mocked.expects('method').once()
    api.method()

    t.true(mocked.verify())

    mocked.restore()
  }
}

module.exports = new MockTest()
```

Make sure to manually restore mocks. You can either call `mock.restore()` on the mock instance or `.restore()` on the mocked method.


## Spies
Create a spy in tests using `this.spy(args)`. It uses Sinon to create the spy and passes all arguments down to Sinon. It returns the spy instance:

```js
const BaseTest = util('base-test')

class SpyTest extends BaseTest {
  async createSpy (t) {
    const spy = this.spy(Logger, 'info')

    Logger.info('testing')

    t.true(spy.called)
    spy.restore()
  }
}

module.exports = new SpyTest()
```

Make sure to manually restore spies. Either call `spy.restore()` on the spy instance or `.restore()` on the spied method.


## Random Key
You most likely need random keys in your test cases, for example to generate random usernames. Boost provides you the `randomKey(length)` method that generates a random string value.

```js
const BaseTest = util('base-test')

class RandomKeyTest extends BaseTest {
  async generateRandomKey (t) {
    const username = `user-${this.randomKey()}`
    console.log(username) // 'user-asdf2nfajswakl8n1fpx'

    t.pass()
  }
}

module.exports = new RandomKeyTest()
```

The default `length` of this random key is 20 characters. Customize the length by passing your desired length as an integer parameter.
