# Handlebars Helpers


## Introduction
The Supercharge frameworks ships with built-in [support for view rendering using Handebars templates](/docs/{{version}}/handlebars). Also, Supercharge provides you a handful of convenient helpers which are automatically registered when starting your application. You can use all helpers in your Handlebars templates without extra configuration.


## JSON
In some situations, you may want to pass a JSON string your views. To convert a JavaScript object to a JSON data structure, use the `{{json}}` helper:

```handlebars
<script>
    const json = {{json data}}
</script>
```

The `{{json}}` helper creates a minified JSON string by default. If you need a pretty printed JSON string with line breaks and two spaces indention, pass the `pretty=true` attribute to the helper:

```handlebars
<script>
    const json = {{json data pretty=true}}
</script>
```


## Raw Templates
In situations where you don’t want Handlebars to render your template, you can use the `{{#raw}}` block helper. This helper deactivates Handlebars template rendering and any interpolation.

```handlebars
<div>
    {{#raw}}
        <vuejs-component></vuejs-component>
    {{/raw}}
</div>
```

A raw template may be helpful when using Handlebars in combination with [Vue.js](https://vuejs.org) or any other frontend framework.


## CSRF Field
Every time you’re adding a form in your application, you should add a CSRF token. This CSRF token can then be validated by the CSRF protection middleware. In your forms, add a hidden CSRF form field using the `{{csrf}}` helper:

```handlebars
<form method="POST">
    {{csrf}}

    …
</form>
```


## CSRF Token
For siutations where you only need the CSRF token and not a hidden form field, you may use the `{{csrfToken}}` helper. This helpers returns the plain CSRF token value:

```handlebars
<form method="POST">
    <input type="hidden" name="yourCsrfFieldName" value="{{csrfToken}}">

    …
</form>
```
