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

	getAllPairsByWeekNumberAndDaySysname(weekNumber: number, daySysname: string): Pair[]{
		for (let week of this.schedule.weeks){
			if (week && week.days){
				for (let day of week.days){
					if (day && day.pairs) {
						if (day.sysname === daySysname){
							if (week.number === weekNumber){
								return day.pairs;
							}
						}
					}
				}
			}
		}
		return [];
	}

	remap(){
		this.scheduleView = [];
		this.weekDays.forEach((weekDay: any) => {
			let day: any = {};
			day.name = weekDay.name;
			day.sysname = weekDay.sysname;
			day.pairs = [];
			let pairsWeek1: Pair[] = this.getAllPairsByWeekNumberAndDaySysname(1, day.sysname);
			debugger;
			let pairsWeek2: Pair[] = this.getAllPairsByWeekNumberAndDaySysname(2, day.sysname);
			for (let i=0; i<pairsWeek1.length; i++){
					let masterPair: any = {};
					let pairWeek1: Pair = pairsWeek1[i];
					let pairWeek2: Pair;
					if (pairsWeek2[i]){
						pairWeek2 = pairsWeek2[i];
					} else {
						pairWeek2 = new Pair();
						pairWeek2.type = '';
						pairWeek2.name = '';
						pairWeek2.color = '#fff';
						pairWeek2.teacher = '';
					}
					masterPair.pairWeek1 = pairWeek1;
					masterPair.pairWeek2 = pairWeek2;
					day.pairs.push(masterPair);
			}
			this.scheduleView.push(day);
			console.log('scheduleView', this.scheduleView);
		});

	}

	isShowPair(pair: any){
		if (pair && (pair.systemType === 'EMPTY') && this.schedule && !this.schedule.isShowEmptyPairs){
			return false;
		}
		return true;
	}

	isEmpty(day: any){
		let res = true;
		if (day && day.pairs){
			if (day.pairs.length > 0)
					res = false;
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
