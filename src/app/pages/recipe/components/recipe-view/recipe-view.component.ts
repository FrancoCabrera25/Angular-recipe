import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getColorDifficultyLevel } from 'src/app/shared/utils/utils';
import { RecipeService } from '../../../../core/service/recipe.service';
import { IRecipe } from '../../../../shared/interface/recipe.interface';

@Component({
	selector: 'app-recipe-view',
	templateUrl: './recipe-view.component.html',
	styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit, OnDestroy {
	private destroy$: Subject<void> = new Subject<void>();

	@Output() updateRecipeEvent = new EventEmitter<void>();
	@Output() deleteRecipeEvent = new EventEmitter<string>();
	recipe!: IRecipe;

	constructor(private recipeService: RecipeService) {}

	ngOnInit(): void {
		window.scroll(0, 0);
		this.recipeService.recipeSelected$.pipe(takeUntil(this.destroy$)).subscribe((_recipe) => {
			if (Object.keys(_recipe).length > 0) {
				this.recipe = _recipe;
			}
		});
	}
	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	delete(): void {
		this.deleteRecipeEvent.emit(this.recipe.id);
	}

	update(): void {
		console.log('update');
		this.updateRecipeEvent.emit();
	}
	getcolorDifficultyLevel(level: string): string {
		return getColorDifficultyLevel(level);
	}
}
