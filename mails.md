# Tba.
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

```js
await Mailer.send(new WelcomeEmail(user))
```

## Preview Mails
Mail Templates von `.hbs` auf `.html` umbenennen. So kann man sie im Browser öffnen.

## Add Images to Mails
Internetpfad benutzen!
