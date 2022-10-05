import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-rating',
	templateUrl: './rating.component.html',
	styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
	constructor() {}
	@Input() color: string = 'accent';
	@Input() element: number = 0;
	@Output() rankingSelectedEvent = new EventEmitter<number>();
	ratingArr: Array<Number> = new Array<number>(5);

	ngOnInit(): void {}

	onClick(number: number): void {
		this.rankingSelectedEvent.emit(number);
	}

	showIcon(index: number, element: any) {
		if (element >= index + 1) {
			return 'star';
		} else {
			return 'star_border';
		}
	}
}
