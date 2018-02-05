import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
	selector: 'settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
	@Input() isSecondWeekExists: boolean = false;
	@Output() dataChange = new EventEmitter();

	changeSecondWeek(data: any){
		console.log("change data", data);
		this.isSecondWeekExists = data.checked;
		this.dataChange.emit({isSecondWeekExists: data.checked});
	}
}
