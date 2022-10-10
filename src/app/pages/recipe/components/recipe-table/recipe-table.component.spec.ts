import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeDifficultylevelEnum } from 'src/app/shared/enums/recipe-enums';
import { MOCK_RECIPE_LIST } from 'src/app/shared/mock/mock-recipe';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { findComponent, findComponentByDirective } from 'src/app/shared/utils/test/function-test';
import { RecipeService } from '../../../../core/service/recipe.service';
import { RatingComponent } from '../../../../shared/components/rating/rating.component';
import { SortByPipe } from '../../../../shared/pipes/sort.pipe';
import { RecipeTableComponent } from './recipe-table.component';

fdescribe('RecipeTableComponent', () => {
	let component: RecipeTableComponent;
	let fixture: ComponentFixture<RecipeTableComponent>;
	let el: DebugElement;
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [RecipeTableComponent],
			imports: [BrowserAnimationsModule, SharedModule],
			providers: [RecipeService, FilterPipe, SortByPipe]
		})
			.compileComponents()
			.then((_result) => {
				fixture = TestBed.createComponent(RecipeTableComponent);
				component = fixture.componentInstance;
				el = fixture.debugElement;
				component.filterValue = '';
				component.sortValue = '';
				component.dataSource = MOCK_RECIPE_LIST;
				component.displayedColumns = ['name', 'difficultyLevel', 'reviews', 'cookedBefore', 'creationDate'];
				fixture.detectChanges();
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should filterValue equal currentValue ngOnChanges ', () => {
		const setRecipeFilterSpy = spyOn(component as any, 'setRecipeFilter').and.callThrough();
		const previousValue = 'search';

		const currentValue = 'newSearch';

		const changesObj: SimpleChanges = {
			filterValue: new SimpleChange(previousValue, currentValue, false)
		};

		component.ngOnChanges(changesObj);
		fixture.detectChanges();

		expect(component.filterValue).toEqual(currentValue);
		expect(setRecipeFilterSpy).toHaveBeenCalled();
	});

	it('should filterValue equal previousValue ngOnChanges ', () => {
		const setRecipeFilterSpy = spyOn(component as any, 'setRecipeFilter').and.callThrough();
		const previousValue = '';

		const currentValue = '';

		const changesObj: SimpleChanges = {
			filterValue: new SimpleChange(previousValue, currentValue, false)
		};

		component.ngOnChanges(changesObj);
		fixture.detectChanges();

		expect(component.filterValue).toEqual(previousValue);
		expect(setRecipeFilterSpy).not.toHaveBeenCalled();
	});

	it('should filterValue equal currentValue ngOnChanges ', () => {
		const setRecipeFilterSpy = spyOn(component as any, 'setRecipeFilter').and.callThrough();
		const previousValue = 'search';

		const currentValue = 'newSearch';

		const changesObj: SimpleChanges = {
			filterValue: new SimpleChange(previousValue, currentValue, false)
		};

		component.ngOnChanges(changesObj);
		fixture.detectChanges();

		expect(component.filterValue).toEqual(currentValue);
		expect(setRecipeFilterSpy).toHaveBeenCalled();
	});

	it('should sortValue equal ngOnChanges currentValue ', () => {
		const setRecipeSortSpy = spyOn(component as any, 'setRecipeSort').and.callThrough();
		const previousValue = 'fecha';

		const currentValue = 'title';

		const changesObj: SimpleChanges = {
			sortValue: new SimpleChange(previousValue, currentValue, false)
		};

		component.ngOnChanges(changesObj);
		fixture.detectChanges();

		expect(component.sortValue).toEqual(currentValue);
		expect(setRecipeSortSpy).toHaveBeenCalled();
	});
	it('should sortOrder equal ngOnChanges currentValue ', () => {
		const setRecipeSortSpy = spyOn(component as any, 'setRecipeSort').and.callThrough();
		const previousValue = 'asc';

		const currentValue = 'desc';

		const changesObj: SimpleChanges = {
			sortOrder: new SimpleChange(previousValue, currentValue, false)
		};

		component.ngOnChanges(changesObj);
		fixture.detectChanges();

		expect(component.sortOrder).toEqual(currentValue);
		expect(setRecipeSortSpy).toHaveBeenCalled();
	});

	it('should sortOrder equal ngOnChanges currentValue ', () => {
		const recipeSelectedEventSpy = spyOn(component.recipeSelectedEvent, 'emit');
		const tableRow = findComponent(fixture, '[data-testid="tablerow"]');
		tableRow.nativeElement.click();
		expect(recipeSelectedEventSpy).toHaveBeenCalled();
	});

	it('should getcolorDifficultyLevel return color #00e676 ', () => {
		const color = '#00e676';
		const colorSelected = component.getcolorDifficultyLevel(RecipeDifficultylevelEnum.BEGINNER);
		expect(colorSelected).toBe(color);
	});

	it('should emit event changeCookedBeforeEvent when change mat-slide ', () => {
		const changeCookedBeforeEvent = spyOn(component.changeCookedBeforeEvent, 'emit');

		const matSlideToggleComponent = findComponentByDirective(fixture, MatSlideToggle);
		matSlideToggleComponent.componentInstance.change.emit({ checked: false });

		expect(changeCookedBeforeEvent).toHaveBeenCalled();
	});

	it('should emit event changeReviewsEvent when change reviews', () => {
		const changeReviewsEventSpy = spyOn(component.changeReviewsEvent, 'emit');
		const ratingComponent = findComponentByDirective(fixture, RatingComponent);
		ratingComponent.componentInstance.rankingSelectedEvent.emit(4);
		expect(changeReviewsEventSpy).toHaveBeenCalled();
		//expect(changeReviewsEventSpy).toHaveBeenCalledWith({ recipe: component.recipe, reviews: 4 });
	});
});
