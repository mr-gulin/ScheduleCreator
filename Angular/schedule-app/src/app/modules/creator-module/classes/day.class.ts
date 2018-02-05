import {Pair} from '@app/modules/creator-module/classes/pair.class';

export class Day {
	private _name: string;
	private _sysname: any;
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
}
