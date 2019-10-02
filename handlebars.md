# Handlebars


## Introduction
Supercharge uses the [Handlebars](https://handlebarsjs.com/) template rendering engine to translate your views into HTML. Handlebars is extensible by default allows you to build complex layouts. Starting from a base layout, you may add partial views to ultimately compose the final HTML.

Supercharge supports Handlbars files using the `.hbs` file extension and automatically picks up all the view files located in the `resources/views` directory.


## Supercharge Layout Presets
A new Supercharge application ships with a [Bootstrap 4](https://getbootstrap.com) layout preset. This preset contains a base layout and partial views for navigation and footer.

The bootstrap layout preset has various benefits: it improves the webiste aesthetic, makes a good first impression when starting to work with Supercharge, and most important: it provides you a solid starting point using a sophisticated CSS framework.


## Base Layouts
Designing websites can be cumbersome without base layouts because you would repeat the overall layout in every view. That’s where base layouts help you out. A base layout is the default HTML structure where you’re adding the actual page content. Base layouts in Supercharge are located in the `resources/views/layouts` directory.

Imagine the follolwing example to get a grasp on base layouts. Your website may have three pages: startpage, blog, and about. All three pages use the same base styling with a navigation on top and a footer at the site’s bottom. The only thing you’re changing on each page is the actual content.

A base layout provides you with the structure to put a navigation on top, the footer at the bottom and a content placeholder in-between.


### Adding a Layout
A Supercharge application ships with a default “app” layout located at `resources/views/layouts/app.hbs`. Adding a new base layout is straightforward. Add a new layout file in `resources/views/layouts` and you can use it in your application.

Let’s say you want a dedicated landing page layout with a hero unit. Such a base layout could look like this:

```handlebars
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>

    {{> hero }}

    <div class="container" role="main">
        <div class="row">
            {{{ content }}}
        </div>
    </div>

    {{> footer }}

</body>

</html>
```

As you can see in the markup, the base layout uses the `hero` and `footer` partial views to inject the content from these templates. The `hero` view may contain a navigation partial view as well.


## Partials
Superchare automatically loads all Handlebars helpers located in the `resources/views/partials` directory. Partials are partial views containing HTML sections for sections on your website. Typically, the navigation of your website layout is a partial view:

```handlebars
<nav class="navbar navbar-expand-md navbar-light bg-white border-bottom">
    <div class="container">

        {{> logo }}

        {{> nav/nav-center}}

        {{> nav/nav-right}}

    </div>
</nav>
```

The navigation partial may then provide the basic structure, like the brand on the left and links on the right. The navigation partial itself may reference other partials, like a `logo` partial, or `nav-center` and `nav-right` partials.


## Helpers
Superchare automatically loads all Handlebars helpers located in the `resources/views/helpers` directory. Handlebars supports two types of helpers: plain and block helpers.

Plain helpers are regular handlebars expressions and look like a variable accessor, for example:

```handlebars
<form method="POST">
    {{csrf}}

    …
</form>
```

In contrast, block helpers are expressions starting with `#` and provide a structured block, for example:

```handlebars
<div>
    <h2>
        {{#if name}}
            Hello {{name}}
        {{else}}
            Hello my friend
        {{/if}}
    </h2>
</div>
```

Handlebars itself ships with helpers to conveniently render dynamic views. Also, Supercharge provides you a handful of [Handlebars helpers](/docs/{{version}}/handlebars-helpers).

