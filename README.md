# flannel

Very basic static analysis tool for event-driven JavaScript.

Operates on a stream of files, outputs a new-line delimited stream of JSON.

### Plan

- Find events listened for and triggered
- Make events searchable ([flannel-search](#))
- Group files by event
- Map event usage (ie, on this event, what gets triggered?)
- Graph dependencies and event interaction

## Install

Clone this repo and [flannel-inspect](https://github.com/phuu/flannel-inspect), and run `npm link` in both.

## Usage

`cd` to your project's folder.

```shell
find . -name '*.js' -print | flannel | flannel-inspect
```

### Trying it out

If you've cloned this project, try this:

```shell
$ cat test/files.txt | flannel | flannel-inspect
```