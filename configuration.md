# Configuration and Environment


## Introduction
All your Supercharge configuration files are stored in the `config` directory.

In most application you’ll find configurations spread across files. For example, the mailing configuration lives directly in the mailer and the database settings are tightly couppled with the database connection.

This is different in Supercharge because the `config` directory acts as a central place for all your configurations.

![How to use Supercharge Config and Env](/images/docs/config-env.png)


## Retrieving Configuration Values
Supercharge loads all your configuration values into memory when starting the Node.js server. You can access the config values anywhere in your application using the `Config` class.

Access individual values using the “dot” syntax. The dot syntax starts with the configuration file name and follows the object path:

```js
const Config = require('@supercharge/framework/config')

const appName = Config.get('app.name', 'My Supercharge App')
```

The second argument passed to `Config.get()` is the default value. The framework will use the default value if no configuration value exists for the given key.


## Retrieving Environment Values
All variables in your `.env` file are loaded into the global [`process.env`](https://nodejs.org/docs/latest-v8.x/api/process.html#process_process_env) environment object. For convenient access, you should use the framework’s `Env` class:

```js
const Env = require('@supercharge/framework/env')

const appName = Env.get('APP_NAME', 'Supercharge')
```

Retrieve values from environment variables by using the `Env.get()` method. The second argument passed to `Env.get()` is the default value. Supercharge will use the default value if no environment variable exists for the given key.

```info
The idea in Supercharge is to feed your configuration from environment variables. We recommend to use the `Env` class in your config files and not directly in any application logic.
```


## Environment Variables
Applications run in different environments with a custom configuration. While in development, you may want a different mailing driver than in production or testing.

Supercharge uses the [dotenv](https://github.com/motdotla/dotenv) library to load environment variables from a `.env` file. A new Supercharge application contains a `.env.example` file.

The Supercharge installer automatically copies it over to `.env` during the setup. In case you didn’t use the installer, you may rename the file manually.

```warning
You should not commit your application’s `.env` file to your source control repository. Each developer in your team may require a different configuration. Also, exposing the `.env` file to your source control may leak sensitive data in case attackers gain access to the repository.
```


### Expanding Environment Variables
Supercharge uses [dotenv-expand](https://github.com/motdotla/dotenv-expand) to expand environment variables in your `.env` file. You can compose environment variables out of other variables like this:

```bash
MONGODB_USER=super
MONGODB_PASSWORD=charge
MONGODB_AUTH=${MONGODB_USER}:${MONGODB_PASSWORD}
```
