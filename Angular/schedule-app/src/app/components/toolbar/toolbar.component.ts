import {Component} from '@angular/core';

@Component({
	selector: 'toolbar-app',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
	title = 'app';
	buttons = [
		{title: 'Create schedule', link: '/create'}
	];
}
