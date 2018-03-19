import {Pair} from '@app/modules/creator-module/classes/pair.class';

export class Day {
	private _id: number;
	private _name: string;
	private _sysname: any;
	private _weekId: number;
	private _pairs: Pair[];

	constructor(data?: any) {
		this._pairs = data || [];
	}

	get pairs(): Pair[] {
		return this._pairs;
	}

	set pairs(value: Pair[]) {
		this._pairs = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get sysname(): any {
		return this._sysname;
	}

	set sysname(value: any) {
		this._sysname = value;
	}

	get id(): number {
		return this._id;
	}

	set id(value: number) {
		this._id = value;
	}

	get weekId(): number {
		return this._weekId;
	}

	set weekId(value: number) {
		this._weekId = value;
	}
}
