# Installation
Installation


### Example Code Block
Text

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

More text.
