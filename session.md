# HTTP Sessions


## Overview
Sessions provide a way to transition HTTP application from being stateless to stateful. Stateful applications save information about users across multiple requests. For example, identifying users across requests is useful in session-based authentication.


## Configuration
Your application’s session options are stored in the `config/session.ts` configuration file. This config file allows you to customize the default session driver and driver-specific configuration.

By default, Supercharge uses the `cookie` driver to store session data.


### Available Session Drivers
Supercharge ships with different session backends. All session backends are access in a driver-based approach exposing the same interface. Following the same interface allows you to switch from one session backend to another by changing a single line of configuration:

| Session Driver   | Description                                  |
|----------------  |--------------------------------------------- |
| `memory`         | Stores session in memory, useful for testing |
| `cookie`         | Stores the session data in a cookie          |

We welcome every contribution for new session drivers. You can submit a pull request adding a new driver or you may ask for an implementation by creating an issue [in the framework’s GitHub repository](https://github.com/supercharge/framework).



## Interacting with the Session
Tba.


### Retrieving Data
Tba.


### Storing Data
Tba.


### Deleting Data
Tba.


### Regenerating the Session ID
Tba.


### Invalidating the Session
Tba.


