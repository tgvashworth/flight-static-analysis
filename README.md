# flight-static-analysis

Static analysis tool for event-driven JavaScript.

Operates on a stream of file paths, outputs a new-line delimited stream of JSON.

### Plan

- Group files by event
- Map event usage (ie, on this event, what gets triggered?)
- Graph dependencies and event interaction

## Install

```
$ npm install -g flight-static-analysis
```

I'd recommend also installing `json-stream-inspect` and `tree-watch` globally.

## Usage

`cd` to your project's folder.

```shell
tree-watch . "**/*.js" | flight-static-analysis | json-stream-inspect
```

For TweetDeck, it looks something like this:

```shell
tree-watch ./client/web/scripts/swift/app "**/*.js" | flight-static-analysis | json-stream-inspect
```

### Trying it out

If you've cloned this project, try this:

```shell
$ cat test/files.txt | flight-static-analysis | json-stream-inspect
```

## License

MIT