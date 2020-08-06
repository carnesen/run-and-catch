# @carnesen/run-and-catch

[![Build Status](https://github.com/carnesen/run-and-catch/workflows/test/badge.svg)](https://github.com/carnesen/run-and-catch/actions?query=workflow%3Atest+branch%3Amaster) [![npm version badge](https://badge.fury.io/js/%40carnesen%2Fcli.svg)](https://www.npmjs.com/package/@carnesen/run-and-catch) [![github stars badge](https://img.shields.io/github/stars/carnesen/run-and-catch)](https://github.com/carnesen/run-and-catch)

Calls a function and throws if it doesn't and doesn't if it does. Useful for unit testing throws in async functions.

## Install

```
$ npm install @carnesen/run-and-catch
```
This package includes runtime JavaScript files (ES2017 + CommonJS) and their corresponding TypeScript type declarations.

## Usage

Here is an example of a unit test for an async function that throws:
```typescript
import { runAndCatch } from '@carnesen/run-and-catch';

async function myFunc(message: string) {
   if (message.startsWith('_')) {
      throw new Error('Message is not allowed to start with _');
   }
}

describe(myFunc.name, () => {
   it('throws "not allowed" if message starts with _', async () => {
      // THE CLUNKY WAY. DON'T DO IT LIKE THIS.
      try {
         await myFunc('_foo');
         throw new Error('The previous line should have thrown');
      } catch (exception) {
         expect(exception.message).toMatch('not allowed');
      }

      // THE BETTER WAY WITH @carnesen/run-and-catch
      const exception = await runAndCatch(myFunc, '_foo');
      expect(exception.message).toMatch('not allowed');
      expect(exception.code).toBe('BAD_MESSAGE');
   });
});
```

`runAndCatch` is intelligently typed in the sense that the TypeScript compiler would complain if you tried this:
```typescript
// NOT OK
runAndCatch(myFunc, 3);
// ^^ error TS2345: Argument of type '3' is not assignable to parameter of type 'string'.
```
`runAndCatch` throws if the function does _not_ throw:
```typescript
// throws "Expected the provided function to throw."
runAndCatch(myFunc, 'hello');
```
This package also exports a synchronous function runner, `runAndCatchSync` that is just like `runAndCatch` except it does not `await` on the result of function call. 

## More information
This micro-package has a half dozen unit tests with 100% coverage. Check out [those tests](src/__tests__/index.test.ts) for more examples. If you encounter any bugs or have any questions or feature requests, please don't hesitate to file an issue or submit a pull request on [this project's repository on GitHub](https://github.com/carnesen/run-and-catch).

## Related

- [@carnesen/run-and-exit](https://github.com/carnesen/run-and-exit): Run a function, `console.log` the result, then `process.exit`.

- [@carnesen/cli](https://github.com/carnesen/cli): Command-line interfaces for Node.js and the web

## License

MIT © [Chris Arnesen](https://www.carnesen.com)
