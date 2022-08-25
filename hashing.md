# Hashing


## Overview
Supercharge comes with a hashing package allowing you to seamlessly hash values and verify already hashed values against their plain-text reference. Use the `Hash` facade to create hashes using the bcrypt driver. Bcrypt is a great hashing algorithm because it comes with an adjustable “work factor” (typically called “rounds”).


## Configuration
The hashing configuration file is located at `config/hashing.ts`. It contains the default hash driver and the corresponding settings. At this point, only bcrypt is supported as a hash driver. You may adjust bcrypt’s work factor in the configuration file.


## Hashing Passwords
Create a hash using the `make` method from the `Hash` facade:

```ts
import { Hash } from '@supercharge/facades'

const hash = Hash.make('plain-text')
```


## Verifying Passwords Matching a Hash
Use the `check` method from the `Hash` facade to verify that a given plain text value matches the related hash:

```ts
import { Hash } from '@supercharge/facades'

if (Hash.check('plain-text', $hashValue)) {
    // … verified: values match
}
```


## Determine if Rehash is Needed
Use the `needsRehash` method to determine whether the work factor has changed since hashing the given value:

```ts
import { Hash } from '@supercharge/facades'

if (Hash.needsRehash($hashValue)) {
    $hashValue = await Hash.make('plain-value')
}
```
