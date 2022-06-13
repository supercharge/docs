# Events


## Overview
Supercharge provides you a handy event dispatcher implementing a publish/subscribe model for events occuring in your application. Events are a great way to decouple logic in your application, for example from route handlers.

For example, a user registers for your application and you want to send a welcome mail. The route handler shouldn’t wait for the mailer to send the mail. Instead, you can dispatch a `UserRegistered` event to kick off a listener sending the mail.

You should put your event classes in the `app/events` directory and listeners into `app/listeners`. Supercharge will automatically pick up events and listeners when your server starts. Both directories may not exist in your application. You can go ahead and create them on your own or let the [Craft CLI](/docs/{{version}}/craft-console) create them when scaffolding events and listeners.


## Defining Events
Events in Supercharge are represented as classes. Each event class is a data container keeping the data for the listener. The event class also defines the identifier for listeners.

For example, imagine you’re publishing podcast episodes and want to dispatch an `EpisodePublished` event on each release. The related event may look like this:

```js
'use strict'

const Event = require('@supercharge/framework/event')

class EpisodePublished extends Event {
  /**
   * Create a new instance that keeps the event related data.
   * The event instance containing the  data is passed
   * to the event listeners.
   *
   * @param {Object} podcast - the related podcast
   */
  constructor (podcast) {
    super()
    this.podcast = podcast
  }

  /**
   * Returns the event identifier. Every listener for this event
   * must return the same value in their `on()` method.
   */
  emit () {
    return 'podcast.episode.published'
  }
}

module.exports = EpisodePublished
```

The event class itself has no logic to handle dispatched events itself. The `emit` method returns the event identifier each listener has to implement in their `on()` method. The `emit` function in events is optional. If you leave it, the event’s class name is used as the event identifier.


## Defining Listeners
Event listeners implement the actual event handling logic. The listeners receive the event instance in their `async handle(event)` method:

```js
'use strict'

class NotifyListenersAboutNewEpisode {
  /**
   * Returns the event name or an array of event names to listen on.
   *
   * @returns {String|Array}
   */
  on () {
    return 'podcast.episode.published'
  }

  /**
   * Handle the event.
   */
  async handle (event) {
    const podcast = event.podcast

    // notify subscribers about the new episode
  }
}

module.exports = NotifyListenersAboutNewEpisode
```

Remember that the `on()` method identifies the related event. If the event has no `emit()` method, the `on()` method of your listener should return the event’s class name.


### Listen for Node.js Process Events
Typically, you’ll use “user” events in your application. For situations where you want to listen for process or system events, you should implement the `type()` method.

For example, system events are `unhandledRejection`, `SIGTERM`, or any other low-level event you’ll receive through the Node.js `process`. Here’s a sample event listener for the `SIGTERM` event.

```js
'use strict'

class SigtermListener {
  on () {
    return 'SIGTERM'
  }

  /**
   * Handle the event.
   */
  async handle (event) {
    // gracefully shut down the system
  }

  /**
   * The event dispatcher supports the `user` and `system` types.
   * Use the `system` type for Node.js process listeners,
   * the `user` type for your custom events.
   */
  type () {
    return 'system'
  }
}

module.exports = SigtermListener
```


## Register Events & Listeners
If you put all your events into the `app/events` and event listeners into the `app/listeners` directories, the framework will automatically register the listeners to their events. Your responsibility is to ensure that listeners implement the `on()` method returning the event identifier they may listen on.


### Manually Register Events
Typically, you’ll register events and listeners as seperate classes. The event bootstrapper will then pick up all events and listeners and connect the related classes.

Supercharge still allows you to register a callback-based event manually using the `Event` class from the framework:

```js
const Event = require('@supercharge/framework/event')

Event.on('my.event.name', data => {
  // handle the event
})
```

Please notice that you can’t place these type of events in the `app/events` directory because Supercharge requires all files in this directory to be an event class.



## Dispatching Events
The `Event` class in the Supercharge framework provides a static `.fire()` method to dispatch events. You may pass an instance of the event to `Event.fire()` and the framework dispatches this event to all its registered listeners:

```js
const Event = require('@supercharge/framework/event')
const UserRegisteredEvent = require('../../events/auth/user-registered')

{
  method: 'POST',
  path: '/signup',
  options: {
    handler: async (request, h) => {
      // user signup logic

      Event.fire(new UserRegisteredEvent(user))

      return h.redirect('/home')
    }
  }
}
```
