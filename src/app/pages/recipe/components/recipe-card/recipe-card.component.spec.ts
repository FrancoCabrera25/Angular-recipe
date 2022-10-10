import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { RatingComponent } from 'src/app/shared/components/rating/rating.component';
import { MOCK_RECIPE } from 'src/app/shared/mock/mock-recipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { findComponentByDirective } from 'src/app/shared/utils/test/function-test';
import { RecipeCardComponent } from './recipe-card.component';

fdescribe('RecipeCardComponent', () => {
	let component: RecipeCardComponent;
	let fixture: ComponentFixture<RecipeCardComponent>;
	let el: DebugElement;
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [RecipeCardComponent],
			imports: [SharedModule]
		})
			.compileComponents()
			.then((_result) => {
				fixture = TestBed.createComponent(RecipeCardComponent);
				component = fixture.componentInstance;
				el = fixture.debugElement;
				component.recipe = MOCK_RECIPE;
				fixture.detectChanges();
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit event viewMoreEvent when click button', () => {
		const viewMoreEventSpy = spyOn(component.viewMoreEvent, 'emit');
		const fixtureByDirective = findComponentByDirective(fixture, MatButton);

		fixtureByDirective.nativeElement.click();
		expect(viewMoreEventSpy).toHaveBeenCalled();
	});

	it('should emit event changeReviewsEvent when change reviews', () => {
		const changeReviewsEventSpy = spyOn(component.changeReviewsEvent, 'emit');
		const ratingComponent = findComponentByDirective(fixture, RatingComponent);
		ratingComponent.componentInstance.rankingSelectedEvent.emit(4);
		expect(changeReviewsEventSpy).toHaveBeenCalled();
		expect(changeReviewsEventSpy).toHaveBeenCalledWith({ recipe: component.recipe, reviews: 4 });
	});

	it('should emit event changeCookedBeforeEvent when change cookedBefore', () => {
		const changeCookedBeforeEvent = spyOn(component.changeCookedBeforeEvent, 'emit');
		const matSlideToggleComponent = findComponentByDirective(fixture, MatSlideToggle);
		matSlideToggleComponent.componentInstance.change.emit({ checked: false });

		expect(changeCookedBeforeEvent).toHaveBeenCalled();
		expect(changeCookedBeforeEvent).toHaveBeenCalledWith({ recipe: component.recipe, cookedBefore: false });
	});
});
