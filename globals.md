# Globals
Node.js doesn’t automatically resolve class names and references. You can’t import namespaced classes or function references.

For convenience, Boost exposes half a dozen global variables. You can access them everywhere in your Boost app. The global variables are path resolvers and reference Boost’s application classes, like utilities, events, models, and more.



## Utilities: `util`
Boost ships with dozens of utilities located at `boost/utils`. You can reference an individual utility using the global `util` helper function that accepts a path reference as a parameter.

**Examples:**

```js
const Config = util('config')
// or
const Dispatcher = util('event/dispatcher')
```

Typically, you don’t need nested paths like the event dispatcher in the example above. If you do, you can surely do that.


## Models: `model`
Find all models in your `app/models` folder. To import a model, use the `model` helper function.

**Example:**

```js
const User = model('user')

const user = await User.findByEmail(email)
```

The `model` function takes the model name as an argument. You need to export every model from the `app/models/index.js` file to make it available to the model helper. Boost uses the model’s `index.js` file to define relationships and avoid circular imports in individual model files.


## Events: `event`
Created events should go into the `app/events` directory. To access individual events, use the `event` helper function.

**Example:**

```js
const Event = util('event')
const UserRegisteredEvent = event('user-registered')
//or
const NestedEventPath = event('auth/user-registered')

Event.fire(new UserRegisteredEvent(user))
```


## Mails: `mail`
Place all email classes in the `app/mails` directory. This will give you quick access to individual emails using the `mail` helper function.

**Example:**

```js
const Mailer = util('mailer')
const PasswordResetMail = mail('password-reset')

Mailer.send(new PasswordResetMail())
```


## Missing Auto-Completion
Custom globals aren’t supported for Auto-complete in editors or IDEs. They can’t resolve them properly. This is a tradeoff you’re buying into when using Boost’s globals. Use `require` to work around the auto-complete shortcoming.

