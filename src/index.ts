/**
 * Calls a function or async function and throws if the function doesn't and
 * doesn't if it does
 * @param fn A function or async function
 * @param args Arguments with which to invoke the function
 */
export async function runAndCatch<TArgs extends any[]>(
	fn: (...fnArgs: TArgs) => any,
	...args: TArgs
): Promise<any> {
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
 * Synchronous version of [[`runAndCatch`]]. Calls a function and throws if it
 * doesn't and doesn't if it does
 * @param fn A function
 * @param args Arguments with which to invoke the function
 */
export function runAndCatchSync<TArgs extends any[]>(
	fn: (...fnArgs: TArgs) => any,
	...args: TArgs
): any {
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
