// example.js

const { runAndCatch } = require('.');

function throwAnError(message) {
	throw new Error(message);
}

function doNothing() {}

/* eslint-disable no-console */
(async () => {
	const returnValue = await runAndCatch(throwAnError, 'something bad happened');
	console.log(
		`Q: Return value is an Error? A: ${returnValue instanceof Error}.`,
	);
	console.log(`returnValue.message: "${returnValue.message}"`);
	try {
		await runAndCatch(doNothing);
	} catch (exception) {
		console.log(`Exception message: ${exception.message}`);
	}
})();
// Q: Return value is an Error? A: true.
// returnValue.message: "something bad happened"
// Exception message: Expected function to throw
