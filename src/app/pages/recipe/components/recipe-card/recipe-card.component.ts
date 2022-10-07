import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { IRecipe } from '../../../../shared/interface/recipe.interface';

@Component({
	selector: 'app-recipe-card',
	templateUrl: './recipe-card.component.html',
	styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit, OnDestroy {
	@Input() recipe!: IRecipe;

	@Output() viewMoreEvent = new EventEmitter<void>();
	@Output() changeReviewsEvent = new EventEmitter<number>();
	@Output() changeCookedBeforeEvent = new EventEmitter<boolean>();
	ngOnDestroy(): void {}
	ngOnInit(): void {}

	viewMore(): void {
		this.viewMoreEvent.emit();
	}

	changeReviews(reviews: number): void {
		this.changeReviewsEvent.emit(reviews);
	}
	changeCookedBefore({ checked }: MatSlideToggleChange): void {
		this.changeCookedBeforeEvent.emit(checked);
	}
}
