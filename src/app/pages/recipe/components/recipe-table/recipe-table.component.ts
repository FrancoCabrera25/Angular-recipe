import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { RecipeDifficultylevelEnum } from 'src/app/shared/enums/recipe-enums';
import { RecipeService } from '../../../../core/service/recipe.service';
import { IRecipe } from '../../../../shared/interface/recipe.interface';

@Component({
	selector: 'app-recipe-table',
	templateUrl: './recipe-table.component.html',
	styleUrls: ['./recipe-table.component.scss']
})
export class RecipeTableComponent implements OnInit {
	@Input() displayedColumns: Array<string> = [];

	// columnNames: any[] = [];
	//['position', 'name', 'weight', 'symbol'];
	@Input() dataSource: IRecipe[] = [];
	@Output() recipeSelectedEvent = new EventEmitter<IRecipe>();
	recipeSelected!: IRecipe;

	constructor(private recipeService: RecipeService) {}
	ngOnInit(): void {
		// for (const column of this.displayedColumns.keys()) {
		// 	console.log('column', column);
		// 	this.columnNames.push(column);
		// }
	}

	selectRecipeRow(recipe: IRecipe): void {
		this.recipeSelected = recipe;
		this.recipeSelectedEvent.emit(recipe);
	}

	getBadgeDifficultyLevel(level: string): string {
		return RecipeDifficultylevelEnum.EASY === level
			? 'badge-difficulty-level-easy'
			: RecipeDifficultylevelEnum.MIDDLE == level
			? 'badge-difficulty-level-middle'
			: RecipeDifficultylevelEnum.HARD === level
			? 'badge-difficulty-level-hard'
			: '';
	}
	setRanking(recipe: IRecipe, reviews: number): void {
		const updateRecipe: IRecipe = {
			...recipe,
			reviews
		};
		this.recipeService.updateRecipe(updateRecipe);
	}

	setCookedBefore(recipe: IRecipe, { checked }: MatSlideToggleChange): void {
		const updateRecipe: IRecipe = {
			...recipe,
			cookedBefore: checked
		};
		this.recipeService.updateRecipe(updateRecipe);
	}
}
