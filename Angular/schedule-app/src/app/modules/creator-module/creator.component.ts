import {Component, EventEmitter, HostListener, Input, OnInit, ViewChild} from '@angular/core';
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
import {CreateNewAutocompleteGroup, NgAutocompleteComponent} from "ng-auto-complete";
import {ScheduleService} from "@app/services/schedule.service";
import {Router} from "@angular/router";
import {InfoDialogComponent} from "@app/modules/creator-module/components/info-dialog/info-dialog.component";
import { CookieService } from 'ngx-cookie-service';
import {RootScopeService} from "@app/services/root-scope.service";

@Component({
	selector: 'creator-component',
	templateUrl: './creator.component.html',
	styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {
	public static DEFAULT_ODD_WEEK_NAME = 'Нечётная неделя';
	public static DEFAULT_EVEN_WEEK_NAME = 'Чётная неделя';
	public static DEFAULT_COUNT_OF_WORK_DAYS = 6;

	@ViewChild('f') form: NgForm;

	autoCompleteGroup: any[] = [];

	schedule: Schedule;
	oddWeekName = CreatorComponent.DEFAULT_ODD_WEEK_NAME;
	evenWeekName = CreatorComponent.DEFAULT_EVEN_WEEK_NAME;
	isScheduleTitleEditable = false;
	isScheduleInit = false;

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

	@HostListener('window:keypress', ['$event'])
	keyPress(event: KeyboardEvent) {
		if (!this.isScheduleInit) {
			if (event.shiftKey && event.keyCode == 78) {
				const dayNum = -1;
				let week: Week;
				if (this.schedule && this.schedule.weeks) {
					week = this.schedule.weeks[0];
					if (week) {
						this.switchToNewDay(null, dayNum, week, null, this.form, false);
					}
				}
			}
			if (event.shiftKey && event.keyCode == 69) {
				const dayNum = -1;
				let week: Week;
				if (this.schedule && this.schedule.weeks) {
					week = this.schedule.weeks[0];
					if (week) {
						this.switchToNewDay(null, dayNum, week, null, this.form, true);
					}
				}
			}
		}
		this.isScheduleInit = true;
	}

	constructor(private dialog: MatDialog, private fb: FormBuilder, private scheduleService: ScheduleService, private router: Router, private cookieService: CookieService, private rootScope: RootScopeService) {

	}

	addDaysToWeek(week: Week) {
		for (let i = 0; i < this.schedule.countOfWorkDays; i++) {
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
					if (countNow > this.schedule.countOfWorkDays) {
						week.days = week.days.slice(0, this.schedule.countOfWorkDays);
					} else {
						if (countNow < this.schedule.countOfWorkDays) {
							for (let i = week.days.length; i < this.schedule.countOfWorkDays; i++) {
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
			if (this.schedule.isSecondWeekExists) {
				if (this.schedule.weeks.length < 2) {
					const week = new Week();
					week.name = this.evenWeekName;
					week.number = 2;
					this.addDaysToWeek(week);
					this.schedule.weeks.push(week);
				}
			} else {
				if (this.schedule.weeks.length > 1) {
					this.schedule.weeks = this.schedule.weeks.slice(0, 1);
				}
			}
			if (this.schedule.weeks.length === 0) {
				this.addWeeks();
			}
		}
	}

	addWeeks() {
		const week = new Week();
		week.name = this.oddWeekName;
		week.number = 1;
		const week2 = new Week();
		week2.name = this.evenWeekName;
		week2.number = 2;
		this.addDaysToWeek(week);
		this.addDaysToWeek(week2);
		if (this.schedule) {
			this.schedule.weeks = [];
		}
		if (this.schedule.isSecondWeekExists) {
			this.schedule.weeks.push(week);
			this.schedule.weeks.push(week2);
		} else {
			this.schedule.weeks.push(week);
		}
	}

	changeSecondWeek(data: any) {
		console.log("change data", data);
		this.schedule.isSecondWeekExists = data.checked;
		// this.dataChange.emit({isSecondWeekExists: data.checked});
		this.adjustCountOfWeeks();


	}

	changeShowEmptyPairs(data: any) {
		this.schedule.isShowEmptyPairs = data.checked;
	}

	toggleEditScheduleName() {
		this.isScheduleTitleEditable = !this.isScheduleTitleEditable;
	}

	addSchedule() {
		this.openDialog();
	}

	action = () => {
		this.addSchedule();
	};

	openDialog(): void {
		setTimeout(() => {
			const dialogRef = this.dialog.open(ScheduleDialogComponent, {
				width: '500px',
				data: {name: '', weeks: []},
			});
			dialogRef.afterClosed().subscribe(result => {
				if (!result){
					this.router.navigate(['/browse/list']);
				} else {
					console.log('The dialog was closed');
					this.schedule = result;
					this.schedule.isSecondWeekExists = false;
					this.schedule.isShowEmptyPairs = true;
					this.schedule.countOfWorkDays = CreatorComponent.DEFAULT_COUNT_OF_WORK_DAYS;
					this.schedule.createDate = new Date();
					console.log('schedule', this.schedule);
					this.addWeeks();
					this.openInfoDialog();
				}
			});
		});


	}

	openInfoDialog(): void {
		setTimeout(() => {
			if ((this.cookieService.get('ISINFOADDDIALOGSHOWED') !== 'true') && (window.screen.width > 999)){
				const dialogRef = this.dialog.open(InfoDialogComponent, {
					width: '500px',
				});
				dialogRef.afterClosed().subscribe(result => {
					this.cookieService.set('ISINFOADDDIALOGSHOWED', 'true');//put('ISINFOADDDIALOGSHOWED', "true");

				});
			}
		});
	}


	addPair(day: Day, weeknum?: any, daynum?: any) {
		const pair = new Pair();
		if (day && day.pairs) {
			day.pairs.push(pair);

		}
	}

	addEmptyPair = (day: Day, weeknum?: any, daynum?: any) => {
		const pair = new Pair();
		pair.isEditMode = false;
		pair.systemType = 'EMPTY';
		pair.type = '';
		pair.name = '';
		pair.color = '#fff';
		pair.teacher = '';
		if (day && day.pairs) {
			day.pairs.push(pair);
			this.addPair(day);
		}
	}

	submitPair(f: NgForm, pair: Pair, day: Day) {
		if (f.valid) {
			pair.isEditMode = false;
			let isAlreadyExists = false;
			this.autoCompleteGroup.forEach((item: Pair) => {
				if (item.name === pair.name) {
					isAlreadyExists = true;
				}
			});
			if (!isAlreadyExists) {
				this.autoCompleteGroup.push(pair);
			}
			// this.addPair(day);
		}
	}

	editPair(pair: Pair) {
		pair.isEditMode = true;
	}

	deletePair(weekNum: any, dayNum: any, pairNum: any) {

		if (this.schedule && this.schedule.weeks && this.schedule.weeks[weekNum] &&
			this.schedule.weeks[weekNum].days && this.schedule.weeks[weekNum].days[dayNum]) {

			if (this.autoCompleteGroup) {
				for (let i = 0; i < this.autoCompleteGroup.length; i++) {
					if (this.autoCompleteGroup[i] && this.autoCompleteGroup[i].name === this.schedule.weeks[weekNum].days[dayNum].pairs[pairNum].name) {
						this.autoCompleteGroup.splice(i, 1);
					}
				}
			}
			this.schedule.weeks[weekNum].days[dayNum].pairs.splice(pairNum, 1);
		}
	}

	chooseExistingPair(data: any, weekNum: any, dayNum: any, pairNum: any) {
		debugger;
		let pair: Pair = new Pair();
		const value = data && data.source && data.source.value;
		this.autoCompleteGroup.forEach((item: Pair) => {
			if (item.name === value) {
				Object.assign(pair, item);
			}
		});
		pair.isEditMode = true;
		if (pair && this.schedule && this.schedule.weeks && this.schedule.weeks[weekNum] &&
			this.schedule.weeks[weekNum].days && this.schedule.weeks[weekNum].days[dayNum]) {
			this.schedule.weeks[weekNum].days[dayNum].pairs[pairNum] = pair;
		}
		console.log(data);
	}

	ngOnInit() {
		this.action();
	}

	submit = () => {
		let index = this.scheduleService.addSchedule(this.schedule);
		this.router.navigate(['/browse']);
	};

	switchToNewDay(event: any, dayNum: number, week: Week, pair: Pair, f: NgForm, isEmpty: boolean) {
		let add = this.addPair;
		if (isEmpty) {
			add = this.addEmptyPair;
		}
		if (f && f.valid) {
			if (pair) {
				pair.isEditMode = false;
			}
		}
		if ((f && f.valid) || !f) {
			// Берем week(dayNum+1), если переполнилось, значит берем следующую неделю, если закончилось сохраняем
			let day: Day;
			dayNum = dayNum + 1;
			if ((dayNum + 1) > this.schedule.countOfWorkDays && this.schedule.isSecondWeekExists && week.number !== 2) {
				dayNum = 0;
				week = this.schedule.weeks[1];
				day = week && week.days[dayNum];
				add(day);
			} else if ((dayNum + 1) <= this.schedule.countOfWorkDays) {
				day = week && week.days[dayNum];
				add(day);
			}
		}
	}

	submitAndAddNewPair(f: NgForm, day: Day, pair: Pair){
		this.submitPair(f, pair, day);
		this.addPair(day);
	}
}
