import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from 'src/app/core/service/recipe.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeTableComponent } from './recipe-table/recipe-table.component';
import { RecipeComponent } from './recipe.component';

@NgModule({
	declarations: [RecipeComponent, RecipeTableComponent, RecipeFormComponent],
	imports: [CommonModule, RecipeRoutingModule, SharedModule, ReactiveFormsModule],
	exports: [RecipeComponent],
	providers: [RecipeService]
})
export class RecipeModule {}
