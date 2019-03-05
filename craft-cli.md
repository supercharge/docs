# Craft CLI


## Introduction
Craft is the command line utility shipped with Supercharge. The framework provides a handful of handy commands that help you build your application. If you're in a Supercharge application, you can print the list of available commands:

```bash
node craft
```

Craft provides a “help” overview for every command. It shows the command’s details and describes the arguments and options. Append a `-h` to the command to display the help overview:

```bash
$ node craft make:route -h
Usage:
  make:route <filename> [options]

Arguments:
  filename   Name of your route file

Options:

About:
  Scaffold a new route
```


## Creating Commands
At this point, you can't create and register your own Craft commands.

There's an open issue asking for your help to [add this functionality](https://github.com/superchargejs/framework/issues/6). Please feel welcome to join the conversation in the issue and submit a pull request.
