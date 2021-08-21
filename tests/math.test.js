const { defaultSum, fahrenheitToCelsius,celsiusToFahrenheit, add } = require('../src/math');

test('should return sum of two points', () => {
	expect(defaultSum(10, 0.5)).toBe(15);
});


test('should calculate sum with default params', () => {
	expect(defaultSum(10)).toBe(12.5);
});


test('converts f to c', () => {
	expect(fahrenheitToCelsius(32)).toBe(0);
});

test('converts c to f', () => {
	expect(celsiusToFahrenheit(0)).toBe(32);
})

test('async function test', (done) => {
	setTimeout(() => {
		expect(1).toBe(1);
		done();
	}, 2000)
});

test('should add two numbers', (done) => {
	add(2,3).then(sum => {
		expect(sum).toBe(5);
		done();
	});
});

test('should add two numbers async/await', async () => {

	const sum = await add(2,3);
	expect(sum).toBe(5);
})