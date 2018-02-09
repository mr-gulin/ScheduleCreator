import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Schedule} from "@app/modules/creator-module/classes/schedule.class";
import {ScheduleService} from "@app/services/schedule.service";
import {Week} from "@app/modules/creator-module/classes/week.class";
import {Day} from "@app/modules/creator-module/classes/day.class";
import {Pair} from "@app/modules/creator-module/classes/pair.class";

@Component({
	selector: 'schedule-view',
	templateUrl: './schedule-view.component.html',
	styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent implements OnInit {
	title = 'app';
	private scheduleNum = -1;
	private schedule: Schedule;
	private scheduleView: any;

	weekDays = [
		{name: 'Понедельник', sysname: 0},
		{name: 'Вторник', sysname: 1},
		{name: 'Среда', sysname: 2},
		{name: 'Четверг', sysname: 3},
		{name: 'Пятница', sysname: 4},
		{name: 'Суббота', sysname: 5},
		{name: 'Воскресенье', sysname: 6}
	];

	constructor(private router: Router, private route: ActivatedRoute, private scheduleService: ScheduleService){

	}

	isCurrentDayExists(dayNum: number){
		if (this.schedule && this.schedule.weeks){
			this.schedule.weeks.forEach((week: Week) => {
				if (week && week.days){
					week.days.forEach((day: Day) => {
						if (day.sysname === dayNum){
							return true;
						}
					});
				}
			});
		}
		return false;
	}

	remap(){
		this.scheduleView = [];
		this.weekDays.forEach((weekDay: any) => {
			let day: any = {};
			day.name = weekDay.name;
			day.sysname = weekDay.sysname;
			day.weeks = [];
			if (this.schedule && this.schedule.weeks) {
				this.schedule.weeks.forEach((week: Week) => {
					if (week && week.days) {
						let weekView: any = {};
						weekView.name = week.name;
						weekView.pairs = [];
						week.days.forEach((day: Day) => {
							if (day.sysname === weekDay.sysname) {
								weekView.pairs = day.pairs;
							}
						});
						day.weeks.push(weekView);
					}
				});
			}
			this.scheduleView.push(day);
			console.log('scheduleView', this.scheduleView);
		});
		this.addEmptyPairsToTheEnd();
	}

	addEmptyPairsToTheEnd(){
		let index: number = 0;
		if (this.scheduleView && this.schedule.isSecondWeekExists){
			this.scheduleView.forEach((day:any) => {
				if (day && day.weeks){
					if (day.weeks[0] && day.weeks[1] && day.weeks[0].pairs && day.weeks[1].pairs){
						if (day.weeks[0].pairs.length > day.weeks[1].pairs.length){
							index = day.weeks[0].pairs.length - day.weeks[1].pairs.length;
							for (let i=0; i<index; i++){
								const pair = new Pair();
								pair.type = '';
								pair.name = '';
								pair.color = '#fff';
								pair.teacher = '';
								day.weeks[1].pairs.push(pair);
							}
						} else if (day.weeks[0].pairs.length < day.weeks[1].pairs.length){
							index = day.weeks[1].pairs.length - day.weeks[0].pairs.length;
							for (let i=0; i<index; i++){
								const pair = new Pair();
								pair.type = '';
								pair.name = '';
								pair.color = '#fff';
								pair.teacher = '';
								day.weeks[0].pairs.push(pair);
							}
						}
					}
				}
			});
		}
	}

	isShowPair(pair: any){
		if (pair && (pair.systemType === 'EMPTY') && this.schedule && !this.schedule.isShowEmptyPairs){
			return false;
		}
		return true;
	}

	isEmpty(day: any){
		let res = true;
		if (day && day.weeks){
			day.weeks.forEach((week: any) => {
				if (week && week.pairs && (week.pairs.length > 0)) {
					res = false;
				}
			});
		}
		return res;
	}

	ngOnInit() {
		this.route
			.queryParams
			.subscribe(params => {
				// Defaults to 0 if no query param provided.
				this.scheduleNum = params && params.scheduleNum;
				this.schedule = this.scheduleNum && this.scheduleService && this.scheduleService.getSchedule(this.scheduleNum);
			});
		this.remap();
	}


}
