import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatInput } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../../material/angular-material.module';
import { findComponentByDirective } from '../../utils/test/function-test';
import { SearchComponent } from './search.component';

fdescribe('SearchComponent', () => {
	let component: SearchComponent;
	let fixture: ComponentFixture<SearchComponent>;
	let el: DebugElement;
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [SearchComponent],
			imports: [BrowserAnimationsModule, AngularMaterialModule]
		})
			.compileComponents()
			.then((_result) => {
				fixture = TestBed.createComponent(SearchComponent);
				component = fixture.componentInstance;
				el = fixture.debugElement;
				fixture.detectChanges();
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit event searchEvent when keyUp', () => {
		const searchEventSpy = spyOn(component.inputValueEvent, 'emit');
		const fixtureByDirective = findComponentByDirective(fixture, MatInput);
		const event = new KeyboardEvent('keyup', {
			key: 'a'
		});
		fixtureByDirective.nativeElement.dispatchEvent(event);

		expect(searchEventSpy).toHaveBeenCalled();
	});
});
