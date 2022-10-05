import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RatingComponent } from './components/rating/rating.component';
import { AngularMaterialModule } from './material/angular-material.module';
import { FilterPipe } from './pipes/filter.pipe';
import { SortByPipe } from './pipes/sort.pipe';

@NgModule({
	declarations: [FilterPipe, SortByPipe, RatingComponent],
	imports: [CommonModule, AngularMaterialModule],
	exports: [FilterPipe, SortByPipe, AngularMaterialModule, RatingComponent],
	providers: []
})
export class SharedModule {}
