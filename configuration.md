# Configuration and Environment


## Introduction
All your Supercharge configuration files are stored in the `config` directory. Your Supercharge application and the framework core follow these configuration files. You can adjust and tweak the app’s behavior using different values for individual options.

We highly recommend putting all configuration files into the `config` directory because these files are automatically loaded when starting your application.

Here’s a preview how Supercharge recommends the usage of environment variables to configure your app:

![How to use Supercharge Config and Env](/images/docs/config-env.png)


## Retrieving Configuration Values
Supercharge loads all your configuration values into memory when starting the application’s Node.js server. You can access the config values anywhere in your application using the `Config` facade.

Use the `Config.get` method to retrieve configuration values. All configurations start with the configuration file name followed by a defined key. You may also retrieve nested config values using the “dot” syntax. The dot notation starts with the configuration file name followed by the nested object path:

```ts
import { Config } from '@supercharge/facades'

const appName = Config.get('app.name', 'My Supercharge App')
```

You may also provide a default value as the second argument when retrieving a config value. This default value is used when no config value exists for the provided key:

```ts
const appName = Config.get('app.name', 'My Supercharge App')
```


## Retrieving Environment Values
All variables in your `.env` file are loaded into the global [`process.env`](https://nodejs.org/docs/latest-v16.x/api/process.html#process_process_env) environment object.

We recommend using environment variables to configure your application. This approach follows the concept of [the 12 factor app](https://12factor.net/). The framework provides a `Env` facade to access the values of environment variables:

```js
import { Env } from '@supercharge/facades'

const appName = Env.get('APP_NAME')
```

The `Env` facade accepts a default value as the second argument when retrieving the value of an environment variable. This is useful to provide thoughtful default values for your application:

```ts
const appName = Env.get('APP_NAME', 'Supercharge')
```

```info
The idea in Supercharge is to feed your configuration from environment variables. We recommend to use the `Env` facade in your config files and not directly in any application logic.
```


## Environment Variables
Applications run in different environments with a custom configuration. For example, while in development you may want a different mailing driver than in production or testing.

Supercharge loads all environment variables configured in a `.env` file when starting your application. A new Supercharge application contains a `.env.example` file. You may copy the `.env.example` file and rename the copy to `.env` for new applications.

```warning
You should not commit your application’s `.env` file to your source control repository. Each developer in your team may require a different configuration. Also, exposing the `.env` file to your source control may leak sensitive credentials in case attackers gain access to the repository.
```
