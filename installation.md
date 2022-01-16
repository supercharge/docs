# Installation


## System Requirements
The Supercharge framework has some system requirements. Ensure that your system has the following dependencies installed:

- Node.js `>= 12`
- NPM or Yarn for package management

Check your installed Node.js version using this command:

```bash
node -v
# v12.22.9
```

If you don’t have Node.js 12.x (or higher) installed, you can download the latest version on the official [nodejs.org](https://nodejs.org/en/download/) website.

Also, version managers like [n](https://github.com/tj/n) or [nvm](https://github.com/creationix/nvm) help you to install and manage different Node.js versions on your machine.


## Creating a new Supercharge App
Supercharge provides a convenient app scaffolder to create a new application. You can run the scaffolding using [npm init](https://docs.npmjs.com/cli/v8/commands/npm-init). The following command creates a new Supercharge app in the `hello-supercharge` directory:

```bash
npm init @supercharge/app@latest hello-supercharge
```

The app creation process may take some seconds. You’ll continuously see updates what’s currently happening when creating your app.


### Create a `.env` File
You must create a `.env` file after creating a new application. We provide a `.env.example` file that you can copy and rename.

At this point, it’s not necessary to adjust the values in the `.env` file. You can do that later.


### Running the Supercharge Server
Starting your Supercharge server is as simple as this:

```bash
npm run dev
```

This will run Supercharge’s HTTP server on the port that is defined in your `.env` file. The default port is `3000`. Once started, you can visit your new app on [localhost:3000](https://localhost:3000).
