# Hashing


## Introduction
Supercharge comes with a hashing implementation based on Bcrypt and Argon2. It provides a unified interface for both hashing drivers to securely hash user passwords.

You’ll notice the use of the `@supercharge/framework/hashing` utility in the built-in user model to hash a plain-text password. By default, Supercharge uses the Bcrypt driver.


## Configuration
Each Supercharge application has a dedicated hashing configuration, located in `config/hashing.js`. Supported hashing drivers are [Bcrypt](https://en.wikipedia.org/wiki/Bcrypt) and [Argon2](https://en.wikipedia.org/wiki/Argon2). Use the configuration file to fine-tune the drivers. For example, adjust the Bcrypt working factor to your own needs.


## Usage


#### Hashing Values
Use the `Hash.make()` method to create a from the given plain-text password:

```js
const hash = await Hash.make(user.plainTextPassword)
```


#### Verify a Password Against a Hash
Use the `Hash.check()` method to verify that a plain text value matches a given hash:

```js
if (await Hash.check('plain-text', hashedPassword)) {
  // passwords match
}
```

Notice the parameter order. When calling `Hash.check()`, the first argument must be the plain-text value and the second argument the hashed value.

Also, this method returns a boolean value. It returns `true` if the plain-text value matches the hashed value, otherwise `false`.


#### MD5 Hashing
The hashing utility also supports MD5 hashing. Please don’t use the MD5 hashing algorithm for user passwords. However, in some cases you may want to create an MD5 hash.

For example, when requesting a profile picture from Gravatar, you may create an MD5 hash like this:

```js
get gravatar () {
  const hash = Hash.md5('user@email.com')

  return `https://gravatar.com/avatar/${hash}?s=200`
}
```
