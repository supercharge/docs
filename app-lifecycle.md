# Application Lifecycle


## Introduction
Supercharge allows you to intercept the application lifecycle at three different extension points. You can intercept the application shutdown process with the following hooks:

- `preServerStop`: runs before the HTTP server stops
- `postServerStop`: runs after the HTTP server stops
- `preShutdown`: runs before the Node.js process exits

A Supercharge application has a predefined lifecycle file located at `bootstrap/lifecycle.js`. It gives your the structure to run your custom logic at the extension points. Each lifecycle method is asynchronous and you can `await` any asynchronous processing.


## preServerStop
The `postServerStop` extension point runs directly before the HTTP server stops. Notice that the HTTP server didn't stop yet and may have active connections.


## postServerStop
The `postServerStop` extension point is useful for actions that should run after the HTTP server stopped. At this extension point, you can be sure that no further request will be processed by your application.

You can use this lifecycle hook to:
- Close database connections, e.g. for your custom cache instances
- Clean up event listeners


## preShutdown
The `preShutdown` extension point is the last point in your application where you can run custom logic. The Node.js process exists after running the `onPreShutdown` method.

You can use this lifecycle hook to:
- Clean up files in your filesystem
- Wait for your queues to process the current job


