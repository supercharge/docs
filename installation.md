# Installation


## System Requirements
The Boost framework has some system requires. Ensure that your system has `Node.js` and `NPM` installed and runs at least Node.js `>= 8.0.0`.

Version managers like [n](https://github.com/tj/n) or [nvm](https://github.com/creationix/nvm) help you to install and manage different Node.js versions on your machine.

By default, Boost interacts with a MongoDB database. When not running a MongoDB instance on your machine, the Boost server will still work, but not connect to the database. When navigating to the default Boost pages in the browser, you may hit an endpoint that will crash the Boost server because of the unavailable database.

The [Hercules](/docs/{{version}}/hercules) virtual machine fulfills Boost’s database requirement. We highly recommend to use the Hercules box for your local development setup.


## Installing Boost
Unpack your downloaded Boost package to a location of your choice. Install all project dependencies using NPM:

```bash
npm install
```

Please wait until the dependency installation succeeds.

Use Boost’s [Craft command line utility](/docs/{{version}}/craft-cli) to finish the setup:

```bash
node craft setup
```

This setup command will create a `.env` file in your project root, generate and set an application key and optionally set the application name. The application name is an optional argument. Head over to the Craft docs for more details.

Have a look at the generated `.env` file and adjust the values to your needs.

```warning
We don’t use Yarn in our development setup and cannot guarantee that it works as expected. The compatibility to NPM should make sure that you’re fine with Yarn.
```


## Running Boost
Starting your Boost server is as simple as this:

```bash
node server.js
```

This will run Boost’s HTTP server on the port that is defined in your `.env` file. The default port is `3000`.
