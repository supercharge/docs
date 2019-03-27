# Pagination


## Introduction
Paginating large data sets is a common use case in web applications and APIs. Supercharge integrates a Pagination utility providing convenient access to paginate query results and also a pagination HTML view.


## Usage
At first, import the Pagination utility from the Supercharge framework. Creating a new Pagination instance accepts an options object with three properties:

1. `request` (required): the request object that includes a query parameter named `page` with an integer value
2. `totalCount` (required): the total amount of entries in your collection
3. `perPage` (optional): the amount of items you want to display per page; the default value is `8` items per page

Pagination in Supercharge requires you to have a **query parameter called `page`** on your request to determine the current page. Pagination based on path parameters doesn’t work at this point.

Here’s a code snippet illustrating pagination:

```js
const Paginator = require('@supercharge/framework/pagination')

module.exports = {
  handler: async (request, h) => {
    const totalCount = await Movie.count()
    const pagination = new Paginator({ request, totalCount, perPage: 12 })

    if (pagination.currentPage > pagination.lastPage) {
      return h.view('404').code(404)
    }

    const movies = await Movie.find()
      .skip(pagination.from)
      .limit(pagination.perPage)

    return h.view('movies/index', {
      movies,
      pagination
    })
  }
}
```

Depending on whether you paginate data sets in a web app or an API, your response is different. You must handle situations yourself where a user requests a page that exceeds the last page of the paginated collection. Supercharge will not throw an error or assign the last page’s value to the requested page.


## Example
Imagine a request to `https://superchargejs.com?page=2`. The returned object from `new Paginator({ request, totalCount })` may look like this:

```js
{
  total: 26,
  perPage: 8,
  currentPage: 2,
  lastPage: 4,
  first: 'https://superchargejs.com?page=1',
  prev: 'https://superchargejs.com?page=1',
  next: 'https://superchargejs.com?page=3',
  last: 'https://superchargejs.com?page=4',
  from: 8,
  to: 16,
  link: '<https://superchargejs.com?page=1>; rel="first", <https://superchargejs.com?page=1>; rel="prev", <https://superchargejs.com?page=3>; rel="next", <https://superchargejs.com?page=4>; rel="last"'
}
```


## Displaying Results
Every Supercharge application ships with a `pagination` Handlebars partial view. This is located in your `resources/views/partials` directory. This view uses HTML markup that is compatible with the [Bootstrap CSS framework](https://getbootstrap.com/docs/4.1/components/pagination/).

Use the `pagination` partial view if you want to display paginated results. Import this partial in your views:


```handlebars
<table>
  <!-- paginated data set -->
<table>

<div>
  {{> pagination}}
</div>
```

Please notice that the pagination partial view requires a `pagination` object in the response context. The code snippet in the “Usage” section returns a view and adds the pagination details to the view context’s data.

Feel free to update this view in case you’re using another CSS framework or want a different styling.

