# Logging


## Overview
Logging allows you to provide transparency in your application. If you want to learn more about the processing and details of your application parts, logging is a good way. Supercharge provides a solid logger using the [Winston](https://github.com/winstonjs/winston) logging library.

Supercharge comes with a built-in logger. The logger is configurable making it seamless for you logging to different destinations, like the console or a log file.


## Configuration
All of the logger’s configuration options are inside of the `config/logging.ts` configuration file. The config file allows you to customize the default logging driver and channel-specific configuration.

By default, Supercharg uses the `console` driver printing all log messages to the terminal. When using the `file` driver, you may adjust the log file name. The default log file points to the `storage/logs/app.log` file.


### Available Log Drivers
Supercharge uses a driver-based approach for logging. A driver represents a single channel or multiple channels. A channel itself describes the destiation for log messages. Here’s a list of available log drivers and the related log channels:

| Channel Driver   | Description                                 |
|----------------- |--------------------------------------------- |
| `console`        | Logging all messages to the terminal         |
| `file`           | Logging all messages to a dedicated log file |


```info
At this point, you can’t configure a “stacked” logger driver that sends log messages to multiple destinations. It’s likely this will be added in future releases.
```


## Using the Logger
Supercharge bootstraps and configures the logger while starting the application. You can access the logger via the application instance or the log facace:

```js
import { Logger } from '@supercharge/facades'

Logger.info('Hello Marcus')

// or

import { App } from '@supercharge/facades'

App.logger().info('Hello Marcus')
```

**Notice:** you can access the logger wherever you have the `app` instance available. For example, inside of controllers or service providers you may log messages like this:

```ts
this.app().logger().info('Hello Marcus')
```


### Available Logger Methods
The logger provides the log methods representing individual log levels. The logger follows the syslog protocol from [RFC5424](https://tools.ietf.org/html/rfc5424) defining eight log levels:

```ts
import { Logger } from '@supercharge/facades'

Logger.emergency(message);
Logger.alert(message);
Logger.critical(message);
Logger.error(message);
Logger.warning(message);
Logger.notice(message);
Logger.info(message);
Logger.debug(message);
```


### Logging Context Data
You can also pass a context data starting from the second argument to the log methods. Typically you’re passing a context object as the second argument containing all your information:

```js
import { Logger } from '@supercharge/facades'

Logger.info(`User successfully logged in`, { userId: user.id })
```
