import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RatingComponent } from './components/rating/rating.component';
import { SearchComponent } from './components/search/search.component';
import { AngularMaterialModule } from './material/angular-material.module';
import { FilterPipe } from './pipes/filter.pipe';
import { SortByPipe } from './pipes/sort.pipe';

@NgModule({
	declarations: [FilterPipe, SortByPipe, RatingComponent, SearchComponent],
	imports: [CommonModule, AngularMaterialModule],
	exports: [FilterPipe, SortByPipe, AngularMaterialModule, RatingComponent, SearchComponent],
	providers: [FilterPipe, SortByPipe]
})
export class SharedModule {}
