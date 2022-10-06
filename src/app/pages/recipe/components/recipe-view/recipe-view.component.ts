import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
	selector: 'app-recipe-view',
	templateUrl: './recipe-view.component.html',
	styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit, OnDestroy {
	ngOnDestroy(): void {
		throw new Error('Method not implemented.');
	}
	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}
}
