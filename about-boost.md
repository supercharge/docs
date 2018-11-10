# Introduction to Boost

## Philosophy
Boost differs from a typical Node.js “web” framework in ways that it provides much more structure on how to build solid applications. Boost comes with a well-conceived application architecture to build scalable, testable and maintainable applications.

The Boost framework builds on [hapi.js](https://hapijs.com/) to handle the request lifecycle including powerful middleware. Hapi is highly extensable and offers fine-grained request lifecycle extension points.

Boost offers a lot more than just a routing layer and thin middleware layer, like Express does. Boost gives you full control over your application by managing the environment and configuration of your app. Out-of-the-box utilities like event dispatching, hashing, encryption, mailing, and logging are part of the framework. You can use them right away when working with Boost.

A common Node.js web framework let’s you register routes and the related route handlers. As soon as you need to run actions besides the request lifecycle, it becomes hard to manage. Imagine a route handler for user registration that should send a welcome email to the user that recently signed up. Boost let’s you easily move the mail handling to a background process (like an event listener) and not clutter your route handler with mail sending tasks.


## Stay in Touch
Stay up-to-date with the latest development and updates on Boost:

- Website: [boost.futurestud.io](https://boost.futurestud.io)
- Twitter: follow [@marcuspoehls](https://twitter.com/marcuspoehls) or [@futurestud_io](https://twitter.com/futurestud_io) for updates
