import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';

@NgModule({
	declarations: [],
	imports: [
		MatCardModule,
		MatButtonModule,
		MatChipsModule,
		MatIconModule,
		MatDialogModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		MatRadioModule,
		MatDividerModule,
		MatTableModule,
		MatSidenavModule,
		MatSlideToggleModule
	],
	exports: [
		MatCardModule,
		MatButtonModule,
		MatChipsModule,
		MatIconModule,
		MatDialogModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		MatRadioModule,
		MatDividerModule,
		MatTableModule,
		MatSidenavModule,
		MatSlideToggleModule
	],
	providers: []
})
export class AngularMaterialModule {}
