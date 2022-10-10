import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { getColorDifficultyLevel } from 'src/app/shared/utils/utils';
import { IRecipe } from '../../../../shared/interface/recipe.interface';
import { SortByPipe } from '../../../../shared/pipes/sort.pipe';

@Component({
	selector: 'app-recipe-table',
	templateUrl: './recipe-table.component.html',
	styleUrls: ['./recipe-table.component.scss']
})
export class RecipeTableComponent implements OnInit, OnChanges {
	@Input() displayedColumns: Array<string> = [];
	@Input() dataSource: IRecipe[] = [];
	@Input() filterValue: string = '';
	@Input() sortValue: string = '';
	@Input() sortOrder: 'asc' | 'desc' = 'asc';
	@Output() recipeSelectedEvent = new EventEmitter<IRecipe>();
	@Output() changeReviewsEvent = new EventEmitter<{ recipe: IRecipe; reviews: number }>();
	@Output() changeCookedBeforeEvent = new EventEmitter<{ recipe: IRecipe; cookedBefore: boolean }>();
	recipeSelected!: IRecipe;
	recipeFiltered: IRecipe[] = [];
	constructor(private filterPipe: FilterPipe, private sortPipe: SortByPipe) {}

	ngOnInit(): void {
		this.recipeFiltered = [...this.dataSource];
		this.setRecipeFilter();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes?.filterValue?.previousValue) {
			this.filterValue = changes?.filterValue?.currentValue;
			this.setRecipeFilter();
		}

		if (changes?.sortValue?.previousValue) {
			this.sortValue = changes?.sortValue?.currentValue;
			this.setRecipeSort();
		}

		if (changes?.sortOrder?.previousValue) {
			this.sortOrder = changes?.sortOrder?.currentValue;
			this.setRecipeSort();
		}
	}
	setRecipeFilter(): void {
		const recipeFiltered = this.filterPipe.transform(this.recipeFiltered, 'title', this.filterValue);
		this.dataSource = [...recipeFiltered];
	}

	setRecipeSort(): void {
		let recipeSort = [...this.dataSource];
		recipeSort = this.sortPipe.transform(recipeSort, this.sortOrder, this.sortValue);
		this.dataSource = [...recipeSort];
	}

	selectRecipeRow(recipe: IRecipe): void {
		console.log('selected');
		this.recipeSelected = recipe;
		this.recipeSelectedEvent.emit(recipe);
	}

	getcolorDifficultyLevel(level: string): string {
		return getColorDifficultyLevel(level);
	}
	setRanking(recipe: IRecipe, reviews: number): void {
		this.changeReviewsEvent.emit({ recipe, reviews });
	}

	setCookedBefore(recipe: IRecipe, { checked }: MatSlideToggleChange): void {
		this.changeCookedBeforeEvent.emit({ recipe, cookedBefore: checked });
	}
}
