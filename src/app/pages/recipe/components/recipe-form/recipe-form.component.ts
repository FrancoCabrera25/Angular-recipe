import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RecipeDifficultylevelEnum } from 'src/app/shared/enums/recipe-enums';
import { RecipeService } from '../../../../core/service/recipe.service';
import { IRecipe } from '../../../../shared/interface/recipe.interface';

@Component({
	selector: 'app-recipe-form',
	templateUrl: './recipe-form.component.html',
	styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit, OnDestroy {
	constructor(private fb: FormBuilder, private recipeService: RecipeService) {}

	private destroy$: Subject<void> = new Subject<void>();
	form!: FormGroup;
	recipeId: string = '';
	@Input() isEditing: boolean = false;
	reviewsArray: Array<Number> = new Array<number>(5);
	@Output() buttonClickedEvent = new EventEmitter<void>();

	difficultyLevel: any[] = [
		{ id: RecipeDifficultylevelEnum.EASY, text: RecipeDifficultylevelEnum.EASY.toString() },
		{ id: RecipeDifficultylevelEnum.MIDDLE, text: RecipeDifficultylevelEnum.MIDDLE.toString() },
		{ id: RecipeDifficultylevelEnum.HARD, text: RecipeDifficultylevelEnum.HARD.toString() }
	];

	ngOnInit(): void {
		this.initForm();
		this.recipeService.recipeSelected$.pipe(takeUntil(this.destroy$)).subscribe((_recipe) => {
			if (Object.keys(_recipe).length > 0) {
				this.isEditing = true;
				this.recipeId = _recipe.id;
				this.initForm(_recipe);
			} else {
				this.isEditing = false;
			}
		});
	}

	get ingredients() {
		return this.form.get('ingredients') as FormArray;
	}

	initForm(recipe?: IRecipe) {
		this.form = this.fb.group({
			title: [recipe ? recipe.title : '', Validators.required],
			ingredients:
				recipe && recipe.ingredients.length > 0
					? this.setIngredients(recipe.ingredients)
					: new FormArray([new FormControl('')]),
			difficultyLevel: [recipe ? recipe.difficultyLevel : '', Validators.required],
			reviews: [recipe ? recipe.reviews : '', Validators.required],
			preparation: [recipe ? recipe.preparation : '', Validators.required],
			cookedBefore: [recipe ? recipe.cookedBefore : '', Validators.required]
		});
	}
	clearForm(): void {
		this.form.controls['title'].reset();
		// this.form.controls
		// 	title: '',
		// 	ingredients: [new FormControl('')],
		// 	difficultyLevel: '',
		// 	reviews: '',
		// 	preparation: '',
		// 	cookedBefore: ''
		// });
		// console.log(this.form.value);
		// this.form.markAsTouched();
		//this.form.markAsUntouched();
	}
	setIngredients(ingredients: string[]): FormArray {
		const formControl: FormControl[] = [];
		for (const ingredient of ingredients) {
			formControl.push(new FormControl(ingredient));
		}

		return new FormArray(formControl);
	}

	addIngredients(): void {
		const control = new FormControl('');
		this.ingredients.push(control);
		console.log(this.form);
	}

	removeingredients(index: number) {
		this.ingredients.removeAt(index);
	}

	close(): void {
		this.form.reset();
		this.initForm();
		this.buttonClickedEvent.emit();
	}

	submitForm(): void {
		let ingredients = this.form.value.ingredients as Array<string>;
		ingredients = ingredients.filter((item) => item.length > 0);
		const newRecipe: IRecipe = {
			...this.form.value,
			ingredients,
			id: this.recipeId || ''
		};

		if (this.isEditing) {
			this.recipeService.updateRecipe(newRecipe);
			this.recipeService.cleanRecipeSelected();
		} else {
			this.recipeService.addRecipe(newRecipe);
		}
		//this.initForm();
		this.form.markAsPristine();
		this.form.markAsUntouched();
		this.clearForm();
		this.buttonClickedEvent.emit();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
