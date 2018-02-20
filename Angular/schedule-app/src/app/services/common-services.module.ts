import {NgModule} from '@angular/core';
import {ScheduleService} from "@app/services/schedule.service";
import {RootScopeService} from "@app/services/root-scope.service";


@NgModule({
	declarations: [
	],
	imports: [

	],
	exports: [],
	providers: [ScheduleService, RootScopeService]
})
export class CommonServicesModule {
}
