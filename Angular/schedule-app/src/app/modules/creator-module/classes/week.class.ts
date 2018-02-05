import {Day} from '@app/modules/creator-module/classes/day.class';

export class Week {
	private _name: string;
	private _days: Day[];

	constructor(data?: any) {
		this._days = data || [];
	}

	get days() {
		return this._days;
	}

	set days(value) {
		this._days = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}
}
