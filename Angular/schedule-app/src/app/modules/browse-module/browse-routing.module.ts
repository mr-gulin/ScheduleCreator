import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CreatorComponent} from '@app/modules/creator-module/creator.component';
import {CommonComponentsModule} from '@app/components/common.module';
import {ComingSoonComponent} from "@app/components/coming-soon/coming-soon.component";
import {ScheduleListComponent} from "@app/modules/browse-module/components/schedule-list/schedule-list.component";

const appRoutes: Routes = [
	// {path: '', component: CreatorComponent},
	// {path: '**', component: ComingSoonComponent},
	{path: 'list', component: ScheduleListComponent},
	{
		path: '',
		redirectTo: 'list',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(
			appRoutes// <-- debugging purposes only
		),
		// other imports here
	],
})
export class BrowseRoutingModule {
}
