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
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = "https://telegram.org/js/telegram-widget.js?4";
		s.async = true;
		s.setAttribute('data-telegram-login', 'bestshedulebot');
		s.setAttribute('data-size', 'large');
		s.setAttribute('data-request-acess', 'write');
		s.setAttribute('data-onauth', 'onAuth(user)');
		this.elementRef.nativeElement.appendChild(s);
	}

	onTelegramAuth(user: any) {
		debugger;
	}


	showSideBar() {
		this.isOpened = true;
	}
}
