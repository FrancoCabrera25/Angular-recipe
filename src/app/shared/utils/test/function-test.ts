/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function findComponent<T>(fixture: ComponentFixture<T>, selector: string): DebugElement {
	return fixture.debugElement.query(By.css(selector));
}

export function findComponentList<T>(fixture: ComponentFixture<T>, selector: string): DebugElement[] {
	return fixture.debugElement.queryAll(By.css(selector));
}

export function findComponentByDirective<T>(fixture: ComponentFixture<T>, selector: any): DebugElement {
	return fixture.debugElement.query(By.directive(selector));
}
