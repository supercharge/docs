# Queues


## Introduction
Supercharge ships with first-class queueing support. Queues in Supercharge follow a driver-based approach providing a unified interface across all drivers. A queue driver is the queueing backend, like Amazon Simple Queueing Service.

Queues are a common way to push long-running tasks into a background thread. Processing a queue job in Supercharge requires a dedicated worker process that must be started separately from the application.


## Configuration
A Supercharge application comes with a queue configuration file located at `config/queue.js`. This configuration file includes the default queueing driver. You’ll also find the connection details for all supported queue drivers available in Supercharge: the database, [Amazon SQS](https://aws.amazon.com/sqs/), [Faktory](http://contribsys.com/faktory/), and a synchronous queue driver processing the jobs immediately (on the main application thread).


## Connections vs. Queues
Before moving on, let’s clarify the terminology of “queues” vs. ”connections”.

A queue **connection** in Supercharge identifies the queueing backend service where the queue jobs will be stored. In contrast, a **queue** in Supercharge is a name (string value) for a “bucket” of queued jobs.

An individual queue connection may have multiple “queues” which represent individual piles of tasks in a group. Using different queues on a connection may help you to separate fast and slow jobs within a connection.

For example, you may use a “download” queue to download a file. The file download may take up to one minute. In contrast, sending an email after user sign up may take 200 milliseconds. Imagine a “welcome-mail” queue for these tasks.

You may now start two queue workers, one for the “download” queue and one for the “welcome-mail” queue. Both workers interact independently from each other. You can scale out the “download” queue workers when needed, like during rush hours.


### Available Connections
By default, Supercharge uses the `sync` queueing driver which is useful for local development. Here's a list of available drivers:

| Queue Driver    	| Description 	|
|-----------------	|--------------	|
| `sync`            | Executes queued jobs immediately on the main thread |
| `database`        | Enqueues jobs into the database. Requires a dedicated worker to process jobs. |
| `sqs`             | Sends jobs to AWS SQS. Requires a dedicated worker to process jobs. |
| `faktory`         | Stores jobs in the Faktory queue. Requires a dedicated worker to process jobs. |

All queue drivers except `sync` enqueue jobs for asynchrounous processing. For debugging during development, you may use a related UI for the individual service. Faktory comes with a web UI (running on port `7420`). Amazon SQS has a UI to inspect jobs right in the AWS Console.

When using the `database` driver, you may use a UI like:

- [TablePlus](https://tableplus.com/)
- [Robo 3T](https://robomongo.org/) (previously Robomongo)
- [MongoDB Compass](https://www.mongodb.com/products/compass)


## Creating Jobs
The [Craft CLI](/docs/{{version}}/craft-cli) shipping with every Supercharge application provides a `make:job <name>` command to generate a new queue job class. Queue job files are located into the `app/jobs` directory. If this directory doesn’t exist yet, the Craft CLI creates it on the fly.


### Generate a Job Class
Scaffold a new queue job class using the Craft CLI. Run the `make:job` command and provide the job name as a parameter:

```bash
node craft make:job SendWelcomeMail
```

The created job class extends the `@supercharge/framework/queue/dispatchable` class providing the abitlity to dispatch a new welcome mail queue job.


### Job Class Structure
Queue jobs in Supercharge are JavaScript classes implementing a `handle()` method. The queue dispatcher calls the `handle()` method when processing a job.

Let’s implement an exemplary `SendWelcomeMail` queue job sending a welcome mail after a user registers for your platform:

```js
const Dispatchable = require('@supercharge/framework/queue/dispatchable')

class SendWelcomeMail extends Dispatchable {
  constructor(user) {
    super()

    this.user = user
  }

  /**
   * Process the job.
   */
  async handle() {
    // send mail to `user` (maybe using `@supercharge/framework/mailer`)
  }
}
```

When dispatching a new `SendWelcomeMail` job onto the queue, you’ll provide the affected user. This user is then available to a job instance as an argument.


## Dispatching Jobs
Having the queue job class implemented and ready to use in your project, you can go ahead and dispatch the first jobs.

Dispatch jobs in Supercharge via a queue job class by calling the static `QueueJob.dispatch(data)` method. The arguments passed to the dispatch method will be available as constructor parameters in your job class:

```js
const SendWelcomeMail = require('../jobs/send-welcome-mail')

module.exports = {
  method: 'POST',
  path: '/signup',
  options: {
    handler: async (request, h) => {
      // create new user

      await SendWelcomeMail.dispatch(user)
    }
  }
}
```


### Customizing the Queue and Connection
You may change the configured default queue used by the default driver when dispatching queue jobs. The `Dispatchable` class provides provides the `onQueue` and `onConnection` methods to customize the related values.


### Dispatching on a Queue
Imagine your queues as a type of categorization where you put the same tasks into the same category. This way you can scale out workers on individual queues when necessary. Use the `onQueue(name)` method to dispatch jobs onto the queue identified by `name`:

```js
const SendWelcomeMail = require('../jobs/send-welcome-mail')

module.exports = {
  method: 'POST',
  path: '/signup',
  options: {
    handler: async (request, h) => {
      // create new user

      await SendWelcomeMail
        .onQueue('send-welcome-mail')
        .dispatch(user)
    }
  }
}
```


### Dispatching on a Connection
You can also utilize different queue connections. In situations where you want to push jobs to a specific connection, use the `onConnection(name)` method:

```js
const SendWelcomeMail = require('../jobs/send-welcome-mail')

module.exports = {
  method: 'POST',
  path: '/signup',
  options: {
    handler: async (request, h) => {
      // create new user

      await SendWelcomeMail
        .onConnection('sqs')
        .dispatch(user)
    }
  }
}
```

You can also combine the `onQueue` and `onConnection` methods using the fluent interface (provided by the `Dispatchable` class):

```js
const SendWelcomeMail = require('../jobs/send-welcome-mail')

await SendWelcomeMail
  .onConnection('send-welcome-mail')
  .onConnection('sqs')
  .dispatch(user)
```

You must call`.dispatch()` as the last item in the call chain to enqueue a new job. All methods before `.dispatch()` customize the configuration for the job.


### Job Error Handling
The queue worker catches all errors thrown while processing a job and releases the job back to the queue for another try. The queue worker stops the cycle of releasing the job back when it attempts reach the allowed maximum number of attempts.

The maximun number of attempts is defined by the `--attempts <number>` flag when starting the queue worker with the `queue:work` Craft command.

When a job failed and reaches the maximunum allowed number of attempts, the queue worker tries to call the `async failed(error)` method of your queue job instance. This method is a good place for you to implement clean-up handling, like resetting state that may has been made by the queue job:

```js
const Dispatchable = require('@supercharge/framework/queue/dispatchable')

class SendWelcomeMail extends Dispatchable {
  constructor(user) {
    super()

    this.user = user
  }

  /**
   * Process the job.
   */
  async handle() {
    // send mail to `user` (maybe using `@supercharge/framework/mailer`)
  }

  /**
   * Handle job failure.
   *
   * @param {error} Error
   */
  async failed(error) {
    // deal with failed job, e.g. reset state or send a notification
  }
}
```


## Run the Queue Worker
The Supercharge queue comes with a dedicated queue worker to process jobs. This queue worker must be started separately from the main application/HTTP server. This separation moves the queue worker to its own long-living Node.js process coming with the benefit of not affecting the HTTP server when processing jobs. Also, it allows you to scale out queue workers to your needs.

Start a queue worker using the `queue:work` Craft command. The started queue worker process runs until you manually stop it (or close your terminal):

```bash
node craft queue:work
```

During deployments, please make sure to use a process manager like [PM2](https://github.com/Unitech/pm2) to keep your worker process running.

Remember that once the queue worker is started, it won’t pick up any code changes until restart. During development, you may start queue workers using a tool like [Nodemon](https://nodemon.io/) which monitors for any changes in your code and automatically restarts the proces.


### Worker Sleep Duration
The queue worker processes available jobs continuously. If there are no jobs available, the queue worker “sleeps” for 1 second and polls the queue connection again for new jobs.

At this point, you can’t customize the worker’s sleep duration.

```info
We appreciate [a pull request on adding a `--sleep <duration>` flag](https://github.com/superchargejs/framework/blob/develop/console/commands/queue/work.js) to the `queue:work` command.
```


### Run a Worker for a Specific Connection
When starting a queue worker, it uses the configured default connection. Customize the queue worker connection by passing the connection name as the first argument to the `queue:work <name>` command:

```bash
node craft queue:work sqs
```

The connection name must correspond to one of the configured connections in your `config/queue.js` file.

### Run a Worker for a Specific Connection and Queue
Queues in Supercharge are a way to categorize tasks in specific buckets. You can start queue workers for a queue by using the `--queue <queue-names>` flag. For example, if you want a dedicated queue worker for a queue named “send-welcome-mail”, you may start a worker like this:

```bash
node craft queue:work sqs --queue send-welcome-mail
```

A worker can handle multiple queues. Use the `--queue` flag and pass all queue names separated by a comma:

```bash
node craft queue:work --queue send-welcome-mail, default, another-queue
```


### Specify Max Job Attempts
By default, the queue worker tries to process a job indefinitely. The queue worker pushes a failed job back to the queue and tries to re-run it immediately. At this point, there’s no delay when a job should be attempted the next time.

In production situations, you may want to limit the number of attempts for failed jobs. Use the `--attempts <amount>` flag for the `queue:work` command to limit the maximun number of attempts:

```bash
node craft queue:work --attempts 3
```


### Job Expiration
At this point, there’s no timeout when processing a job. A queue worker will process a given job as long as the job “needs”. This may cause your queue worker to become stale and not fetching the next job for processing.

```info
I appreciate a pull request adding a worker timeout feature to ensure a maximum number of seconds a job is allowed to be processed. If you’re interested, send a PR in the [`superchargejs/framework` repository on GitHub](https://github.com/superchargejs/framework).
```

