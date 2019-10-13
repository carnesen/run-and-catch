# @carnesen/run-and-catch [![Build Status](https://travis-ci.com/carnesen/run-and-catch.svg?branch=master)](https://travis-ci.com/carnesen/run-and-catch)

Calls a function `fn` and _returns_ the exception if `fn` throws or _throws_ if `fn` does _not_ throw. Mostly useful for unit testing.

## Install

```
$ npm install @carnesen/run-and-catch
```
This package includes runtime JavaScript files suitable for Node.js >=8 as well as the corresponding TypeScript type declarations.

## Usage

Here is an example of running a function that throws:
```js
const { runAndCatch } = require('@carnesen/run-and-catch');

async function throwsAsync(message: string) {
  throw new Error(message);
}

const exception = throwsAsync(reject, 'Boo!');
console.log(exception.message);
// Boo!
```

`runAndExit` is intelligently typed in the sense that, continuing the previous example, the TypeScript compiler would complain if you tried this:
```ts
// NOT OK
runAndCatch(throwsAsync, 3);
// ^^ error TS2345: Argument of type '3' is not assignable to parameter of type 'string'.
```

## API

### runAndCatch(fn, ...args): Promise<exception>

Runs the provided function `fn` with arguments `args`. Returns a promise that _resolves_ to the value of the exception thrown by `fn` if it throws, or _throws_ an `Error` if `fn` does NOT throw.

#### fn

A function. Can return/throw a value synchronously or return a `Promise` (e.g. an `async` function). In either case, `runAndCatch` will `await fn(args)`.

#### args

Arguments passed to `fn`. If using TypeScript, `args` must be assignable to the parameter types of `fn` just as if you were calling `fn(args)` directly.

### runAndCatchSync(fn, ...args): exception

Same as `runAndCatch` above, but `runAndCatch` works for either ordinary or `async` functions whereas `runAndCatchSync` is only meant to work with ordinary functions and returns or throws synchronously instead of returning a `Promise`.

## More information
This micro-package has a half dozen unit tests with 100% coverage. If you want to see more examples of how it works, [those tests](src/index.test.ts) would be a good place to start. If you encounter any bugs or have any questions or feature requests, please don't hesitate to file an issue or submit a pull request on [this project's repository on GitHub](https://github.com/carnesen/run-and-catch).

## Related

- [@carnesen/run-and-exit](https://github.com/carnesen/run-and-exit): Run a function, `console.log` the result, then `process.exit`.

- [@carnesen/cli](https://github.com/carnesen/cli): A library for building Node.js command-line interfaces

## License

MIT © [Chris Arnesen](https://www.carnesen.com)
