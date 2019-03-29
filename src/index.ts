export async function runAndCatch<T extends any[]>(fn: (...args: T) => any, ...args: T) {
  let shouldThrow = false;
  let exception: any;
  try {
    // We expect the following line to throw
    await fn(...args);
    // The previous line did not throw, which is unexpected
    shouldThrow = true;
  } catch (ex) {
    exception = ex;
  }
  if (shouldThrow) {
    throw new Error('Expected function to throw');
  }
  return exception;
}
