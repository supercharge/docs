# Logging


## Introduction
Logging allows you to provide transparency in your application. If you want to learn more about the processing and details of your application parts, logging is a good way. Supercharge provides a solid logger using the [Winston](https://github.com/winstonjs/winston) logging library.

The logging utility coming with Supercharge is configurable to make it seamless for you to log to different destinations, like the console or a log file.


## Configuraiton
Tba.


### Available Log Drivers
Tba.


## Using the Logger
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


### Logging Context Data
Tba.
