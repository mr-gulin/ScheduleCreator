import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WelcomeComponent} from "@app/modules/welcome-module/welcome.component";

const appRoutes: Routes = [
	{path: '', component: WelcomeComponent},
//  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(
			appRoutes// <-- debugging purposes only
		),
		// other imports here
	],
})
export class WelcomeRoutingModule {
}
