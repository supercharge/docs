# Validation


## Introduction
Supercharge uses the [hapi web framework](https://hapi.dev/) as its HTTP kernel. The benefit of using hapi, it provides validation for incoming request data out-of-the-box. Supercharge (due to the use of hapi) supports request input validation via [Joi rules](https://github.com/hapijs/joi). Joi is a powerful validation library for JavaScript.

```warning
Supercharge uses `hapi v18` which has limited support for `joi v16`. At this point, we recommend to use to `joi v15` for a joyful developer experience.
```


## Validation Overview
The upcoming code samples use the Joi library to define validation rules for request input. If you want to know more details about the used validation methods, please refer to [Joi's documentation outlining their API](https://github.com/hapijs/joi/blob/master/API.md).


## Validate Incoming Request Data
Each route in Supercharge supports an additional `options` object. The route options support the `validate` property to define validation rules for request input. You can validate the following request input:

- query parameters
- path parameters
- payload
- headers

Here's a sample route outlining a validation setup:

```js
{
  method: 'GET',
  path: '/signup',
  options: {
    handler: () => {},
    validate: {
      query: {
        // query parameter validation
      }
      params: {
        // path parameter validation
      }
      payload: {
        // request payload validation
      }
      headers: {
        // request header validation
      }
    }
  }
}
```

In most situations, you don't need to validate all the request input. Typically, you'll define the validation rules for expected parameters and ignore the other ones. The example below shows this in more detail.


### Sample Validation for Signups
Imagine this signup route only validating the request payload. There's no validation for query parameters, path parameters, and request headers.

In situations where a user registers for your application, you're interested in a combination of email/username and password. Most of the time, you're ignoring the query parameters and therefore don't need to validate them:

```js
{
  method: 'POST',
  path: '/signup',
  options: {
    handler: async (request, h) => {
      // create the user
    },
    validate: {
      payload: {
        email: Joi
          .string()
          .label('Email address')
          .email({ minDomainSegments: 2 })
          .trim()
          .required(),

        password: Joi
          .string()
          .label('Password')
          .min(6)
          .required()
      }
    }
  }
}
```


### Allow Unknown Properties
As soon as you define a validation rule for a single property on either `query`, `params`, `payload`, or `headers`, you must validate all the related properties. If not, the request will fail with a validation error. To soften this restriction, you can define `allowUnknown: true` in your `validate` config:

```js
{
  method: 'POST',
  path: '/',
  options: {
    validate: {
      allowUnknown: true
      payload: {
        name: Joi.string().required()
      }
    }
  }
}
```

The payload validation for the setup above ensures that a `name` property is a valid string. It also allows requests to contain properties besides the name and not only the name.


### Stop Validation on First Error
The default validation process stops validation on the first error. Sometimes, you may want to present all validation errors at once. To validate the request input against all your rules and also proceed if a validation error occurs, use `abortEarly: false`.

```js
{
  method: 'POST',
  path: '/',
  options: {
    validate: {
      abortEarly: false
      // …
    }
  }
}
```
