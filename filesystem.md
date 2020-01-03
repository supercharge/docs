# Filesystem


## Introduction
Working with the filesystem in Node.js can be cumbersome, especially in combination with a code base using async/await. That’s the reason Supercharge provides you a handy filesystem abstraction. This sparks developer joy because Supercharge’s `filesystem` package is fully async. Every method in the Supercharge filesystem package is async and returns a promise to keep the consistency.

Retrieve the filesystem package in Supercharge like this:

```js
const Fs = require('@supercharge/framework/filesystem')
```
### Regarding Paths
In the documentation below, files are read from a 'path'.  This path is relative to the top-level directory of your Supercharge project.

For example: assume you create a project named 'mysupersite'

Supercharge will automatically create a subdirectory named 'public'.  Let's also assume **you** create another directory, below public, and name it 'my_downloadable_files'.

Your path on a Unix-based file system would be this:  **../mysupersite/public/my_downloadable_files**

But when writing JS code using Supercharge’s filesystem, you would reference that path like this:
```js
FS.readFile('public/my_downloadable_files/somefile.txt')
```
 
## Retrieve Files & Directories
Read files from the local disk using `Fs.readFile(path)`. This method returns the raw file content as string value:

```js
const Fs = require('@supercharge/framework/filesystem')

const content = await Fs.readFile('file.text')
```

Use `Fs.exists(path)` to determine whether a given file or directory exists on your disk:

```js
const exists = await Fs.exists('file.text')
```

To check whether a given path does not exist on the disk, use `Fs.notExists(path)`:

```js
const nope = await Fs.notExists('file.text')
```


### Retrieve Directories
You can retrieve a list of files within a directory using `Fs.files(path)`. **Notice:** this won’t step into subdirectories that may exist within the given `path`:

```js
const files = await Fs.files(path)
```

Retrieve all files recursively within a directories and its subdirectores, use `Fs.allFiles(path)`:

```js
const allFiles = await Fs.allFiles(path)
```


### File Metadata
Additinally to reading, storing, or deleting files and directories, you may retrieve metadata about the files themselves. Node.js ships with a [`Stats`](https://nodejs.org/docs/latest-v8.x/api/fs.html#fs_class_fs_stats) class providing a handful of properties about a file.

Use `Fs.stat(file)` to retrieve a `Stats` instance of a file:

```js
const stats = await Fs.stat('avatar.png'))
```

You may also check whether a given path is a file using `Fs.isFile(path)`:

```js
const isFile = await Fs.isFile('avatar.png'))
// true
```

Use `Fs.isDirectory(path)` to check if a path is a directory:

```js
const isDirectory = await Fs.isDirectory('path/to/dir/avatar.png'))
// false

const isDirectory = await Fs.isDirectory('path/to/dir'))
// true
```

In some cases it’s helpful to determine the last modified date of a file. Use `Fs.lastModified(file)` to retrieve the last modified JavaScript date of the given file:

```js
const date = await Fs.lastModified('logo.png'))
```

With `Fs.lastAccessed(file)` you retrieve a JavaScript date of the last time someone accessed the file:

```js
const date = await Fs.lastAccessed('file.png'))
```

To ensure if your application can access a given file, you may use `Fs.canAccess(file)`:

```js
const canAccess = await Fs.canAccess('file.png'))
```

Retrieve a file’s extension with `Fs.extension(file)`:

```js
const extension = await Fs.extension('blog.md'))
// '.md'
```

The basename of a file returns the last part of a path. Retrieve the basename of a file using `Fs.basename(file)`:

```js
const basename = await Fs.basename('/storage/app/blog.md'))
// 'blog.md'
```

If you only want the actual filename without the extension, use `Fs.filename(file)`:

```js
const date = await Fs.filename('/storage/app/blog.md'))
// 'blog'
```

The `Fs.dirname(path)` method returns the directory name of a given path:

```js
const date = await Fs.dirname('/storage/app/blog.md'))
// /storage/app
```


## Saving Files
Writing content to a file requires a file handle to exist on the local file system. To ensure a file actually exists, you may use `Fs.ensureFile(path)` method. This creates a new file if it doesn’t already exists. It won’t override an existing file:

```js
await Fs.ensureFile('storage/app/blog/tutorial-1.md')
```

You may write content to a file on your disk using `Fs.writeFile(path, content)`:

```js
await Fs.writeFile('storage/app/blog/tutorial-1.md', '# Tutorial Title')
```

Use `Fs.copy(source, dest)` to duplicate an existing file and copy it from the source to a destination:

```js
await Fs.copy('tutorial-1.md', 'tutorial-2.md')
```

For situations where you want to move a file on the disk, use `Fs.move(from, to)`:

```js
await Fs.move('tutorial-1.md', 'archive/tutorial-1.md')
```

In some situations, it’s helpful to adjust the permissions of files or directories. Use `Fs.chmod(file)` to adjust the permissions. Pass in an integer value and the framework translates it to the required “oct” value:

```js
await Fs.chmod(file, 600)
```

Create a link from an existing file to a linked file using `Fs.ensureLink(from, to)`:
```js
await Fs.ensureLink('archive/tutorial-1.md', 'posts/tutorial-1.md')
```

You may also create symbolic links using `await Fs.ensureSymlink(from, to)`:

```js
await Fs.ensureSymlink('archive/tutorial-1.md', 'posts/tutorial-1.md')
```

```info
Windows restricts the creation of symlinks to admin users. You need to grant your user additional permissions to create symlinks. If your user is part of the admin group, you always need to run your code with administrator rights.


If you you run into `operation not permitted` errors while creating symlinks on Windows, have a [look at your user permissions](https://superuser.com/questions/104845/permission-to-make-symbolic-links-in-windows-7).
```

If you need a temporary file, you can use `Fs.tempFile(file)` to create a handle in a location where the operating system automatically cleans it up:

```js
const tempAvatar = await Fs.tempFile('user-1-avatar-upload')
await Fs.writeFile(tempAvatar, content)
```


### Lock Files
You application may require file locks on your file system to ensure a correct processing flow. This may be helpful in setups using parallel processing.

You may create a file lock using `Fs.lock(file)`:

```js
await Fs.lock('tutorial-1.md')
```

Release a lock on a file using `Fs.unlock(file)`

```js
await Fs.unlock('tutorial-1.md')
```

Determine whether a given file is currently locked, use the `Fs.isLocked(file)` method:

```js
await Fs.isLocked('tutorial-1.md')
```


### Create Directories
Structuring files on your local hard drive may require directories. Create a new directory using `Fs.ensureDir(path)`. This creates a new directory at the given path if it doesn’t already exists. It won’t override an existing path:

```js
await Fs.ensureDir('storage/avatars')
```

For a temporary directory, use `Fs.tempDir(path)`. This temporary folder will be created in a location where the operating system automatically cleans up after a certain time period. You don’t need to remove it manually:

```js
await Fs.tempDir('storage/avatars')
```


## Deleting Files & Directories
Delete single files from the file system using `Fs.remove(path)`:

```js
if (await Fs.exists(path)) {
  await Fs.remove(path)
}
```

You can remove all files and subdirectories in a given directory using `Fs.emptyDir(path)`:

```js
await Fs.emptyDir(path)
```
