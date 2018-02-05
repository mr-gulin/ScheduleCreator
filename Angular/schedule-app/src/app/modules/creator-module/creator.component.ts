import {Component, Input, ViewChild} from '@angular/core';
import {Schedule} from '@app/modules/creator-module/classes/schedule.class';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ScheduleDialogComponent} from '@app/modules/creator-module/components/schedule-dialog/schedule-dialog.component';
import {Ng2FloatBtn} from "ng2-float-btn";
import {Week} from "@app/modules/creator-module/classes/week.class";
import {Day} from "@app/modules/creator-module/classes/day.class";
import {Pair} from "@app/modules/creator-module/classes/pair.class";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";

@Component({
	selector: 'creator-component',
	templateUrl: './creator.component.html',
	styleUrls: ['./creator.component.css']
})
export class CreatorComponent {
	public static DEFAULT_ODD_WEEK_NAME = 'Нечётная неделя';
	public static DEFAULT_EVEN_WEEK_NAME = 'Чётная неделя';
	public static DEFAULT_COUNT_OF_WORK_DAYS = 6;

	@ViewChild('f') form: NgForm;

	title = 'app';
	schedule: Schedule;
	isSecondWeekExists: boolean;
	oddWeekName = CreatorComponent.DEFAULT_ODD_WEEK_NAME;
	evenWeekName = CreatorComponent.DEFAULT_EVEN_WEEK_NAME;
	countOfWorkDays = CreatorComponent.DEFAULT_COUNT_OF_WORK_DAYS;
	filteredOptions: Observable<Pair[]>;
	pairNameControl: FormControl = new FormControl();
	public myForm: FormGroup;

	weekDays = [
		{name: 'Понедельник', sysname: 0},
		{name: 'Вторник', sysname: 1},
		{name: 'Среда', sysname: 2},
		{name: 'Четверг', sysname: 3},
		{name: 'Пятница', sysname: 4},
		{name: 'Суббота', sysname: 5},
		{name: 'Воскресенье', sysname: 6}
	];

	possibleCountOfWorkDays = [
		5,
		6,
		7
	];

	constructor(private dialog: MatDialog, private fb: FormBuilder) {
		this.isSecondWeekExists = false;


	}

	changeSettings(data: any) {
		this.isSecondWeekExists = data && data.isSecondWeekExists;
	}


	filterSubjects(name: string, day: Day) {
		return day.pairs.filter((pair: any) =>
			pair.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
	}

	addDaysToWeek(week: Week) {
		for (let i = 0; i < this.countOfWorkDays; i++) {
			const day = new Day();
			day.name = this.weekDays[i].name;
			day.sysname = this.weekDays[i].sysname;
			week.days.push(day);
		}
	}

	adjustCountOfDays() {
		if (this.schedule && this.schedule.weeks) {
			this.schedule.weeks.forEach((week: Week) => {
				if (week.days) {
					const countNow = week.days.length;
					if (countNow > this.countOfWorkDays) {
						week.days = week.days.slice(0, this.countOfWorkDays);
					} else {
						if (countNow < this.countOfWorkDays) {
							for (let i = week.days.length; i < this.countOfWorkDays; i++) {
								debugger;
								const day = new Day();
								day.name = this.weekDays[i].name;
								day.sysname = this.weekDays[i].sysname;
								week.days.push(day);
							}
						}
					}
				}
			});
		}
	}

	adjustCountOfWeeks() {
		if (this.schedule && this.schedule.weeks) {
			if (this.isSecondWeekExists) {
				if (this.schedule.weeks.length < 2) {
					const week = new Week();
					week.name = this.evenWeekName;
					this.addDaysToWeek(week);
					this.schedule.weeks.push(week);
				}
			} else {
				if (this.schedule.weeks.length > 1) {
					this.schedule.weeks = this.schedule.weeks.slice(0, 1);
				}
			}
			if (this.schedule.weeks.length === 0){
				this.addWeeks();
			}
		}
	}

	addWeeks() {
		const week = new Week();
		week.name = this.oddWeekName;
		const week2 = new Week();
		week2.name = this.evenWeekName;
		this.addDaysToWeek(week);
		this.addDaysToWeek(week2);
		if (this.schedule) {
			this.schedule.weeks = [];
		}
		if (this.isSecondWeekExists) {
			this.schedule.weeks.push(week);
			this.schedule.weeks.push(week2);
		} else {
			this.schedule.weeks.push(week);
		}
	}

	changeSecondWeek(data: any) {
		console.log("change data", data);
		this.isSecondWeekExists = data.checked;
		// this.dataChange.emit({isSecondWeekExists: data.checked});
		this.adjustCountOfWeeks();


	}

	addSchedule() {
		this.openDialog();
	}

	action = () => {
		this.addSchedule();
	};

	openDialog(): void {
		const dialogRef = this.dialog.open(ScheduleDialogComponent, {
			width: '500px',
			data: {name: '', weeks: []}
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.schedule = result;
			console.log('schedule', this.schedule);
			this.addWeeks();
		});
	}


	addPair(day: Day, weeknum: any, daynum: any) {
		const pair = new Pair();
		if (day && day.pairs){
			day.pairs.push(pair);

		}
	}

	submit = () => {
		alert("Yey");
	}
}
