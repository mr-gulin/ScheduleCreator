import {Week} from '@app/modules/creator-module/classes/week.class';

export class Schedule {
	private _id: number;
	private _name: string;
	private _weeks: Week[];
	private _countOfWorkDays: number;
	private _isSecondWeekExists: boolean;
	private _isShowEmptyPairs: boolean;
	private _createDate: any;
	private _userId: number;

	constructor(data?: any) {
		this._weeks = data || [];
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get weeks() {
		return this._weeks;
	}

	set weeks(value) {
		this._weeks = value;
	}

	get countOfWorkDays(): number {
		return this._countOfWorkDays;
	}

	set countOfWorkDays(value: number) {
		this._countOfWorkDays = value;
	}

	get isSecondWeekExists(): boolean {
		return this._isSecondWeekExists;
	}

	set isSecondWeekExists(value: boolean) {
		this._isSecondWeekExists = value;
	}

	get isShowEmptyPairs(): boolean {
		return this._isShowEmptyPairs;
	}

	set isShowEmptyPairs(value: boolean) {
		this._isShowEmptyPairs = value;
	}

	get createDate(): any {
		return this._createDate;
	}

	set createDate(value: any) {
		this._createDate = value;
	}

	get id(): number {
		return this._id;
	}

	set id(value: number) {
		this._id = value;
	}

	get userId(): number {
		return this._userId;
	}

	set userId(value: number) {
		this._userId = value;
	}
}
