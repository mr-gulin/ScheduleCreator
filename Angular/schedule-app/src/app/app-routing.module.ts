import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CreatorComponent} from '@app/modules/creator-module/creator.component';
import {CommonComponentsModule} from '@app/components/common.module';

const appRoutes: Routes = [
	{
		path: 'create',
		loadChildren: '@app/modules/creator-module/creator.module#CreatorModule'
	},
	{
		path: '',
		redirectTo: '',
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
