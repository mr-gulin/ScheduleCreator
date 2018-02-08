import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CreatorRoutingModuleModule} from '@app/modules/creator-module/creator-routing.module';
import {CreatorComponent} from '@app/modules/creator-module/creator.component';
import {CommonComponentsModule} from '@app/components/common.module';
import {CommonModule} from '@angular/common';
import {ScheduleDialogComponent} from '@app/modules/creator-module/components/schedule-dialog/schedule-dialog.component';
import {FormsModule} from '@angular/forms';
import {CommonDirectivesModule} from "@app/directives/common-directives.module";
import {ScheduleService} from "@app/services/schedule.service";


@NgModule({
	declarations: [
		CreatorComponent,
		ScheduleDialogComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		CommonComponentsModule,
		CreatorRoutingModuleModule,
		CommonDirectivesModule
	],
	providers: [],
	entryComponents: [ScheduleDialogComponent]
})
export class CreatorModule {
}
