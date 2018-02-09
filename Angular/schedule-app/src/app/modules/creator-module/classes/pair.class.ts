import {Color} from 'highcharts';

export class Pair {
	private _num: number;
	private _type: string;
	private _name: string;
	private _classRoom: string;
	private _teacher: string;
	private _color: string;
	private _isEditMode: boolean = true;
	private _systemType: string;

	constructor(data?: any) {
		if (data) {
			this._num = data.num;
			this._name = data.name;
			this._type = data.type;
			this._classRoom = data.classRoom;
			this._teacher = data.teacher;
			this._color = data.color;
		}
	}

	get num(): number {
		return this._num;
	}

	set num(value: number) {
		this._num = value;
	}

	get type(): string {
		return this._type;
	}

	set type(value: string) {
		this._type = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get classRoom(): string {
		return this._classRoom;
	}

	set classRoom(value: string) {
		this._classRoom = value;
	}

	get teacher(): string {
		return this._teacher;
	}

	set teacher(value: string) {
		this._teacher = value;
	}

	get color(): any {
		return this._color;
	}

	set color(value: any) {
		this._color = value;
	}

	get isEditMode(): boolean {
		return this._isEditMode;
	}

	set isEditMode(value: boolean) {
		this._isEditMode = value;
	}

	get systemType(): string {
		return this._systemType;
	}

	set systemType(value: string) {
		this._systemType = value;
	}
}
