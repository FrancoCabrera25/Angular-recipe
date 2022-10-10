import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { RecipeService } from 'src/app/core/service/recipe.service';
import { IRecipe } from 'src/app/shared/interface/recipe.interface';
import { SharedModule } from 'src/app/shared/shared.module';
import { findComponent } from 'src/app/shared/utils/test/function-test';
import { MOCK_RECIPE } from '../../../../shared/mock/mock-recipe';
import { RecipeViewComponent } from './recipe-view.component';

fdescribe('RecipeViewComponent', () => {
	let component: RecipeViewComponent;
	let fixture: ComponentFixture<RecipeViewComponent>;
	let el: DebugElement;
	let recipeService: RecipeService;
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [RecipeViewComponent],
			imports: [BrowserAnimationsModule, SharedModule],
			providers: [RecipeService]
		})
			.compileComponents()
			.then((_result) => {
				fixture = TestBed.createComponent(RecipeViewComponent);
				recipeService = TestBed.inject(RecipeService);
				component = fixture.componentInstance;
				el = fixture.debugElement;
				component.recipe = {} as IRecipe;
				fixture.detectChanges();
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should getRecipeSelected set recipe', () => {
		expect(component).toBeTruthy();
		const spy = spyOn(recipeService, 'getRecipeSelected').and.callFake(() => of(MOCK_RECIPE));
		component.getRecipeSelected();
		fixture.detectChanges();
		expect(component.recipe).toEqual(MOCK_RECIPE);
	});

	it('should getRecipeSelected call recipeService getRecipeSelected', () => {
		expect(component).toBeTruthy();
		const getRecipeSelectedspy = spyOn(recipeService, 'getRecipeSelected').and.callFake(() => of(MOCK_RECIPE));
		component.getRecipeSelected();
		fixture.detectChanges();
		expect(getRecipeSelectedspy).toHaveBeenCalled();
	});

	it('should emit deleteRecipeEvent when click button delete', () => {
		const deleteRecipeEventSpyOn = spyOn(component.deleteRecipeEvent, 'emit');
		const deleteButton = findComponent(fixture, '[data-testid="deleteButton"]');
		deleteButton.nativeElement.click();
		expect(deleteRecipeEventSpyOn).toHaveBeenCalled();
	});

	it('should emit updateRecipeEvent when click button update', () => {
		const updateRecipeEventSpyOn = spyOn(component.updateRecipeEvent, 'emit');
		const deleteButton = findComponent(fixture, '[data-testid="updateButton"]');
		deleteButton.nativeElement.click();
		expect(updateRecipeEventSpyOn).toHaveBeenCalled();
	});
});
