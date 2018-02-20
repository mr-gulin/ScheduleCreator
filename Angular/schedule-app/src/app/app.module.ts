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
import {CommonServicesModule} from "@app/services/common-services.module";
import { CookieService } from 'ngx-cookie-service';
import {WelcomeModule} from "@app/modules/welcome-module/welcome.module";


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		RouterModule,
		BrowserModule,
		FormsModule,
		CommonModule,
		BrowserAnimationsModule,
		AppRoutingModuleModule,
		CreatorModule,
		CommonComponentsModule,
		CommonServicesModule,
		WelcomeModule
	],
	exports: [CommonServicesModule],
	providers: [RouterModule, CookieService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
