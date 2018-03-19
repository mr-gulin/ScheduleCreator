export class User{
	private _id: number;
	private _name: string;
	private _token: string;
	private _login: string;
	private _telegramId: number;

	get id(): number {
		return this._id;
	}

	set id(value: number) {
		this._id = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get token(): string {
		return this._token;
	}

	set token(value: string) {
		this._token = value;
	}

	get login(): string {
		return this._login;
	}

	set login(value: string) {
		this._login = value;
	}

	get telegramId(): number {
		return this._telegramId;
	}

	set telegramId(value: number) {
		this._telegramId = value;
	}
}