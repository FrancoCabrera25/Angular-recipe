import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RecipeService } from '../../core/service/recipe.service';
import { IRecipe } from '../../shared/interface/recipe.interface';
@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
	private destroy$: Subject<void> = new Subject<void>();
	//tableColumns: Map<string, string> = new Map<string, string>();
	/* A variable that contains the mock data. */
	recipeList: IRecipe[] = [];
	tableColumns: Array<string> = ['name', 'difficultyLevel', 'reviews', 'cookedBefore'];
	openDrawer: boolean = false;
	constructor(private recipeService: RecipeService) {}
	ngOnInit(): void {
		///	this.setColumnsTable();
		this.loadRecipe();
	}
	loadRecipe(): void {
		this.recipeService.currentRecipe$.pipe(takeUntil(this.destroy$)).subscribe((_recipe) => {
			this.recipeList = _recipe;
		});
	}
	// setColumnsTable(): void {
	// 	this.tableColumns.set('title', 'Nombre');
	// 	this.tableColumns.set('reviews', 'Calificacíon');
	// 	this.tableColumns.set('cookedBefore', 'Utilizada');
	// }

	addRecipe(): void {
		this.openDrawer = true;
	}

	closeDrawer(): void {
		this.openDrawer = false;
	}

	showSidenav(): void {
		this.openDrawer = !this.openDrawer;
	}
}
