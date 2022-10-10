import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { IRecipe } from 'src/app/shared/interface/recipe.interface';
import { MOCK_RECIPE } from 'src/app/shared/mock/mock-recipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeService } from '../../../../core/service/recipe.service';
import { findComponent } from '../../../../shared/utils/test/function-test';
import { RecipeFormComponent } from './recipe-form.component';

const MOCK_FORM_GROUP = new FormGroup({
	title: new FormControl('', Validators.required),
	ingredients: new FormArray([new FormControl('')]),
	difficultyLevel: new FormControl(''),
	reviews: new FormControl(''),
	preparation: new FormControl(''),
	cookedBefore: new FormControl('')
});

const MOCK_FORM_GROUP_TWO_Ingredients = new FormGroup({
	title: new FormControl('', Validators.required),
	ingredients: new FormArray([new FormControl(''), new FormControl('')]),
	difficultyLevel: new FormControl(''),
	reviews: new FormControl(''),
	preparation: new FormControl(''),
	cookedBefore: new FormControl('')
});

const MOCK_FORM_GROUP_CONTAINS_VALUE = new FormGroup({
	title: new FormControl('test', Validators.required),
	ingredients: new FormArray([new FormControl('')]),
	difficultyLevel: new FormControl('test'),
	reviews: new FormControl('test'),
	preparation: new FormControl('test'),
	cookedBefore: new FormControl('test')
});

fdescribe('RecipeFormComponent', () => {
	let component: RecipeFormComponent;
	let fixture: ComponentFixture<RecipeFormComponent>;
	let el: DebugElement;
	let recipeService: RecipeService;
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [RecipeFormComponent],
			imports: [BrowserAnimationsModule, SharedModule, ReactiveFormsModule],
			providers: [RecipeService]
		})
			.compileComponents()
			.then((_result) => {
				fixture = TestBed.createComponent(RecipeFormComponent);
				component = fixture.componentInstance;
				el = fixture.debugElement;
				component.form = MOCK_FORM_GROUP;
				recipeService = TestBed.inject(RecipeService);
				fixture.detectChanges();
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show form create when service not recipe selected', () => {
		const spy = spyOn(recipeService, 'getRecipeSelected').and.callFake(() => of({} as IRecipe));
		component.getRecipeSelected();
		fixture.detectChanges();
		expect(component.isEditing).toBe(false);
		expect(spy).toHaveBeenCalled();
	});

	it('should show form create when service  recipe selected', () => {
		const spy = spyOn(recipeService, 'getRecipeSelected').and.callFake(() => of(MOCK_RECIPE));
		component.getRecipeSelected();
		fixture.detectChanges();
		expect(component.isEditing).toBe(true);
		expect(spy).toHaveBeenCalled();
	});

	it('should add ingredients when click mat-icon add ingredients', () => {
		const addIngredientsSpy = spyOn(component as any, 'addIngredients').and.callThrough();
		const matIconAdd = findComponent(fixture, '[data-testid="addIngredients"]');
		matIconAdd.nativeElement.click();
		expect(component.form.get('ingredients')?.value.length).toBe(2);
		expect(addIngredientsSpy).toHaveBeenCalled();
	});

	it('should remove ingredients when click mat-icon remove ingredients', () => {
		component.form = MOCK_FORM_GROUP_TWO_Ingredients;
		fixture.detectChanges();
		const removeingredientsSpy = spyOn(component as any, 'removeingredients').and.callThrough();
		const matIconAdd = findComponent(fixture, '[data-testid="removeIngredients"]');
		matIconAdd.nativeElement.click();
		expect(component.form.get('ingredients')?.value.length).toBe(1);
		expect(removeingredientsSpy).toHaveBeenCalled();
	});

	it('should emit buttonClickedEvent when click on button', () => {
		const buttonClickedEventOnSpy = spyOn(component.buttonClickedEvent, 'emit');
		const closeButtonFunctionOnSpy = spyOn(component as any, 'close').and.callThrough();
		const closeButton = findComponent(fixture, '[data-testid="closeButton"]');
		closeButton.nativeElement.click();
		expect(buttonClickedEventOnSpy).toHaveBeenCalled();
		expect(closeButtonFunctionOnSpy).toHaveBeenCalled();
	});

	it('should emit addRecipe when click on submitForm', () => {
		component.form = MOCK_FORM_GROUP_CONTAINS_VALUE;
		fixture.detectChanges();

		const recipeServiceOnSpy = spyOn(recipeService, 'addRecipe');
		const submitFormOnSpy = spyOn(component as any, 'submitForm').and.callThrough();
		const submitButton = findComponent(fixture, '[data-testid="submitButton"]');
		submitButton.nativeElement.click();
		expect(recipeServiceOnSpy).toHaveBeenCalled();
		expect(submitFormOnSpy).toHaveBeenCalled();
	});

	it('should emit updateRecipe when click on submitForm', () => {
		component.isEditing = true;
		component.initForm(MOCK_RECIPE);
		fixture.detectChanges();

		const updateRecipeOnSpy = spyOn(recipeService, 'updateRecipe');
		const submitFormOnSpy = spyOn(component as any, 'submitForm').and.callThrough();
		const submitButton = findComponent(fixture, '[data-testid="submitButton"]');
		submitButton.nativeElement.click();
		expect(updateRecipeOnSpy).toHaveBeenCalled();
		expect(submitFormOnSpy).toHaveBeenCalled();
	});

	it('should submitButton is disabled this form is invalid', () => {
		const submitButton = findComponent(fixture, '[data-testid="submitButton"]');
		submitButton.nativeElement.click();
		expect(submitButton.componentInstance.disabled).toBeTruthy();
	});

	it('should submitButton is enabled this form is valid', () => {
		component.form = MOCK_FORM_GROUP_CONTAINS_VALUE;
		fixture.detectChanges();
		const submitButton = findComponent(fixture, '[data-testid="submitButton"]');
		submitButton.nativeElement.click();
		expect(submitButton.componentInstance.disabled).toBeFalsy();
	});
});
