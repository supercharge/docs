# Installation
Installation


### Example Code Block
What do you think about the code block theme?

```js
class Documentation {
  async get(version, page) {
    return this.readAndParseFile(version, `${page}.md`)
  }

  async getIndex(version) {
    return require(Path.resolve(__appRoot, 'resources', 'docs', 'navigation'))
  }

  async readAndParseFile(version, file) {
    const path = Path.resolve(__appRoot, 'resources', 'docs', version, file)

    if (Fs.existsSync(path)) {
      const content = await ReadFile(path, 'utf8')

      return this.replaceLinks(version, Markdown(content))
    }
  }
}
```

Do you like it?

```info
This is my tasty info block that is quite long. **Goodness, here's a lot of text**. But sometimes it's important to run `npm install` first. From here, it might work for you.
In case everything goes south, check out the [config docs](#) over here.
```

```warning
Short.
```

```success
End the day with a success.
```
