import { FilterPipe } from './filter.pipe';

const arrayTest = [
	{
		title: 'Mixed Berry Melody',
		preparation: 'Mixed Berry Melody 3',
		ingredients: ['Mixed Berry Melody', 'Mixed Berry Melody', 'Mixed Berry Melody'],
		reviews: 3,
		cookedBefore: true
	},
	{
		title: 'Mixed  Melody',
		preparation: 'Mixed Berry Melody',
		ingredients: ['Mixed Berry Melody', 'Mixed Berry Melody', 'Mixed Berry Melody'],
		reviews: 3,
		cookedBefore: true
	},
	{
		title: 'Mixed Berry ',
		preparation: 'Mixed Berry Melody',
		ingredients: ['Mixed Berry Melody', 'Mixed Berry Melody', 'Mixed Berry Melody'],
		reviews: 3,
		cookedBefore: true
	}
];
fdescribe('FilterPipe', () => {
	it('create an instance', () => {
		const pipe = new FilterPipe();
		expect(pipe).toBeTruthy();
	});

	it('should return array filtered', () => {
		const pipe = new FilterPipe();
		let filterdPipe = pipe.transform(arrayTest, 'title', 'Mixed Berry Melody');
		expect(filterdPipe.length).toBe(1);
		expect(filterdPipe).toEqual([
			{
				title: 'Mixed Berry Melody',
				preparation: 'Mixed Berry Melody 3',
				ingredients: ['Mixed Berry Melody', 'Mixed Berry Melody', 'Mixed Berry Melody'],
				reviews: 3,
				cookedBefore: true
			}
		]);
	});

	it('should return array with search is empty', () => {
		const pipe = new FilterPipe();
		let filterdPipe = pipe.transform(arrayTest, 'title', '');
		expect(filterdPipe.length).toBe(3);
		expect(filterdPipe).toEqual(arrayTest);
	});

	it('should return array is empty', () => {
		const pipe = new FilterPipe();
		let filterdPipe = pipe.transform([], 'title', 'Mixed Berry Melody');
		expect(filterdPipe.length).toBe(0);
	});
});
