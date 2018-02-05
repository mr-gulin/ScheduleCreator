import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppRoutingModuleModule} from '@app/app-routing.module';
import {CreatorModule} from '@app/modules/creator-module/creator.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ToolbarComponent} from '@app/components/toolbar/toolbar.component';
import {
	MatAutocompleteModule, MatButtonModule, MatDialogModule, MatIconModule, MatInputModule,
	MatSlideToggleModule
} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {FloatingButtonComponent} from "@app/components/floating-button/floating-button.component";
import {SettingsComponent} from "@app/components/settings/settings.component";
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {ColorPickerModule} from "angular2-color-picker/lib/color-picker.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
	declarations: [
		ToolbarComponent,
		FloatingButtonComponent,
		SettingsComponent
	],
	imports: [
		RouterModule,
		CommonModule,
		MatToolbarModule,
		MatButtonModule,
		MatCardModule,
		MatDialogModule,
		MatInputModule,
		MatIconModule,
		MatSlideToggleModule,
		MatSelectModule,
		MatDividerModule,
		ColorPickerModule,
		MatAutocompleteModule,
		ReactiveFormsModule
	],
	exports: [
		ToolbarComponent,
		MatCardModule,
		MatButtonModule,
		MatDialogModule,
		MatInputModule,
		FloatingButtonComponent,
		MatIconModule,
		SettingsComponent,
		MatSlideToggleModule,
		MatSelectModule,
		MatDividerModule,
		ColorPickerModule,
		MatAutocompleteModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: []
})
export class CommonComponentsModule {
}
