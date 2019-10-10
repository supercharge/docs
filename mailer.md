# Mailer


## Introduction
Text


## Configuration
Text `config/mail.js`

The mailer is built on top of the sophisticated [nodemailer](https://nodemailer.com/) package.

Available transports (drivers):

- `mailgun`
- `postmark`
- `ses`
- `sparkpost`
- `smtp`

## Creating Mailables
Text

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
      .view('emails.welcome')
      .subject(`Welcome to Supercharge!`)
      .with('name', this.user.name || this.user.username || this.user.email)
  }
}

module.exports = WelcomeMail
```

More text.


## Sending Mails
Text

```js
const Mailer = require('@supercharge/framework/mailer')

await Mailer.send(new WelcomeEmail(user))
```


## Preview Mails
Rename template file endings from `.hbs` to `.html` and open them in the browser.


## Add Images to Mails
Use Internet links.
