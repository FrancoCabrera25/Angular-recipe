import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	@Output() inputValueEvent = new EventEmitter<string>();
	ngOnInit(): void {}

	applyFilter(event: any): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.inputValueEvent.emit(filterValue);
	}
}
