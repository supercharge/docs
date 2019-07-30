# Encryption


## Introduction
Encrypting values is important and Supercharge comes with a built-in utility to encrypt data. By default, Supercharge uses AES-256 encryption.


## Configuration
Supercharge ships with an encryption utility available via `@supercharge/framework/encryption`. By default, this encryption module uses your application key defined in `config/app.js`. The app key will be generated during the application setup when using the Supercharge installer. If you don’t have an app key set, use the `node craft key:generate` command to create one.


## Usage

#### Encrypting Values
Encrypting values uses the `AES-256-CBC` cipher. Import the encryption utility and use the `.encrypt()` method:

```js
const Encryption = require('@supercharge/framework/encryption')

const encrypted = Encryption.encrypt('value')
```

In case you need to encrypt data using another key than your app key, you should create a dedicated instance passing the key as the first argument:

```js
const encrypter = new Encryption('your-encryption-key')
const random = encrypter.encrypt('value')
```


#### Decrypting Values
The encryption utility provides a `.decrypt()` method to decrypt values:

```js
const Encryption = require('@supercharge/framework/encryption')

const encrypted = Encryption.decrypt('encrypted-string')
```

Again, you can also create your own instance that should use your custom encryption key to decrypt values:

```js
const encrypter = new Encryption('your-encryption-key')
const encrypted = encrypter.decrypt('encrypted-string')
```


#### HMAC
To calculate the HMAC of the input string, use the `.hmac()` method on the encryption utility:

```js
const hmac = Encryption.hmac('string')
```


#### Base64 Encoding
The encryption module also supports base64 encoding for strings and buffer:

```js
const encoded = Encryption.base64Encode('value')
// or
const encoded = Encryption.base64Encode(Buffer.from('value'))
```


#### Base64 Decoding
You can also decode a given base64 string:

```js
const string = Encryption.base64Decode(encodedBufferOrString)
```


#### Generating Random Strings
In various situations, you may want to generate a random string. The encryption utility provies a `.randomKey()` method to generate a random key:

```js
const random = Encrypt.randomKey() // creates a 20-character string
```

You may also pass the number of bytes as an argument to the `.randomKey()` method:

```js
const random = Encrypt.randomKey(41) // creates a 41-character string
```


