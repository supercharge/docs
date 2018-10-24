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

```bash
npm i -g @futurestudio/hercules
```

Creates a `hercules` folder in your user's home directory

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


## Hercules Configuration
Hercules comes with a `hercules.yaml` configuration file that let's you easily customize the resulting Vagrant box. The configurations in this file are key-value pairs and Vagrant takes them into account when creating the virtual machine.


### Network Configurations
The network configuration in the `hercules.yaml` is reduced to a minimum. You can only change the IP address that will be assigned to your Hercules box. The default IP address is

```bash
192.168.33.10
```

Configure your custom IP address by changing the `ip` property in the `hercules.yaml` file:

```js
ip: "192.168.20.18"
```


## Updating Hercules
