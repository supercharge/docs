# Database Connectors


## Introduction
Supercharge removes the database connection boilerplate code from your applicaiton. The framework provides a database connector for [Mongoose](https://mongoosejs.com/), the MongoDB ODM. Supercharge resolves the connection string from the database configuration file and creates a connection.


## Configuration
Each database connector supports different connection options. Find the database configurations in the `config/database.js` config file. Supercharge’s driver-based approach for database connections will automatically create the database connection for the configured driver when starting the application.


## Database Connection Lifecycle
Every Supercharge application has an [application lifecycle](/docs/{{version}}/app-lifecycle). Starting your application automatically kicks off the database lifecycle. As part of this database lifecycle, Supercharge will check if your app has existing model files located at `app/models`. If model files exist, it connects to the configured database driver (connector).


## Mongoose Connector for MongoDB
Supercharge provides a connector for [Mongoose](https://mongoosejs.com/), a popular MongoDB ODM. Put your Mongoose models into the `app/models` folder and Supercharge automatically loads them on application start.

Loading the models on application start tells Mongoose which models are available and ensures your relations resolve properly.

The way Mongoose works is that the Mongoose instance inside the Supercharge framework must be used within your application:

```js
const { Mongoose } = require('@supercharge/framework/database')
```

This access is required so that Supercharge can remove the boilerplate code from your plate. If you would import Mongoose directly in your application, it won’t resolve all models and connections:

```js
// NOTE: not recommended, you have to create all the connection handling yourself

const Mongoose = require('mongoose')
…
```
