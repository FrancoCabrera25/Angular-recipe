import { BreakpointObserver } from '@angular/cdk/layout';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { RecipeService } from 'src/app/core/service/recipe.service';
import { RecipeActionEnum } from 'src/app/shared/enums/recipe-enums';
import { SharedModule } from 'src/app/shared/shared.module';
import { findComponent, findComponentByDirective } from 'src/app/shared/utils/test/function-test';
import { SearchComponent } from '../../shared/components/search/search.component';
import { MOCK_RECIPE, MOCK_RECIPE_LIST } from '../../shared/mock/mock-recipe';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeTableComponent } from './components/recipe-table/recipe-table.component';
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component';
import { RecipeComponent } from './recipe.component';

fdescribe('RecipeComponent', () => {
	let component: RecipeComponent;
	let fixture: ComponentFixture<RecipeComponent>;
	let el: DebugElement;
	let recipeService: RecipeService;
	let matDialog: MatDialog;
	let breakpointObserver: BreakpointObserver;
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [
				RecipeComponent,
				RecipeCardComponent,
				RecipeViewComponent,
				RecipeTableComponent,
				RecipeFormComponent
			],
			imports: [BrowserAnimationsModule, SharedModule, ReactiveFormsModule],
			providers: [RecipeService, MatDialog, BreakpointObserver]
		})
			.compileComponents()
			.then((_result) => {
				fixture = TestBed.createComponent(RecipeComponent);
				recipeService = TestBed.inject(RecipeService);
				matDialog = TestBed.inject(MatDialog);
				breakpointObserver = TestBed.inject(BreakpointObserver);
				component = fixture.componentInstance;
				el = fixture.debugElement;
				component.recipeList = MOCK_RECIPE_LIST;
				component.actionSelected = RecipeActionEnum.NONE;
				fixture.detectChanges();
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show drawer when click button add', () => {
		const addButton = findComponent(fixture, '[data-testid="addButton"]');
		addButton.nativeElement.click();
		fixture.detectChanges();
		expect(component.showDrawer).toBeTruthy();
		expect(component.actionSelected).toBe(RecipeActionEnum.ADDORUPDATE);
	});

	it('should show drawer when card emit event view', () => {
		const setRecipeSelectedSpy = spyOn(recipeService, 'setRecipeSelected');
		const recipeCardComponent = findComponentByDirective(fixture, RecipeCardComponent);

		recipeCardComponent.componentInstance.viewMoreEvent.emit();
		fixture.detectChanges();

		expect(setRecipeSelectedSpy).toHaveBeenCalled();
		expect(component.actionSelected).toBe(RecipeActionEnum.VIEW);
		expect(component.showDrawer).toBeTruthy();
	});

	it('should show drawer when table emit event view', () => {
		component.modeViewLayoutRecipe = 'TABLE';
		fixture.detectChanges();
		const setRecipeSelectedSpy = spyOn(recipeService, 'setRecipeSelected');
		const recipeTableComponent = findComponentByDirective(fixture, RecipeTableComponent);

		recipeTableComponent.componentInstance.recipeSelectedEvent.emit(MOCK_RECIPE);
		fixture.detectChanges();

		expect(setRecipeSelectedSpy).toHaveBeenCalled();
		expect(component.actionSelected).toBe(RecipeActionEnum.VIEW);
		expect(component.showDrawer).toBeTruthy();
	});
	it('should show action addorupdate when  emit event view update', () => {
		const recipeCardComponent = findComponentByDirective(fixture, RecipeCardComponent);
		recipeCardComponent.componentInstance.viewMoreEvent.emit();
		fixture.detectChanges();
		const recipeViewComponent = findComponentByDirective(fixture, RecipeViewComponent);

		recipeViewComponent.componentInstance.updateRecipeEvent.emit();
		fixture.detectChanges();

		expect(component.actionSelected).toBe(RecipeActionEnum.ADDORUPDATE);
		expect(component.showDrawer).toBeTruthy();
	});

	it('should call action deleteRecipe when dialog return true', () => {
		const deleteRecipeSpy = spyOn(recipeService, 'deleteRecipe');
		const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<
			typeof component
		>);

		const recipeCardComponent = findComponentByDirective(fixture, RecipeCardComponent);
		recipeCardComponent.componentInstance.viewMoreEvent.emit();
		fixture.detectChanges();
		const recipeViewComponent = findComponentByDirective(fixture, RecipeViewComponent);

		recipeViewComponent.componentInstance.deleteRecipeEvent.emit();
		fixture.detectChanges();
		expect(matDialogSpy).toHaveBeenCalled();
		expect(deleteRecipeSpy).toHaveBeenCalled();
	});

	it('should not call action deleteRecipe when   dialog return false', () => {
		const deleteRecipeSpy = spyOn(recipeService, 'deleteRecipe');
		const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({ afterClosed: () => of(false) } as MatDialogRef<
			typeof component
		>);

		const recipeCardComponent = findComponentByDirective(fixture, RecipeCardComponent);
		recipeCardComponent.componentInstance.viewMoreEvent.emit();
		fixture.detectChanges();
		const recipeViewComponent = findComponentByDirective(fixture, RecipeViewComponent);

		recipeViewComponent.componentInstance.deleteRecipeEvent.emit();
		fixture.detectChanges();

		expect(matDialogSpy).toHaveBeenCalled();
		expect(deleteRecipeSpy).not.toHaveBeenCalled();
	});

	it('should call updateRecipe  when card emit event changeReviewsEvent', () => {
		const updateRecipeSpy = spyOn(recipeService, 'updateRecipe');
		const recipeCardComponent = findComponentByDirective(fixture, RecipeCardComponent);

		recipeCardComponent.componentInstance.changeReviewsEvent.emit({ recipe: MOCK_RECIPE, reviews: 5 });
		fixture.detectChanges();

		expect(updateRecipeSpy).toHaveBeenCalled();
	});

	it('should call updateRecipe  when table emit event changeReviewsEvent', () => {
		component.modeViewLayoutRecipe = 'TABLE';
		fixture.detectChanges();
		const updateRecipeSpy = spyOn(recipeService, 'updateRecipe');
		const recipeTableComponent = findComponentByDirective(fixture, RecipeTableComponent);

		recipeTableComponent.componentInstance.changeReviewsEvent.emit({ recipe: MOCK_RECIPE, reviews: 5 });
		fixture.detectChanges();

		expect(updateRecipeSpy).toHaveBeenCalled();
	});

	it('should call updateRecipe  when card emit event changeCookedBeforeEvent', () => {
		const updateRecipeSpy = spyOn(recipeService, 'updateRecipe');
		const recipeCardComponent = findComponentByDirective(fixture, RecipeCardComponent);

		recipeCardComponent.componentInstance.changeCookedBeforeEvent.emit({ recipe: MOCK_RECIPE, reviews: 5 });
		fixture.detectChanges();

		expect(updateRecipeSpy).toHaveBeenCalled();
	});

	it('should call updateRecipe  when table emit event changeCookedBeforeEvent', () => {
		component.modeViewLayoutRecipe = 'TABLE';
		fixture.detectChanges();
		const updateRecipeSpy = spyOn(recipeService, 'updateRecipe');
		const recipeTableComponent = findComponentByDirective(fixture, RecipeTableComponent);

		recipeTableComponent.componentInstance.changeCookedBeforeEvent.emit({ recipe: MOCK_RECIPE, reviews: 5 });
		fixture.detectChanges();

		expect(updateRecipeSpy).toHaveBeenCalled();
	});

	it('should call cleanRecipeSelectedSpy  when form emit event close', () => {
		const addButton = findComponent(fixture, '[data-testid="addButton"]');
		addButton.nativeElement.click();
		fixture.detectChanges();

		const cleanRecipeSelectedSpy = spyOn(recipeService, 'cleanRecipeSelected');
		const recipeFormComponent = findComponentByDirective(fixture, RecipeFormComponent);

		recipeFormComponent.componentInstance.buttonClickedEvent.emit();
		fixture.detectChanges();

		expect(cleanRecipeSelectedSpy).toHaveBeenCalled();
		expect(component.openDrawer).toBeFalsy();
		expect(component.actionSelected).toBe(RecipeActionEnum.NONE);
	});

	it('should show view card when click button view card', () => {
		const viewCard = findComponent(fixture, '[data-testid="viewCard"]');
		viewCard.nativeElement.click();

		expect(component.modeViewLayoutRecipe).toBe('CARD');
	});

	it('should show view table when click button view table', () => {
		const viewCard = findComponent(fixture, '[data-testid="viewTable"]');
		viewCard.nativeElement.click();

		expect(component.modeViewLayoutRecipe).toBe('TABLE');
	});

	it('should set filterValue  when emit inputValueEvent', () => {
		const searchComponent = findComponentByDirective(fixture, SearchComponent);
		searchComponent.componentInstance.inputValueEvent.emit('search');
		fixture.detectChanges();

		expect(component.filterValue).toBe('search');
	});

	it('should set filterValue  when emit sortRecipe', () => {
		const selectionChange = {
			source: {
				selected: {
					value: {
						id: '123'
					}
				}
			},
			value: 1
		};

		const matSelect = findComponentByDirective(fixture, MatSelect);
		matSelect.componentInstance.selectionChange.emit(selectionChange);
		fixture.detectChanges();

		expect(component.sortIdSelected).toBe(1);
		expect(component.sortSelected).toBe('creationDate');
		expect(component.sortOrderSelected).toBe('desc');
	});

	// it('should change modeViewLayoutRecipe a CARD when  min-width: 700px is true', () => {
	// 	component.modeViewLayoutRecipe = 'TABLE';
	// 	component.breakpointObserverCheck();
	// 	fixture.detectChanges();
	// 	let breakpoint: { [key: string]: boolean } = {};
	// 	breakpoint['min-width: 700px'] = false;
	// 	const state: BreakpointState = {
	// 		matches: false,
	// 		breakpoints: breakpoint
	// 	};
	// 	const breakpointObserverSpy = spyOn(breakpointObserver, 'observe').and.callFake(() => of(state));
	// 	fixture.detectChanges();

	// 	// const viewCard = findComponent(fixture, '[data-testid="viewTable"]');
	// 	// viewCard.nativeElement.click();
	// 	expect(breakpointObserverSpy).toHaveBeenCalled();
	// 	expect(component.modeViewLayoutRecipe).toBe('CARD');
	// });
});
