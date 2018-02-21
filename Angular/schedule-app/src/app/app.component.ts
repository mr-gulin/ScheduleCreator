import {Component} from '@angular/core';
import { environment } from '../environments/environment';
import {RootScopeService} from "@app/services/root-scope.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	version = environment.version;
	isOpened = false;

	buttons = [
		{title: 'Мои расписания', link: '/browse'},
		{title: 'Новое расписание', link: '/create'}
	];

	constructor(private rootScope: RootScopeService){

	}

	showSideBar(){
		this.isOpened = true;
	}
}
