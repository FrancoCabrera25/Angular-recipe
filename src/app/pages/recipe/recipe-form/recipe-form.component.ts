import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeDifficultylevelEnum } from 'src/app/shared/enums/recipe-enums';
import { RecipeService } from '../../../core/service/recipe.service';
import { IRecipe } from '../../../shared/interface/recipe.interface';

@Component({
	selector: 'app-recipe-form',
	templateUrl: './recipe-form.component.html',
	styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
	constructor(private fb: FormBuilder, private recipeService: RecipeService) {}
	form!: FormGroup;
	reviewsArray: Array<Number> = new Array<number>(5);

	@Output() buttonClickedEvent = new EventEmitter<void>();

	difficultyLevel: any[] = [
		{ id: RecipeDifficultylevelEnum.EASY, text: RecipeDifficultylevelEnum.EASY.toString() },
		{ id: RecipeDifficultylevelEnum.MIDDLE, text: RecipeDifficultylevelEnum.MIDDLE.toString() },
		{ id: RecipeDifficultylevelEnum.HARD, text: RecipeDifficultylevelEnum.HARD.toString() }
	];

	isEditing: boolean = false;
	ngOnInit(): void {
		this.initForm();
	}

	get ingredients() {
		return this.form.get('ingredients') as FormArray;
	}

	initForm() {
		this.form = this.fb.group({
			title: ['', Validators.required],
			ingredients: new FormArray([new FormControl('')]),
			difficultyLevel: ['', Validators.required],
			reviews: ['', Validators.required],
			preparation: ['', Validators.required],
			cookedBefore: ['', Validators.required]
		});
	}

	addIngredients(): void {
		console.log(this.form.controls['ingredients']);
		const control = new FormControl('');
		// this.form.controls.ingredients.push(con)
		this.ingredients.push(control);
		console.log(this.form);
		//  this.ingredients = [...this.ingredients, ''];
	}

	removeingredients(index: number) {
		this.ingredients.removeAt(index);
	}

	close(): void {
		this.initForm();
		this.buttonClickedEvent.emit();
	}

	submitForm(): void {
		console.log(this.form.value);
		let ingredients = this.form.value.ingredients as Array<string>;
		ingredients = ingredients.filter((item) => item.length > 0);
		const newRecipe: IRecipe = {
			...this.form.value,
			ingredients
		};

		if (this.isEditing) {
		} else {
			this.recipeService.addRecipe(newRecipe);
		}
		this.initForm();
		this.buttonClickedEvent.emit();
	}
}
