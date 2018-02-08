import {Component, Injectable, OnInit} from '@angular/core';
import {Schedule} from "@app/modules/creator-module/classes/schedule.class";

@Injectable()
export class ScheduleService implements OnInit {

	private _schedules: Schedule[] = [];

	ngOnInit(): void {
	}

	public addSchedule(schedule: Schedule){
		if (this._schedules && schedule){
			this._schedules.push(schedule);
			return this._schedules.length;
		}
	}

	public getSchedule(index: number){
		return this._schedules[index];
	}

	get schedules(): Schedule[] {
		return this._schedules;
	}

	set schedules(value: Schedule[]) {
		this._schedules = value;
	}
}