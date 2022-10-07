import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sortBy', pure: false })
export class SortByPipe implements PipeTransform {
	transform(array: any[], sortOrder: 'asc' | 'desc', field: string): any[] {
		if (!field) return array;
		array.sort((a: any, b: any) => {
			if (a[field] < b[field]) {
				return -1;
			} else if (a[field] > b[field]) {
				return 1;
			} else {
				return 0;
			}
		});

		return sortOrder === 'asc' ? array : array.sort().reverse();
	}
}
