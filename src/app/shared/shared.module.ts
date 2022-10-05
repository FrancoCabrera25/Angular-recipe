import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './material/angular-material.module';
import { FilterPipe } from './pipes/filter.pipe';
import { SortByPipe } from './pipes/sort.pipe';

@NgModule({
	declarations: [FilterPipe, SortByPipe],
	imports: [AngularMaterialModule],
	exports: [FilterPipe, SortByPipe, AngularMaterialModule],
	providers: []
})
export class SharedModule {}
