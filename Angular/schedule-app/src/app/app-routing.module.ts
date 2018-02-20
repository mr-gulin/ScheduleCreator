import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CreatorComponent} from '@app/modules/creator-module/creator.component';
import {CommonComponentsModule} from '@app/components/common.module';
import {ComingSoonComponent} from "@app/components/coming-soon/coming-soon.component";

const appRoutes: Routes = [
	{
		path: 'create',
		loadChildren: '@app/modules/creator-module/creator.module#CreatorModule'
	},
	{
		path: 'browse',
		loadChildren: '@app/modules/browse-module/browse.module#BrowseModule'
	},
	{
		path: '',
		loadChildren: '@app/modules/welcome-module/welcome.module#WelcomeModule',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			appRoutes, {useHash: true}// <-- debugging purposes only
		)// other imports here
	],
})
export class AppRoutingModuleModule {
}
