import {Component} from '@angular/core';
import {ScheduleService} from "@app/services/schedule.service";

@Component({
	selector: 'browse',
	templateUrl: './browse.component.html',
	styleUrls: ['./browse.component.css']
})
export class BrowseComponent {
	title = 'app';

	constructor(private scheduleService: ScheduleService){

	}
}
