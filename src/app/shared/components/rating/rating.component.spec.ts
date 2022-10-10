import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { AngularMaterialModule } from '../../material/angular-material.module';
import { findComponentByDirective } from '../../utils/test/function-test';
import { RatingComponent } from './rating.component';

fdescribe('RatingComponent', () => {
	let component: RatingComponent;
	let fixture: ComponentFixture<RatingComponent>;
	let el: DebugElement;
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [RatingComponent],
			imports: [AngularMaterialModule]
		})
			.compileComponents()
			.then((_result) => {
				fixture = TestBed.createComponent(RatingComponent);
				component = fixture.componentInstance;
				el = fixture.debugElement;
				component.currentRanking = 3;
				component.ratingArr = new Array<number>(5);
				fixture.detectChanges();
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit event rankingSelectedEvent when click in button', () => {
		const rankingSelectedEventSpy = spyOn(component.rankingSelectedEvent, 'emit');

		const button = findComponentByDirective(fixture, MatButton);
		button.nativeElement.click();

		expect(rankingSelectedEventSpy).toHaveBeenCalled();
	});
});
