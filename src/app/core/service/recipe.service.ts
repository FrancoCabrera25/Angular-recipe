import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as uuid from 'uuid';
import { IRecipe } from '../../shared/interface/recipe.interface';
@Injectable()
export class RecipeService {
	private currentRecipe = new BehaviorSubject<IRecipe[]>([]);
	recipeList$: Observable<IRecipe[]> = this.currentRecipe.asObservable();

	private recipeSelected = new BehaviorSubject<IRecipe>({} as IRecipe);
	recipeSelected$: Observable<IRecipe> = this.recipeSelected.asObservable();

	constructor() {
		this.loadRecipe();
	}

	getRecipeList(): Observable<IRecipe[]> {
		return this.recipeList$;
	}

	getRecipeSelected(): Observable<IRecipe> {
		return this.recipeSelected$;
	}
	loadRecipe(): void {
		this.currentRecipe.next(this.getRecipeByLocalStorage());
	}

	setRecipeSelected(recipe: IRecipe): void {
		this.recipeSelected.next(recipe);
	}
	cleanRecipeSelected(): void {
		this.recipeSelected.next({} as IRecipe);
	}
	addRecipe(recipe: IRecipe): void {
		recipe.id = uuid.v4();
		recipe.creationDate = new Date();
		const current = [...this.currentRecipe.getValue(), recipe];
		this.setRecipeByLocalStorage(current);
		this.currentRecipe.next(current);
	}

	updateRecipe(recipe: IRecipe): void {
		const current = this.currentRecipe.getValue().map((oldRecipe) => {
			if (oldRecipe.id === recipe.id) {
				return {
					...oldRecipe,
					preparation: recipe.preparation,
					title: recipe.title,
					ingredients: recipe.ingredients,
					reviews: recipe.reviews,
					cookedBefore: recipe.cookedBefore,
					difficultyLevel: recipe.difficultyLevel
				};
			}
			return oldRecipe;
		});
		this.setRecipeByLocalStorage(current);
		this.currentRecipe.next(current);
	}

	deleteRecipe(id: string): void {
		const currentTask = this.currentRecipe.getValue().filter((f) => f.id !== id);
		this.setRecipeByLocalStorage(currentTask);
		this.currentRecipe.next(currentTask);
	}

	private getRecipeByLocalStorage(): IRecipe[] {
		return localStorage.getItem('recipes') ? JSON.parse(localStorage.getItem('recipes')!) : [];
	}

	private setRecipeByLocalStorage(recipe: IRecipe[]): void {
		localStorage.setItem('recipes', JSON.stringify(recipe));
	}
}
