import {Component, EventEmitter, Output} from '@angular/core';
import {RootScopeService} from "@app/services/root-scope.service";

@Component({
	selector: 'toolbar-app',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
	title = 'app';
	buttons = [
		{title: 'Мои расписания', link: '/browse'},
		{title: 'Новое расписание', link: '/create'}
	];

	@Output() drawerToggle = new EventEmitter();

	constructor(private rootScope: RootScopeService){

	}

	onHomeClick(){
		this.rootScope.isShowToolbar = false;
	}

	drawer(){
		this.drawerToggle.emit();
	}
}
