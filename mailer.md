# Mailer


## Introduction
Sending emails from a web application is a common tasks these days. Supercharge supports you by providing a mailer utility. This mailer is built on top of the sophisticated [nodemailer](https://nodemailer.com/) package.

The mailer uses a driver-based approach supporting a handful of local or cloud-based transports (drivers):

- `mailgun`
- `postmark`
- `ses`
- `sparkpost`
- `smtp`

No matter what driver you’re using to send mails from your application, the interaction with the mailer is always the same in your app. You can quickly switch transports by changing the configuration and adding the API keys or credentials to your environment file (`.env`).


## Configuration
The Supercharge mail configuration is located in the `config/mail.js` file. The `driver` property in the config file defines the underlying transport for sending emails. Ensure that the related transport configuration for your driver is correct. Also, make sure to add the required API keys for cloud-based services to your `.env` file.


## Creating Mailables
Sending mails from a Supercharge application is based around “Mailables”. A mailable is a JavaScript class representing an email. All mailables in your application should be located in the `app/mails` directory.

A mailable is basically an email, defining the recepient, subject, layout, and wraps the necessary data. For example, here’s a `WelcomeMail` mailable which defines the email that is sent to new users after signing up to your application:

```js
'use strict'

const Mailable = util('mailable')

class WelcomeMail extends Mailable {
  constructor(user) {
    super()
    this.user = user
  }

  create() {
    this
      .to(this.user.email)
      .view('emails/welcome')
      .subject(`Welcome to Supercharge!`)
      .with({
        name: this.user.name || this.user.username || this.user.email
      })
  }
}

module.exports = WelcomeMail
```

Each mailable must implement a `create` method. This `create` method configures the mail when sending it. You may configure the mail by calling methods like `.from`, `.to`, `.view`, `.subject`, and `.with`.


### Configure the Sender
The `config/mail.js` configuration file contains a default `from` configuration. This value will be used if you don’t override it with the `create` method of a mailable.

For individual mails, you may define a different sender than your default `from` configuration.

Use the `.from` method and pass in an email address as a string value:

```js
class WelcomeMail extends Mailable {
  create() {
    this
      .from('support@your-domain.com')
      .view('emails/welcome')
  }
}
```


### Configure the Recepient
Use the `.to` method to provide the email address of the mail’s recepient:

```js
class WelcomeMail extends Mailable {
  constructor(user) {
    super()
    this.user = user
  }

  create() {
    this
      .from('support@your-domain.com')
      .to(this.user.email)
      .view('emails/welcome')
  }
}
```


### Configure a Layout
The `.view` method gives you the ability to define a template which will then be used for this mail. The `.view` method references the `resources/views` directory. We recommend to put your email templates into a folder, like `resources/views/emails`:

```js
class WelcomeMail extends Mailable {
  constructor(user) {
    super()
    this.user = user
  }

  create() {
    this
      .from('support@your-domain.com')
      .to(this.user.email)
      .view('emails/welcome')
  }
}
```

The `.view(emails/welcome)` call references an email template located at `resources/views/emails/welcome.hbs`. Supercharge expects email templates to be [Handlebars](/docs/{{version}}/handlebars) templates and renders them the same way as your [web views](/docs/{{version}}/views).


### Configure View Data
Use the `.with` method to pass data to your views:

```js
class WelcomeMail extends Mailable {
  constructor(user) {
    super()
    this.user = user
  }

  create() {
    this
      .from('support@your-domain.com')
      .to(this.user.email)
      .view('emails/welcome')
      .with({
        name: this.user.name || this.user.username || this.user.email
      })
  }
}
```


## Attach Images to Mails
At this point, the Supercharge mailer has no support to embed images from your local disk into the email. We recommend to upload the images for your mails to a cloud storage and use the provided URIs as the source for image links.

```info
Your support is highly appreciated to [sending a pull request adding support for loading images from disk and attach them to emails](https://github.com/superchargejs/framework).

```


## Sending Mails
Sending mails in Supercharge can be straightforward: pass an instance of your mailable class to the `Mailer.send` method:

```js
const WelcomeEmail = require('../mails/welcome')
const Mailer = require('@supercharge/framework/mailer')

await Mailer.send(new WelcomeEmail(user))
```

This is the most basic approach to send mails. You can also refine the sending by adding “cc” or “bcc” recepients and a “replyTo” address:

```js
const WelcomeEmail = require('../mails/welcome')
const Mailer = require('@supercharge/framework/mailer')

await Mailer
  .cc(usersInCC)
  .bcc(ninjaUsersInBcc)
  .replyTo('no@reply.com')
  .send(new WelcomeEmail(user))
```


### Fire And Forget
Sometimes, you don’t want to worry about the success or failure of the email sending process. You may accept that mails not going out as a valid scenario. In these situations, you can use the `Mailer.fireAndForget` method.

The `fireAndForget` method catches application errors like “unable connecting to InsertMailServiceHere”. It still, throws implementation/system errors, like `undefined is not a function`:

```js
const WelcomeEmail = require('../mails/welcome')
const Mailer = require('@supercharge/framework/mailer')

Mailer.fireAndForget(new WelcomeEmail(user))
```


## Preview Mails
Previewin Handlebars layouts requires a rendering step. This can be cumbersome when creating email templates.

Here’s a little tip to simplify the testing and development of email layouts: rename the email template file extension from `.hbs` to `.html`. This let’s you open the template in the browser.


