import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from 'src/app/core/service/recipe.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeTableComponent } from './components/recipe-table/recipe-table.component';
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';

@NgModule({
	declarations: [RecipeComponent, RecipeTableComponent, RecipeFormComponent, RecipeViewComponent],
	imports: [CommonModule, RecipeRoutingModule, SharedModule, ReactiveFormsModule],
	exports: [RecipeComponent],
	providers: [RecipeService]
})
export class RecipeModule {}
