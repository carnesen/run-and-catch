/**
  Calls and `await`s `fn(args)`. _Returns_ the exception if `fn` throws or
  _throws_ if `fn` does _not_.
  */
export async function runAndCatch<TArgs extends any[]>(
  fn: (...args: TArgs) => any,
  ...args: TArgs
) {
  let resolvedValue: any;
  try {
    // We expect the following line to throw
    resolvedValue = await fn(...args);
    // The previous line did not throw, which is unexpected
  } catch (exception) {
    return exception;
  }
  throw new Error(
    `Expected the provided function to throw. Instead it returned ${resolvedValue}`,
  );
}

/**
  Calls `fn(args)`. _Returns_ the exception if `fn` throws or _throws_ if
  `fn` does _not_.
  */
export function runAndCatchSync<TArgs extends any[]>(
  fn: (...args: TArgs) => any,
  ...args: TArgs
) {
  let returnedValue: any;
  try {
    // We expect the following line to throw
    returnedValue = fn(...args);
    // The previous line did not throw, which is unexpected
  } catch (exception) {
    return exception;
  }
  throw new Error(
    `Expected the provided function to throw. Instead it returned ${returnedValue}`,
  );
}
