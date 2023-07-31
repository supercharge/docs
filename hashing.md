# Hashing


## Overview
Supercharge comes with a hashing package allowing you to seamlessly hash values and verify already hashed values against their plain-text reference. Use the `Hash` facade to create hashes using the bcrypt driver. Bcrypt is a great hashing algorithm because it comes with an adjustable “work factor” (typically called “rounds”).


## Configuration
The hashing configuration file is located at `config/hashing.ts`. It contains the default hash driver and the corresponding hash driver settings.


### Available Hashing Drivers
Supercharge uses a driver-based approach for hashing. A driver represents a hash algorithm used to generate the hash for a given value. Here’s a list of available hash drivers:

| Hash Driver   | Description                                  |
|-------------- |--------------------------------------------- |
| `bcrypt`      | Uses the bcrypt hashing algorithm            |
| `scrypt`      | Uses Node.js native [scrypt](https://nodejs.org/docs/latest-v18.x/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback) hashing algorithm |


## Hashing Passwords
Create a hash of a given string value using the `make` method from the `Hash` facade:

```ts
import { Hash } from '@supercharge/facades'

const hashedValue = Hash.make('plain-text')
```


## Verifying Passwords Matching a Hash
Use the `check` method from the `Hash` facade to verify that a given plain text value matches given related hash:

```ts
import { Hash } from '@supercharge/facades'

if (Hash.check('plain-text', hashedValue)) {
    // … verified: values match
}
```


## Determine if Rehash is Needed
Use the `needsRehash` method to determine whether the algorithm or hashing options have changed since creating the hashed value:

```ts
import { Hash } from '@supercharge/facades'

if (Hash.needsRehash(hashedValue)) {
    const newHashedValue = await Hash.make('plain-value')
}
```
