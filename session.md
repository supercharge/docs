# HTTP Sessions


## Introduction
Storing information across HTTP requests is one of the key requirements in web applications. A typical use-case is remembering a user after login. Supercharge ships with driver-based session, meaning that a driver provides a unified interface to interact with the session data.


## Configuration
Your Supercharge application comes with a session configuration file located at `config/session.js`. Have a look at the individual options in the configuration file. Tweak the settings to your needs.

By default, Supercharge uses the `cookie` session driver storing the session data inside an encrypted cookie. Here's a list of available drivers:

| Session Driver   	| Description 	|
|-----------------	|-------------------	|
| `cookie`        	| Stores sessions in an encrypted cookie |
| `file`        	| Stores sessions in `storage/framework/session`. You can adjust the location in the session configuration |

```info
At this point, Supercharge has no session support for fast key-value stores such as Redis. Your support is highly appreciated [sending a pull request to add Redis session support](https://github.com/superchargejs/framework).
```


## Using the Session
Working and interacting with the session requires the `request` object which is available along the request lifecycle. Supercharge decorates an incoming request with a `request.session` instance and initializes the session at the [`onPreAuth` request lifecycle extension point](/docs/{{version}}/request-lifecycle). The session instance provides a handful of methods to retrieve, store, and delete values.


### Retrieve Data
Use the `request.session.get()` method to retrieve an item from the session:
```js
module.exports = {
  method: 'GET',
  path: '/home',
  handler: (request, h) => {
    const value = request.session.get('key')

    return `Session value: ${value}`
}
```

The `session.get()` function allows you to pass a second argument representing a default value. In case the session has no value for the given key, it returns the default value:

```js
module.exports = {
  method: 'GET',
  path: '/home',
  handler: (request, h) => {
    const lastVisit = request.session.get('last-visit', new Date())

    return `Your last visit: ${lastVisit}`
}
```

#### Retrieve All Session Data
Use the `all()` method to retrieve all values currently stored in the session:

```js
const data = request.session.all()
```


#### Determine if a Session Item Exists
If you want to determine whether a session value exists, use the `has()` method:

```js
const data = request.session.has('key')
```

This method returns `true` if the session stores the given `key` even though the value may be `null` or `undefined`.


### Store Data
Use the `set` method to store data in the session:

```js
request.session.set('key', 'value')
```

The `session` instance provides a convenience method `remember()` with the same signature and functionality as `set()`.

```js
request.session.remember('key', 'value')
```

Feel free to use the method you can remember.


### Delete Data
Deleting data from a session may include a single item or wiping the whole session.


#### Delete a Single Session Item
To delete a single item, call the `forget()` method to remove the given item from session:

```js
request.session.forget('key')
```


#### Clear All Session Data
Clearing an existing session and reseting all data can be done using the `clear()` method:

```js
request.session.clear()
```


#### Retrieve and Delete a Session Item
You may also retrieve an item from and simultaneously remove it from the session using the `pull()` method:

```js
const item = request.session.pull('key', 'default-value')

request.session.has('key')
// false
```


## Add Your Session Driver
The Supercharge session manager provides an `extend` method allowing you to add your custom session drivers. Your driver must implement a handful of methods to properly work with the framework.


### Implement the Session Driver
Extending Supercharge with your custom session driver is a seamless process, just taking a couple of steps. At first, you need to implement your custom session driver. A session driver is a JavaScript class implementing the `start`, `stop`, `read`, `write`, and `touch` methods. Here's a sample Redis session driver:

```js
'use strict'

class RedisSessionDriver {
  constructor (config) { }
  async start () { }
  async stop () { }
  async read (sessionId) { }
  async write (sessionId, data) { }
  async touch (sessionId) { }
}

module.exports = RedisSessionDriver
```

```info
If you're looking for a place to put your Redis session driver, we recommend to create the `app/extensions` directory. This directory is not part of your Supercharge application and you need to create it yourself.
```

### Register the Session Driver
Once you finish the implementation of your session driver, you can register it to the Supercharge framework. The session bootstrapper located within `app/bootstrappers` already outlines how to register it. Basically, you need to call `Session.extend()` and pass the driver name and implementation as arguments:

```js
'use strict'

const Session = require('@supercharge/framework/session')
const RedisSessionDriver = require('../extensions/redis-session-driver')
const Bootstrapper = require('@supercharge/framework/session/bootstrapper')

class SessionBootstrapper extends Bootstrapper {
  constructor (server) {
    super()

    this.server = server
  }

  async boot () {
    Session.extend('redis', RedisSessionDriver)

    await super.boot()
  }
}

module.exports = SessionBootstrapper
```


### Configure the Session Driver
Ultimately, tell Supercharge to use the Redis session driver by using `redis` as the driver in your `config/session.js`.
