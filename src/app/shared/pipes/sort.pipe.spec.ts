import { SortByPipe } from './sort.pipe';

const arrayTest = [
	{
		title: 'aaaa',
		preparation: 'Mixed Berry Melody 3',
		ingredients: ['Mixed Berry Melody', 'Mixed Berry Melody', 'Mixed Berry Melody'],
		reviews: 3,
		cookedBefore: true
	},
	{
		title: 'bbbb',
		preparation: 'Mixed Berry Melody',
		ingredients: ['Mixed Berry Melody', 'Mixed Berry Melody', 'Mixed Berry Melody'],
		reviews: 3,
		cookedBefore: true
	},
	{
		title: 'cccc',
		preparation: 'Mixed Berry Melody',
		ingredients: ['Mixed Berry Melody', 'Mixed Berry Melody', 'Mixed Berry Melody'],
		reviews: 3,
		cookedBefore: true
	}
];
fdescribe('SortPipe', () => {
	it('create an instance', () => {
		const pipe = new SortByPipe();
		expect(pipe).toBeTruthy();
	});

	it('should sort title for asc to array test', () => {
		const pipe = new SortByPipe();
		let filterdPipe = pipe.transform(arrayTest, 'asc', 'title');
		expect(filterdPipe[0].title).toBe('aaaa');
	});

	it('should sort title for desc to array test', () => {
		const pipe = new SortByPipe();
		let filterdPipe = pipe.transform(arrayTest, 'desc', 'title');
		expect(filterdPipe[0].title).toBe('cccc');
	});

	// it('should sort title for asc to array for field is empty', () => {
	// 	const pipe = new SortByPipe();
	// 	let filterdPipe = pipe.transform(arrayTest, 'asc', '');
	// 	console.log('filterdPipe', filterdPipe);
	// 	expect(filterdPipe[0].title).toBe('aaaa');
	// });
});
