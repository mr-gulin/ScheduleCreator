import {Week} from '@app/modules/creator-module/classes/week.class';

export class Schedule {
	private _name: string;
	private _weeks: Week[];

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
}
