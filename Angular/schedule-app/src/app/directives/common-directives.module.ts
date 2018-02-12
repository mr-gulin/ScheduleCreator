import {NgModule} from '@angular/core';
import {ContentEditableDirective} from "@app/directives/content-editable.directive";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {HotkeysDirective} from "@app/directives/hotkeys.directive";
import {FocusFirstDirective} from "@app/directives/focus-first.directive";



@NgModule({
	declarations: [
		ContentEditableDirective,
		HotkeysDirective,
		FocusFirstDirective
	],
	imports:[

	],
	exports: [
		ContentEditableDirective,
		HotkeysDirective,
		FocusFirstDirective
	],
	providers: [],
	bootstrap: []
})
export class CommonDirectivesModule {
}
