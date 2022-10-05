import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';

@NgModule({
	declarations: [RecipeComponent],
	imports: [CommonModule, RecipeRoutingModule],
	exports: [RecipeComponent],
	providers: []
})
export class RecipeModule {}
