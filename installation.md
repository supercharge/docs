# Installation


## Meet Supercharge
Supercharge is a Node.js framework with a stylish, purposeful syntax. Supercharge as a web application framework provides the starting point for your project. It gives the structure for you to focus on creating your app.


### Supercharge Packages
[The Supercharge framework](https://github.com/supercharge/framework) consists of multiple core packages. All core packages are located inside the `packages` directory of the framework’s GitHub repository.

Each package provides a specific functionality, like the application instance, a configuration store, an IOC container, an HTTP server and router, the hashing and encryption services, and so on. Combining all packages in a structured way creates a Supercharge application.

Every release of the framework’s core packages have the same version number. Using the same version for core packages reduces the cognitive load in your application because you can bump all packages to the same version without worrying if releases work together or if you need to bump another package, too.

Here’s an example: when we tag a release version `3.8.0` for `@supercharge/core`, you’ll find the same `3.8.0` release for all other core packages (like `@supercharge/http`, `@supercharge/session`, `@supercharge/view`, and so on) as well.


### Using TypeScript
Supercharge is written in TypeScript. Writing the framework in TypeScript automatically creates type definitions. These type definitions allow your code editor or IDE to provide IntelliSense. Using IntelliSense as a way for automatic code suggestions increases your productivity because you don’t need to look up all available methods and functionalities. Your editor or IDE could also show errors right in front of you while working on code.


### Developer Experience
We’re striving to provide a delicious developer experience. You’ll notice that most of the time the framework provides a handy method for basic functionality you would need to build yourself in other frameworks. Also, we usually return an instance of `this` from methods allowing you to create fluent method chains. You’ll recognize fluent methods when working with the framework.


## System Requirements
The Supercharge framework has some system requirements. Ensure that your system has the following dependencies installed:

- `Node.js v16` or higher
- NPM or Yarn for package management

Check your installed Node.js version using this command:

```bash
node -v
# v16.15.1
```

If you don’t have Node.js 16.x (or higher) installed, you can download the latest version on the official [nodejs.org](https://nodejs.org/en/download/) website.

Also, version managers like [n](https://github.com/tj/n) or [nvm](https://github.com/creationix/nvm) help you to install and manage different Node.js versions on your machine.


## Creating a new Supercharge App
Supercharge provides a convenient app scaffolder to create a new application. You can run the scaffolding using [npm init](https://docs.npmjs.com/cli/v8/commands/npm-init). The following command creates a new Supercharge app in the `hello-supercharge` directory:

```bash
npm init @supercharge/app@latest hello-supercharge
```

The app creation process may take some seconds. You’ll continuously see updates what’s currently happening when creating your app.


### Create a .env File
You must create a `.env` file after creating a new application. We provide a `.env.example` file that you can copy and rename.

At this point, it’s not necessary to adjust the values in the `.env` file. You can do that later.


### Running the Supercharge Server
Starting your Supercharge server is as simple as this:

```bash
npm run dev
```

This will run Supercharge’s HTTP server on the port that is defined in your `.env` file. The default port is `3000`. Once started, you can visit your new app on [localhost:3000](https://localhost:3000).
