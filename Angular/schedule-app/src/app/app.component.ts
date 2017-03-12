import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../environments/environment';
import { RootScopeService } from "@app/services/root-scope.service";
import { HttpService } from "@app/services/http.service";

declare var onTelegramAuth: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';
	version = environment.version;
	isOpened = false;

	@ViewChild('scr') elementRef: ElementRef;

	buttons = [
		{ title: 'Мои расписания', link: '/browse' },
		{ title: 'Новое расписание', link: '/create' }
	];

	constructor(private rootScope: RootScopeService, private http: HttpService) {

	}

	ngOnInit() {
		this.http.addBookWithObservable().subscribe((res: any) => {
			debugger;
			console.log(res);
		});
	}

	onTelegramAuth(user: any) {
		debugger;
	}


	showSideBar() {
		this.isOpened = true;
	}
}
