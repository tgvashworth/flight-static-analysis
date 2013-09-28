# flanel

Very basic static analysis tool for event-driven JavaScript.

Operates on a stream of files, outputs a new-line delimited stream of JSON.

### Plan

- Find events listened for and triggered
- Make events searchable ([flanel-search](#))
- Group files by event
- Map event usage (ie, on this event, what gets triggered?)
- Graph dependencies and event interaction

## Install

```shell
$ npm install -g flanel flanel-search
```

## Usage

`cd` to your project's folder.

```shell
find . -name '*.js' -print | flanel | flanel-search click
```

### Trying it out

If you've cloned this project, try this:

```shell
$ flanel < test/files.txt | flanel-search click
```

You should see something like this:

![example output](https://i.cloudup.com/Jnlj2TcW2l-3000x3000.png)