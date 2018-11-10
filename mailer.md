# Mailer
Tba.

## Creating Mailables
Text

```js
'use strict'

const Config = util('config')
const Mailable = util('mailable')

class WelcomeMail extends Mailable {
  constructor(user) {
    super()
    this.user = user
  }

  create() {
    this.to(this.user.email)
      .view('emails.welcome')
      .subject(`Welcome to ${Config.get('app.name')}!`)
      .with('name', this.user.name || this.user.username || this.user.email)
  }
}

module.exports = WelcomeMail
```

More text.


## Sending Mails
Text

```js
await Mailer.send(new WelcomeEmail(user))
```


## Preview Mails
Rename template file endings from `.hbs` to `.html` and open them in the browser.


## Add Images to Mails
Use Internet links.
