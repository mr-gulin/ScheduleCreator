import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CreatorComponent} from '@app/modules/creator-module/creator.component';
import {CommonComponentsModule} from '@app/components/common.module';

const appRoutes: Routes = [
	{path: '', component: CreatorComponent},
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
export class CreatorRoutingModuleModule {
}
