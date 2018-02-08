import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CommonComponentsModule} from '@app/components/common.module';
import {BrowseRoutingModule} from "@app/modules/browse-module/browse-routing.module";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ScheduleListComponent} from "@app/modules/browse-module/components/schedule-list/schedule-list.component";
import {ScheduleViewComponent} from "@app/modules/browse-module/components/schedule-view/schedule-view.component";
import {ScheduleService} from "@app/services/schedule.service";


@NgModule({
	declarations: [
		ScheduleListComponent,
		ScheduleViewComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		CommonComponentsModule,
		BrowseRoutingModule,
		CommonComponentsModule
	],
	exports: [],
	providers: [],
	bootstrap: []
})
export class BrowseModule {
}
