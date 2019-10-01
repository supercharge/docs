# Validation


## Introduction
Supercharge uses the [hapi web framework](https://hapi.dev/) as its HTTP kernel. The benefit of using hapi, it provides validation for incoming request data out-of-the-box. Supercharge (due to the use of hapi) supports request input validation via [Joi rules](https://github.com/hapijs/joi). Joi is a powerful validation library for JavaScript.

```warning
Supercharge uses `hapi v18` which has limited support for `joi v16`. At this point, we recommend to use to `joi v15` for a joyful developer experience.
```


## Validation Overview
The upcoming code samples use the Joi library to define validation rules for request input. If you want to know more details about the used validation methods, please refer to [Joi’s documentation outlining their API](https://github.com/hapijs/joi/blob/master/API.md).


## Validate Incoming Request Data
Each route in Supercharge supports an additional `options` object. The route options support the `validate` property to define validation rules for request input. You can validate the following request input:

- query parameters
- path parameters
- payload
- headers

Here’s a sample route outlining a validation setup:

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

In most situations, you don’t need to validate all the request input. Typically, you’ll define the validation rules for expected parameters and ignore the other ones. The example below shows this in more detail.


### Sample Validation for Signups
Imagine this signup route only validating the request payload. There’s no validation for query parameters, path parameters, and request headers.

In situations where a user registers for your application, you’re interested in a combination of email/username and password. Most of the time, you’re ignoring the query parameters and therefore don’t need to validate them:

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


### Overriding the Default Error Handling
Supercharge extracts the error messages from failed validations and appends them to the response. The response payload then contains an object of the failed property as the key and the validation error message as the value.

You can control the validation error handling yourself using the `failAction` method:

```js
{
  method: 'POST',
  path: '/',
  options: {
    validate: {
      failAction: async (request, h, error) => {
        // your validation error handling
      }
      payload: {
        name: Joi.string().required()
      }
    }
  }
}
```


### Strip Unknown Properties
As soon as you define a validation rule for a single property on either `query`, `params`, `payload`, or `headers`, you must validate all related properties you’re interested in. Once you apply validation, Supercharge automatically removes incoming request input that is not present in the validation rules.

Here’s an example: let’s say you’re only validating the `name` property of the request payload. An incoming request has two properties in the request payload, `name` and `age`. Supercharge will then remove `age` because you’re not validating it.

To soften this restriction, you can define `stripUnknown: false` in your `validate` config options to allow non-validated properties:

```js
{
  method: 'POST',
  path: '/',
  options: {
    validate: {
      options: {
        stripUnknown: false
      },
      payload: {
        name: Joi.string().required()
      }
    }
  }
}
```


### Stop Validation on First Error
The default validation processes all request inputs before proceeding with the error handling. Sometimes, you may want to stop on the first error and not present all validation errors at once. To fail request input validation early and proceed as soon as a validation error occurs, use `abortEarly: true`.

```js
{
  method: 'POST',
  path: '/',
  options: {
    validate: {
      options: {
        abortEarly: true
      }

      // …
    }
  }
}
```
