import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as uuid from 'uuid';
import { IRecipe } from '../../shared/interface/recipe.interface';
@Injectable()
export class RecipeService {
	public currentRecipe = new BehaviorSubject<IRecipe[]>([]);
	currentRecipe$: Observable<IRecipe[]> = this.currentRecipe.asObservable();
	constructor() {
		this.loadRecipe();
	}
	loadRecipe(): void {
		this.currentRecipe.next(this.getRecipeByLocalStorage());
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

	getRecipeByLocalStorage(): IRecipe[] {
		return localStorage.getItem('recipes') ? JSON.parse(localStorage.getItem('recipes')!) : [];
	}

	setRecipeByLocalStorage(recipe: IRecipe[]): void {
		localStorage.setItem('recipes', JSON.stringify(recipe));
	}
}
