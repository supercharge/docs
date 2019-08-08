# Installation


## System Requirements
The Supercharge framework has some system requirements. Ensure that your system has the following dependencies installed:

- Node.js `>= 8.12.0`
- NPM or Yarn for package management

Version managers like [n](https://github.com/tj/n) or [nvm](https://github.com/creationix/nvm) help you to install and manage different Node.js versions on your machine.


## Installing Supercharge
Supercharge has a convenient installer to scaffold a new application. Install the Supercharge installer on your system to quickly create a new project:

```bash
npm install -g @supercharge/installer
```

The installer will add the `supercharge` command to your system. Scaffold a new application like this:

```bash
supercharge new blog
```

The Supercharge installer will create a `.env` file in your project and automatically generate an application key.

## Application Key
When building your applicatin with Supercharge, you should set an application key in your `.env` file to a random string. If you installed Supercharge with the installer, the key is already set for you.

If you want to set an app key manually, use the `node craft key:generate` command.


## Running Supercharge
Starting your Supercharge server is as simple as this:

```bash
node server.js
```

This will run Supercharge’s HTTP server on the port that is defined in your `.env` file. The default port is `3000`.
