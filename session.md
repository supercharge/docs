# HTTP Sessions


## Overview
Sessions provide a way to transition HTTP application from being stateless to stateful. Stateful applications save information about users across multiple requests. For example, identifying users across requests is useful in session-based authentication.


## Configuration
Your application’s session options are stored in the `config/session.ts` configuration file. This config file allows you to customize the default session driver and driver-specific configuration.

By default, Supercharge uses the `cookie` driver to store session data.


### Available Session Drivers
Supercharge ships with different session backends. All session backends are access in a driver-based approach exposing the same interface. Following the same interface allows you to switch from one session backend to another by changing a single line of configuration:

| Driver           | Description                                  |
|----------------  |--------------------------------------------- |
| `memory` &nbsp;  | Stores session data in memory. Forgets all session data when restarting the server. Useful for testing |
| `cookie`         | Stores the session data in a cookie          |

We welcome every contribution for new session drivers. You can submit a pull request adding a new driver or you may ask for an implementation by creating an issue [in the framework’s GitHub repository](https://github.com/supercharge/framework).



## Interacting with the Session
The session is available on the `request` instance. The request is part of the HTTP context which is available as the first parameter in all routes, route controllers, and middleware.


### Retrieving Data
Here’s an example how to retrieve an item from the session using a given identifer:

```ts
import { Controller } from '@supercharge/http'
import { HttpContext } from '@supercharge/contracts'

export class UserLoginController extends Controller {
  /**
   * Handle the request.
   */
  handle ({ request }: HttpContext): HttpRedirect {
    const value = request.session().get('key')

    // …
  }
}
```

You may also pass a default value as the second argument of the `session.get(key, defaultValue)` method. The default value will be returned if the given `key` is not stored in the session or the related value is `null` or `undefined`:

```ts
const value = request.session().get('key', 'default')
```

The default value can be of any type. It doesn’t need to be a string value.


#### Retrieving All Session Data
You may retrieve the full session data object instead of single keys by using the `all` method:

```ts
const sessionObject = request.session().all()
```


#### Retrieving and Deleting an Item
Sometimes it’s useful to retrieve and item from the session and delete it in a single operation. Use the `pull` method to fetch a session item and remove it immediately:

```ts
const value = request.session().pull('key')
```

The `pull` method returns `undefined` if no session item is present for the given key.

You may also pass a default value as the second argument:

```ts
const value = request.session().pull('key', 'default')
```


#### Determine If the Session Contains an Item
Determine if an a given `key` exist in the session by using the `has` method. The `has` method returns a boolean value. It returns `true` if the session has an item for the given key and it’s value is not `null` or `undefined`:

```ts
const hasKey = request.session().has('key')
// true
```


### Storing Data
Store data in the session using the `set` method. The `set` method accepts a key-value-pair as two separate parameters:

```ts
request.session().set('key', 'value')

// or use the `put` alias method
request.session().put('key', 'value')
```

```info
We provide a `request.session().put(key, value)` method as an alias to `set`. Both work the same way.

Please use the method that fits your naming needs the best.
```

You can also pass an object as a single argument assigning multiple key-value-pairs at once:

```ts
request.session().set({
  key: 'value',
  name: 'Supercharge'
})
```

The `set` method returns the session instance. This allows you to chain further operations when using `set`:

```ts
const data = request.session()
  .set('key', 'value')
  .set('name', 'Supercharge')
  .all()
```


### Flash Data
- *added in version 3.15*

Sometimes you want to store session items only for the next request. The `flash` method is doing that for you. Flash messages are used for short-lived data, like a success or error message. Flash data is only available to the subsequent request and deleted from the session store after that:

```ts
request.session().flash('successmessage', 'You’ve completed the task.')
```


#### Keeping Flash Data
In some situations you need to persist flash messages across multiple requests. Use the `reflash` method to keep flash messages for an additional request:

```ts
// keep all flash data for another request
request.session().reflash()
```

You can selectively keep flash data for the next request by providing the keys to the `reflash` method:

```ts
request.session().reflash('username', 'email')

// or use an array
request.session().reflash(['username', 'email'])
```


### Deleting Data
Delete items from the session using the `delete` method. The `delete` method accepts a single `key` or a list of keys that should be removed from the session:

```ts
request.session().delete('key')

// delete multiple keys
request.session().delete('key', 'name', 'other')
```

You can also delete all session data by using the `clear` method:

```ts
request.session().clear()
```


### Regenerating the Session ID
Generating a new session ID is a usual security operation. For example, you’re protecting your users against [session fixation attacks](https://owasp.org/www-community/attacks/Session_fixation) by regenerating a session ID.

Use the `regenerate` method in case you need to manually regenerate the session ID:

```ts
request.session().regenerate()
```


### Invalidating the Session
You can combine the operations to generate a new session ID and clear all existing session data using the `invalidate` method:

```ts
request.session().invalidate()
```
