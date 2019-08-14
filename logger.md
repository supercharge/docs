# Logging


## Introduction
Logging allows you to provide transparency in your application. If you want to learn more about the processing and details of your application parts, logging is a good way. Supercharge provides a solid logger using the [Winston](https://github.com/winstonjs/winston) logging library.

The logging utility coming with Supercharge is configurable to make it seamless for you to log to different destinations, like the console or a log file.


## Configuraiton
The configuration file for the logger is located at `config/logging.js` containing the default log driver and channels. You can configure each log channel to your own needs.

The default log driver is `console` printing everything to your terminal. When using the `file` driver, you may adjust the log file name which defaults to `app.log` and is located in `storage/logs/app.log`


### Available Drivers
Supercharge uses a driver-based approach for logging. A driver represents a single channel or multiple channels. A channel itself describes the destiation for log messages. Here’s a list of available logging drivers and the related log channels:

| Channel Driver   	| Description 	|
|-----------------	|-------------------	|
| `stacked`        	| Logging to all available channels: `console` and `file` |
| `console`        	| Logging all messages to the terminal |
| `file`           	| Logging all messages to a dedicated log file |


```info
At this point, you can’t configure the stacked logger to exclude a specific channel. It will log to all available channels. This is very likely to change in future releases.
```

## Writing Log Messages
The logging utility is part of the Supercharge framework. It provides methods for seven different log levels:

```js
const Logger = require('@supercharge/framework/logging')

Logger.error(message)
Logger.warn(message)
Logger.info(message)
Logger.verbose(message)
Logger.debug(message)
Logger.silly(message)
```

The logger provides a method corresponding to the supported log levels.


#### Logging Context Data
Use the logger anywhere in your application. Supercharge ensures to initialize the logger when starting your application. For example, you may log an `info` message in your routes. Add context information like an ID with the help of template strings:

```js
const Post = require('../models/post')
const Logger = require('@supercharge/framework/logging')

module.exports = {
  method: 'GET',
  path: '/post/{id}',
  handler: (request, h) => {
    const id = request.params.id

    Logger.info(`Showing blog post with ID: ${id}`)

    return h.view('blog/post', {
      post: await Post.findById(id)
    })
}
```

You may also pass context data to the log message using the [`sprintf`](https://en.wikipedia.org/wiki/Printf_format_string) syntax. Both channels, console and file, support the `sprintf` syntax format for all log levels. Here’s an example of a debug message containing the details about incoming request parameters:

```js
Logger.debug(`Showing blog post with params: %j`, request.params)
```
