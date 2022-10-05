import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'customfilter'
})
export class FilterPipe implements PipeTransform {
	public transform(items: any[], field: string, search: string): any[] {
		if (!items) return items;
		if (!search) return items;
		return items.filter((f) => f[field].toLowerCase() === search.toLowerCase());
	}
}
