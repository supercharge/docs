# Authorization


## Introduction
Supercharge provides user [authentication](/docs/{{version}}/authentication) out of the box. In addition, it also provides a seamless way to provide user authorization against individual resources. The authorization process in Supercharge has two components: an **authenticated user** having a `scope` property containing all allowed scopes **and a route requiring a scope**.

The authorization process in Supercharge is directly coupled with HTTP routes. To require authorization, you must define the required scope on the related routes.


## Authorization Example
Let’s explore authorization on an example. Imagine an application that provides an admin panel. The admin panel routes are all prefixed with `/admin`. There are multiple routes and views in the admin panel, like `/admin`, `/admin/posts`, `/admin/users`, and so on. Your user account is the only one with admin access rights. You’re the only user having the admin scopes and allowed to access the admin routes.

Authorization keeps the admin panel only accessible to you and users having the admin scope.


## User Scopes
Authorizing users on resources requires you to implement a `scope` property in a database model. Here’s a sample user:

```js
{
  username: 'marcus',
  password: 'password-hash',
  scope: ['user', 'admin']
}
```

The `scope` property can be a string or an array of strings. We recommend to use an array to keep your scopes extensible.

When HTTP requests hit your server, you’ll [authenticate](/docs/{{version}}/authentication) the user. These authenticated credentials are then available to the underlying hapi HTTP server for authorization against routes.


## Require Scopes on Routes
The second part to authorize users on resources is the route. You must must define the allowed scopes on routes. Here’s a sample `/admin` route requiring the `'admin'` scope:

```js
{
  method: 'GET',
  path: '/admin',
  config: {
    auth: {
      scope: 'admin'
    },
    handler: async (request, h) => {
      return h.view('admin/index')
    }
  }
}
```


### Allow Multiple Scopes on Routes
Sometimes you want to allow multiple scopes to have access to a route. For example, you’re running a blog and want guest authors to create posts. Guest authors should have access the creation view of a new blog post. They should not have access to the admin panel.

You may introduce an access layer to authorize users to access parts of the blog backend. Guest authors should have access to create a new post and need a scope in terms of `posts:create`.

To allow both users, admins and guest authors, to create new blog posts, define an array of allowed scopes on the route:

```js
{
  method: 'GET',
  path: '/blog/posts/create',
  config: {
    auth: {
      scope: ['admin', 'posts:create']
    },
    handler: async (request, h) => {
      return h.view('blog/create-post')
    }
  }
}
```

**Notice:** one of the scopes must match the user scopes, not all scopes. As soon as one of the required scopes from the route configuration is in the list of a user’s scopes, the user is authorized to access the route.


## Dynamic Scopes
Sometimes it’s helpful to authorize users dynamically on routes. Let’s say you’re selling books on your platform. You want book buyers to have access to their purchased book. Purchased books can be downloaded at any time. You want to authorize users before the download to ensure a user has actually purchased the book.

The user `marcus` purchased the `supercharge` book. While processing the purchase, you’re adding a new scope to `marcus` to remember which user bought a product. Here’s a sample of `marcus`’ user scopes:

```js
{
  username: 'marcus',
  password: 'password-hash',
  scope: ['user', 'book-supercharge']
}
```

You can add request input as dynamic variables into scopes on routes. In the scope definitions on routes, you may use the following variables:

- `query`
- `params`
- `payload`

A download route for books may look like this:

```js
{
  method: 'GET',
  path: '/book/{slug}/download',
  config: {
    auth: {
      scope: ['admin', 'book-{params.slug}']
    },
    handler: async (request, h) => {
      // serve book download
    }
  }
}
```

When `marcus` sends a request to `/book/supercharge/download`, the authenticated credentials of `marcus` must contain `book-supercharge` to start the bundle download. If `marcus` sends another request to `/book/nodejs/download` to download a Node.js book, this request will fail with an unauthorized error.
