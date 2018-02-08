import {Component, OnInit} from '@angular/core';
import {ScheduleService} from "@app/services/schedule.service";


@Component({
	selector: 'schedule-list',
	templateUrl: './schedule-list.component.html',
	styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

	title = 'app';

	constructor(private scheduleService: ScheduleService){

	}

	ngOnInit(): void {
		debugger;
		console.log(this.scheduleService.schedules);
	}
}
