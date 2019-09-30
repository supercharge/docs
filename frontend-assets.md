# Frontend Assets


## Introduction
A new Supercharge applications ships with routes to serve assets. All asset-related routes are located in the `app/routes/assets.js` file.

The routes defined in the `app/routes/assets.js` file have static references to the `public` directory to serve these assets publicly. The Supercharge application boilerplate has predefined folders and files to make it as seamless as possible for you to add your public assets.

Supercharge uses the [`@hapi/inert`](https://github.com/hapijs/inert) plugin to connect the routes to the `public` directory on your filesystem.

Even though the asset routes reference the `public` folder, the individual route paths **don’t** contain the word "public" in the path. For example, CSS files are availabe on URL path `/css/{css-file-name}.css` and not on `/public/css/{css-file-name}.css`.


## CSS
Supercharge serves CSS files from the `public/css` directory. You’ll find an existing `style.css` in this directory. This file defines the default layout for the Supercharge start page. You can surely adjust and change the styling to your needs.

Please notice, the Supercharge default layout uses [Bootstrap 4](https://getbootstrap.com) to have a solid foundation for sophisticated user interfaces.

At this point, Supercharge doesn’t ship with an asset pipeline to compile static assets for production. As soon as you integrate a pipeline, point the CSS outputs to the `public/css` directory.


## JavaScript
Supercharge serves JS files from the `public/js` directory. A new Supercharge installation doesn’t contain any JavaScript file. Nonetheless, you’ll find the `public/js` folder because it contains a `.gitkeep` file. The `.gitkeep` file is a workaround to keep the empty `public/js` folder in the Supercharge application boilerplate’s git repository. You may remove this file as soon as you add your own JavaScript files.

If you create nested directories inside of `public/js`, you can reference them in your layouts using the related path. For example, a file located at `public/js/code/highlight.js` should be referenced in your design like this:

```html
<script src="/js/code/highlight.js"></script>
```


## Images
Supercharge serves images from the `public/images` directory. In a new Supercharge installation, you’ll find a handful of existing images like the Supercharge logo. Of course, you can go ahead and delete or replace them.
