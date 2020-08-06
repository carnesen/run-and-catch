import { runAndCatch, runAndCatchSync } from '../index';

describe(runAndCatch.name, () => {
	it('calls a function that throws and returns the exception', async () => {
		const exception = await runAndCatch(() => {
			throw new Error('Boo!');
		});
		expect(exception.message).toBe('Boo!');
	});

	it('calls a async function that rejects returns its "reason"', async () => {
		const err = new Error('Boo!');
		const ret = await runAndCatch(() => Promise.reject(err));
		expect(ret).toBe(err);
	});

	it('throws if the provided function does not', async () => {
		try {
			await runAndCatch(() => {});
			throw new Error('this line should not be reached');
		} catch (ex) {
			expect(ex.message).toMatch(/expected the provided function to throw/i);
		}
	});
});

describe(runAndCatchSync.name, () => {
	it('calls a function that throws and returns the exception', () => {
		const exception = runAndCatchSync(() => {
			throw new Error('Boo!');
		});
		expect(exception.message).toBe('Boo!');
	});

	it('throws if the provided function does not', () => {
		try {
			runAndCatchSync(() => {});
			throw new Error('this line should not be reached');
		} catch (ex) {
			expect(ex.message).toMatch(/expected the provided function to throw/i);
		}
	});
});
