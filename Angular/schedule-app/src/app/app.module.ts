import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgModel} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModuleModule} from '@app/app-routing.module';
import {CreatorModule} from '@app/modules/creator-module/creator.module';
import {CommonComponentsModule} from '@app/components/common.module';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		RouterModule,
		BrowserModule,
		FormsModule,
		BrowserAnimationsModule,
		AppRoutingModuleModule,
		CreatorModule,
		CommonComponentsModule
	],
	exports: [],
	providers: [RouterModule],
	bootstrap: [AppComponent]
})
export class AppModule {
}
