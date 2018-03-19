import {NgModule} from '@angular/core';
import {ScheduleService} from "@app/services/schedule.service";
import {RootScopeService} from "@app/services/root-scope.service";
import {HttpService} from "@app/services/http.service";
import {HttpBackend, HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";


@NgModule({
	declarations: [

	],
	imports: [
		HttpClientModule
	],
	exports: [HttpClientModule],
	providers: [ScheduleService, RootScopeService, HttpService]
})
export class CommonServicesModule {
}
