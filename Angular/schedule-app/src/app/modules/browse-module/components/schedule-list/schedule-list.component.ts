import {Component, OnInit} from '@angular/core';
import {ScheduleService} from "@app/services/schedule.service";
import {Router} from "@angular/router";
import { DatePipe } from '@angular/common';


@Component({
	selector: 'schedule-list',
	templateUrl: './schedule-list.component.html',
	styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

	title = 'app';

	constructor(private scheduleService: ScheduleService, private router: Router){

	}

	ngOnInit(): void {
		debugger;
		console.log(this.scheduleService.schedules);
	}

	openSchedule(scheduleNum: number){
		this.router.navigate(['/browse/viewSchedule'], { queryParams: { scheduleNum: scheduleNum } });
	}
}
