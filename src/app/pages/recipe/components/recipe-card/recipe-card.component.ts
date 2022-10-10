import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { getColorDifficultyLevel } from 'src/app/shared/utils/utils';
import { IRecipe } from '../../../../shared/interface/recipe.interface';

@Component({
	selector: 'app-recipe-card',
	templateUrl: './recipe-card.component.html',
	styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit, OnDestroy {
	@Input() recipe!: IRecipe;

	@Output() viewMoreEvent = new EventEmitter<void>();
	@Output() changeReviewsEvent = new EventEmitter<{ recipe: IRecipe; reviews: number }>();
	@Output() changeCookedBeforeEvent = new EventEmitter<{ recipe: IRecipe; cookedBefore: boolean }>();
	ngOnDestroy(): void {}
	ngOnInit(): void {}

	viewMore(): void {
		this.viewMoreEvent.emit();
	}

	changeReviews(reviews: number): void {
		this.changeReviewsEvent.emit({ recipe: this.recipe, reviews });
	}
	changeCookedBefore({ checked }: MatSlideToggleChange): void {
		this.changeCookedBeforeEvent.emit({ recipe: this.recipe, cookedBefore: checked });
	}

	getcolorDifficultyLevel(level: string): string {
		return getColorDifficultyLevel(level);
	}
}
