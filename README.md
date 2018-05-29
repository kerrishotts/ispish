# **ispish**
A simple lisp/logo-like language. Small enough to learn quickly, while still teaching valuable learning and programming skills.

## Installing **ispish**

To install **ispish**:

```bash
$ npm install ispish
```

## Using the **ispish** CLI

**ispish** comes with a CLI that can execute programs and act as an interactive programming environment.

```bash
$ ispish [--print] [--interactive] [...files]
```

The CLI will execute each file in order of its appearance on the command line. If **ispish** is executed as the recipient of a pipe or redirect, the pipe or redirect will be executed last.

Options:
* `--print`: Tells **ispish** to output the last result to the terminal
* `--interactive`: Tells **ispish** to enter interactive mode

## Learning **ispish**

Start by [reading the documentation](./docs/index.md). Also take a look [at the tests for **ispish**](./test).

## License

Apache 2.0
