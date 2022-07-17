# Encryption


## Overview
Supercharge comes with a convenient encryption service for encrypting and decrypting values. Encryption uses OpenSSL with the AES-256 cipher. All encrypted values are signed using a message authentication code (MAC) keeping your values secure from modification once they are encrypted.


## Configuration
Supercharge’s encrypter requires a secret key for encryption. The encrypter uses the app `key` configured in your `config/app.ts` file. The app `key` configuration is driven by the `APP_KEY` environment variable. You should configure a random app key with at least 32 characters to keep your values secure.


## Using Encryption
You may encrypt and decrypt values using the `Crypt` facade. The `Crypt` facade is part of the `@supercharge/facades` package.


### Encrypt a Value
Use the `Crypt.encrypt` method to encrypt a given value:

```ts
import { Crypt } from '@supercharge/facades'
import { Controller } from '@supercharge/http'
import { HttpContext } from '@supercharge/contracts'

export class StoreGithubAuthTokenController extends Controller {
  /**
   * Handle the given request.
   */
  async handle ({ request, response }: HttpContext): Promise<any> {
    const encrypted = Crypt.encrypt(request.input('github-auth-token'))
    // da29f2134efa…

    // … proceed handling the request
  }
}
```

**Notice:** the encrypter JSON-serializes the value before encrypting it.


### Decrypt a Value
Use the `Crypt.decrypt` method to decrypt an encrypted string:

```ts
import { Crypt } from '@supercharge/facades'

try {
  const decrypted = Crypt.decrypt(encryptedValue)
  // { name: 'Supercharge' }
} catch (error) {
  //
}
```

**Notice:** the encrypter JSON-serializes values when encrypting them. It also parses the decrypted value. The parsed value may not be the same as the encrypted value. For example, this happens when encrypting a class instance which will be parsed as an object and not brought back to a class instance.
