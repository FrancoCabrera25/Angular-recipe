import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RecipeActionEnum } from 'src/app/shared/enums/recipe-enums';
import { RecipeService } from '../../core/service/recipe.service';
import { IRecipe } from '../../shared/interface/recipe.interface';
@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {
	private destroy$: Subject<void> = new Subject<void>();
	//tableColumns: Map<string, string> = new Map<string, string>();
	/* A variable that contains the mock data. */
	recipeList: IRecipe[] = [];
	tableColumns: Array<string> = ['name', 'difficultyLevel', 'reviews', 'cookedBefore', 'creationDate'];
	openDrawer: boolean = false;

	actions = RecipeActionEnum;
	actionSelected = RecipeActionEnum.NONE;

	filterValue: string = '';

	sortSelected: string = 'creationDate';
	sortIdSelected = 1;
	sortOrderSelected: 'desc' | 'asc' = 'desc';

	orderList: any[] = [
		{ id: 1, text: 'Mas recientes', order: 'desc', field: 'creationDate' },
		{ id: 2, text: 'Mas antiguas', order: 'asc', field: 'creationDate' },
		{ id: 3, text: 'Mejores calificadas', order: 'desc', field: 'reviews' },
		{ id: 4, text: 'Peores calificadas', order: 'asc', field: 'reviews' }
	];
	constructor(private recipeService: RecipeService) {}
	ngOnInit(): void {
		this.loadRecipe();
	}
	loadRecipe(): void {
		this.recipeService.currentRecipe$.pipe(takeUntil(this.destroy$)).subscribe((_recipe) => {
			this.recipeList = _recipe;
		});
	}

	addRecipe(): void {
		this.openDrawer = true;
		this.actionSelected = RecipeActionEnum.ADDORUPDATE;
	}
	viewRecipe(recipe: IRecipe): void {
		console.log('view');
		this.recipeService.setRecipeSelected(recipe);
		this.actionSelected = RecipeActionEnum.VIEW;
		this.showDrawer();
	}
	updateRecipe(): void {
		this.actionSelected = RecipeActionEnum.ADDORUPDATE;
	}
	deleteRecipe(id: string): void {
		this.recipeService.deleteRecipe(id);
		this.showDrawer();
	}

	setReview(recipe: IRecipe, reviews: number): void {
		const updateRecipe: IRecipe = {
			...recipe,
			reviews
		};
		this.recipeService.updateRecipe(updateRecipe);
	}

	setCookedBefore(recipe: IRecipe, checked: boolean): void {
		const updateRecipe: IRecipe = {
			...recipe,
			cookedBefore: checked
		};
		this.recipeService.updateRecipe(updateRecipe);
	}

	closeDrawer(): void {
		this.recipeService.cleanRecipeSelected();
		this.actionSelected = RecipeActionEnum.NONE;
		this.openDrawer = false;
	}

	showDrawer(): void {
		this.openDrawer = !this.openDrawer;
	}

	filterSearch(filterValue: string): void {
		this.filterValue = filterValue;
	}
	orderRecipe({ value }: MatSelectChange): void {
		this.sortSelected = '';
		const selected = this.orderList.find((f) => f.id === value);
		this.sortIdSelected = value;
		this.sortSelected = selected.field;
		this.sortOrderSelected = selected.order;
	}
	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
