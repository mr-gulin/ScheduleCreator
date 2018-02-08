import {NgModule} from '@angular/core';
import {ContentEditableDirective} from "@app/directives/content-editable.directive";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";



@NgModule({
	declarations: [
		ContentEditableDirective
	],
	imports:[

	],
	exports: [
		ContentEditableDirective
	],
	providers: [],
	bootstrap: []
})
export class CommonDirectivesModule {
}
