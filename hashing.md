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


## Creating Hashes
You can also create hash values based on different algorithms besides just making and checking hashes. All hash drivers provide convenient methods to create hashes.


### Create Custom Hash Values
The Node.js `crypto` core module comes with a `createHash` function. The Supercharge framework hashers provide a similar `createHash` method, too. This method exist so that you can use the framework’s hasher in all places instead of mixing the hasher and Node.js’ `createHash` in your code:

```ts
import { Hash } from '@supercharge/facades'

const hash = Hash.createHash(algorithm, input, inputEncoding)
// `hash` is an instance of the Node.js `Hash` class
```

Supercharge’s `createHash` method returns a native Node.js [`Hash`](https://nodejs.org/api/crypto.html#class-hash) instance.


### MD5 Hashing
The Supercharge hasher provides the convenient `md5` method calculating the hash value of a given input using the MD5 hash algorithm. The returned value is the hash value as a string:

```ts
import { Hash } from '@supercharge/facades'

const md5 = Hash.md5('supercharge')
// `md5` is the hash string: N8rEn6b+F6Dh7AEZ0YiLaA==
```

By default, the output encoding is `base64`.

You can create a Node.js `Hash` instance by providing an input encoding as the second argument:

```ts
import { Hash } from '@supercharge/facades'

const md5 = Hash.md5('supercharge', 'utf8')
// `md5` is a Node.js `Hash` instance
```

You may also use a [hash builder callback function](#using-a-hash-builder-function) to customize the hash value being created.


### SHA256 Hashing
The Supercharge hasher provides a convenient `sha256` method calculating the hash value of a given input using the SHA-256 (SHA-2) hash algorithm:

```ts
import { Hash } from '@supercharge/facades'

const sha256 = Hash.sha256('supercharge')
```

By default, the output encoding is `base64`.

You can create a Node.js `Hash` instance by providing an input encoding as the second argument:

```ts
import { Hash } from '@supercharge/facades'

const sha256 = Hash.sha256('supercharge', 'utf8')
// `sha256` is a Node.js `Hash` instance
```

You may also use a [hash builder callback function](#using-a-hash-builder-function) to customize the hash value being created.


### SHA512 Hashing
The Supercharge hasher provides a convenient `sha512` method calculating the hash value of a given input using the SHA-512 (SHA-2) hash algorithm:

```ts
import { Hash } from '@supercharge/facades'

const sha512 = Hash.sha512('supercharge')
```

By default, the output encoding is `base64`.

You can create a Node.js `Hash` instance by providing an input encoding as the second argument:

```ts
import { Hash } from '@supercharge/facades'

const sha512 = Hash.sha512('supercharge', 'utf8')
// `sha512` is a Node.js `Hash` instance
```

You may also use a [hash builder callback function](#using-a-hash-builder-function) to customize the hash value being created.




### Using a Hash Builder Function
The MD5, SHA-256, SHA-512 hash functions support a hash builder callback function as the second argument:

```ts
import { Hash } from '@supercharge/facades'

const md5 = Hash.sha256('supercharge', hash => {
    hash.inputEncoding('utf8').toString('hex')
})
// `md5` is the hash string: 37cac49fa6fe17a0e1ec0119d1888b68
```

The hash builder provides a fluent interface to provide the value’s input encoding and the resulting output encoding. The default output encoding is `base64`. Pass your desired output encoding the the `toString` method, like `hex` or other output formats, when needed.
