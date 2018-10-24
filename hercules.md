# Future Studio Hercules

## Introduction
Web applications become powerful and require multiple dependencies. ercules makes it simple to have your tooling dependencies locally available. Hercules uses [Vagrant](https://www.vagrantup.com/) to gracefully provision virtual machine.

A typical application consists of multiple tools. For example, your project may need a database to store the application data and a second data store for caching. Another project may require another tool, and so on.

Hercules gives your a same named CLI `hercules` to manage the Vagrant box. The box runs on any MacOS, Linux, and Windows machine and comes with Node.js, NPM, Yarn, MariaDB, PostgreSQL, Redis, and many more services preinstalled.

### Included Software

- Ubuntu 16.04
- Git
- Node.js v8 (with NPM, Yarn, Gulp, Grunt)
- Nginx
- Sqlite3
- MariaDB
- PostgreSQL
- Redis
- CockroachDB (optional)
- Elasticsearch (optional)
- MongoDB (optional)
- RabbitMQ (optional)
- RethinkDB (optional)


## Installation
You need to perform setup steps on your host machine before creating and starting your Hercules box.


### Preparation
You must install [Vagrant](https://www.vagrantup.com/) and a virtualization provider, like [VirtualBox](https://www.virtualbox.org/wiki/Downloads), [Hyper-V](https://docs.microsoft.com/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v), or [Parallels](https://www.parallels.com/products/desktop/). You’ll find the installation instructions for all providers on the linked pages. The providers are supported on all commonly used operating systems.

We have good experience with the VirtualBox provider. It has first-class support from Vagrant, is free of charge, and regularly updated.


### Installing Hercules
Hercules is available as an NPM package. Install the package globally on your system using Node’s package manager (NPM). Of course, you can use Yarn as well.

```bash
npm i -g @futurestudio/hercules
```

As soon as the installation finished, the `hercules` CLI command is available on your machine.

This CLI is a wrapper around Vagrant and handles the interaction with your Hercules box. Run the `hercules` command in your terminal to receive an overview of supported commands:

```bash
$ hercules
Usage:
  command [arguments] [options]

Global Options:
  --env       Set NODE_ENV before running the commands
  --no-ansi   Disable colored output

Available Commands:
  destroy     Delete your existing hercules box
  init        Initialize your hercules box
  restart     Restart your hercules box.
  sleep       Suspend your hercules box
  status      Status of your hercules box
  up          Start your hercules box
  update      Update your hercules box to the newest version

```

Each command in `hercules` has its own help view. You can access it by appending `-h` to the command. Here’s an example for `hercules init -h`:

```bash
$ hercules init -h
Usage:
  init [options]

Options:
  -f, --force Override an existing environment

About:
  Initialize your hercules box
```


### Initializing the Hercules Box
You need to initialize the Hercules setup before launching the box:

```bash
hercules init
```

This will detect whether you already have a Hercules setup on your machine. In case you do, you’ll be prompted to a question to proceed the setup or not.

Hercules will prompt you `y/n` confirmation questions on whether you want to install services. Some of the supported tools in Hercules are optional and you can skip the installation if you don’t need them. For example: you can skip the installation of Elasticsearch if you don’t use it.


### Hercules Configuration
Hercules creates a directory named `hercules` into your user’s home directory. You can `cd ~/hercules` into it.

You’ll find a `hercules.yaml` configuration file that let's you easily customize the resulting Vagrant box.

```yaml
provider: virtualbox

ip: "192.168.33.10"
memory: 2048
cpus: 1

cockroachdb: true
elasticsearch: true
mongodb: true
rabbitmq: true
rethinkdb: true
```

The configurations in this file are key-value pairs and Vagrant takes them into account when creating the virtual machine.


### Install MongoDB
Install the MongoDB community edition by updating your `hercules.yaml` file and set the configuration to:

```bash
mongodb: true
```

Hercules will not set up any default database in MongoDB.


### Install Elasticsearch
Install Elasticsearch by updating your `hercules.yaml` file and set the configuration to:

```bash
elasticsearch: true
```

This will install the latest `6.x` version of Elasticsearch.

Hercules will not set up any default index in Elasticsearch.


### Install CockroachDB
Install the CockroachDB core edition by updating your `hercules.yaml` file and set the configuration to:

```bash
cockroachdb: true
```

Hercules will not set up any default database in CockroachDB.


### Install RabbitMQ
Install the RabbitMQ message broker by updating your `hercules.yaml` file and set the configuration to:

```bash
rabbitmq: true
```

Hercules will not set up any default queue in RabbitMQ.


### Install RethinkDB
Install RethinkDB by updating your `hercules.yaml` file and set the configuration to:

```bash
rethinkdb: true
```

Hercules will not set up any default database in RethinkDB.



### Network Configuration
The network configuration in the `hercules.yaml` is reduced to a minimum. You can only change the IP address that will be assigned to your Hercules box. The default IP address is

```bash
192.168.33.10
```

Configure your custom IP address by changing the `ip` property in the `hercules.yaml` file:

```js
ip: "192.168.20.18"
```


## Creating and Launching Hercules
Once you finished your configuration, lift your newHercules box:

```bash
hercules up
```

The lifting process to create a new box will take some minutes. Hercules pipes Vagrant’s output to your terminal and you can follow the current status.


## Updating Hercules
The Hercules CLI ships with an update notifier. It’ll prompt you about the lastest available version and shows the command to install the update:

```bash
npm i -g @futurestudio/hercules
```

After installing the latest version of Hercules from NPM, run the `hercules update` command:

```bash
hercules update
```

This will update the tools in your Hercules box and install their latest versions.

```info
The `hercules update` command replaces the `Vagrantfile` and `scripts` folder in your `~/hercules` directory. In case you made any changes, please backup the changed files first.
```


## Deleting Hercules
You can completely remove the Hercules box from your machine. The `hercules` CLI comes with a destroy command that removes the installation:

```bash
hercules destroy
```

This will completely remove your Hercules box without any backup. You need to manually back up data if needed.


## Ports
Hercules forwards the following ports from your host system to the box. The source and target ports match in all connections.

- **MariaDB:** 3306 → 3306
- **PostgreSQL:** 5432 → 5432
- **Redis:** 6379 → 6379
- **CockroachDB:**
  - 26257 → 26257
  - 8090 → 8090 (admin console)
- **Elasticsearch:**
  - 9200 → 9200
  - 9300 → 9300 (cluster communication)
- **MongoDB:** 27017 → 27017
- **RabbitMQ:**
  - 5672 → 5672
  - 15672 → 15672 (HTTP/management)
  - 15671 → 15671 (HTTPS/management)
- **RethinkDB:**
  - 28015 → 28015
  - 8080 → 8080 (admin console)
  - 29015 → 29015 (cluster communication)

```warning
Hercules uses and forwards the default service ports. This might cause port collisions when running the same services locally on your host machine. For example, if you want to start a Redis server on your host, you cannot use the default port `6379` locally, because it's blocked by Hercules.
```
