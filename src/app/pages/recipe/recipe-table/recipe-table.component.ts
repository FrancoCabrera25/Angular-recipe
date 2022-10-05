import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from '../../../shared/interface/recipe.interface';

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
	recipeSelected!: IRecipe;
	ngOnInit(): void {
		// for (const column of this.displayedColumns.keys()) {
		// 	console.log('column', column);
		// 	this.columnNames.push(column);
		// }
	}

	selectRecipeRow(recipe: IRecipe): void {
		this.recipeSelected = recipe;
		console.log(recipe);
	}
}
