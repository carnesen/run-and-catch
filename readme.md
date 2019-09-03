# @carnesen/run-and-catch [![Build Status](https://github.com/carnesen/run-and-catch/workflows/tests/badge.svg)

Run a function expecting it to throw

## Install

```
$ npm install @carnesen/run-and-catch
```
This package includes runtime JavaScript files suitable for Node.js >=8 as well as the corresponding TypeScript type declarations.

## Usage

Here is an example of running a function that throws:
```js
const { runAndCatch } = require('@carnesen/run-and-catch');

function throwError(message: string) {
  throw new Error(message);
}

const err = runAndCatch(throwError, 'Boo!');

console.log(err.message);
// Boo!
```

Conversely, if the function does NOT throw when invoked, `runAndCatch` DOES throw. 

`runAndExit` is intelligently typed in the sense that, continuing the previous example, the TypeScript compiler would complain if you tried this:
```ts
// NOT OK
runAndCatch(throwError, 3);
// ^^ error TS2345: Argument of type '3' is not assignable to parameter of type 'string'.
```
This is achieved using ["rest parameters with tuple types"](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#rest-parameters-with-tuple-types), new in TypeScript 3.0. If you're using an older version of TypeScript, `runAndCatch` may not work as advertised here.

## API

### runAndCatch(fn, ...args)

Runs the provided function `fn` with arguments `args`. Returns the exception if one is raised or throws one otherwise.

#### fn

A function. Can return/throw a value synchronously or return a `Promise` (e.g. an `async` function).

#### args

Arguments passed to `fn`. If using TypeScript, `args` must be assignable to the parameter types of `fn` just as if you were calling `fn(args)` directly.

## More information
This micro-package has a half dozen unit tests with 100% coverage. If you want to see more examples of how it works, [those tests](src/index.test.ts) would be a good place to start. If you encounter any bugs or have any questions or feature requests, please don't hesitate to file an issue or submit a pull request on this project's repository on GitHub.

## Related

- [@carnesen/run-and-exit](https://github.com/carnesen/run-and-exit): Run a function, `console.log` the result, then `process.exit`.

- [@carnesen/cli](https://github.com/carnesen/cli): A library for building Node.js command-line interfaces

## License

MIT © [Chris Arnesen](https://www.carnesen.com)
