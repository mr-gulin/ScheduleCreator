import {Component, Input, OnInit} from '@angular/core';
import {Schedule} from '@app/modules/creator-module/classes/schedule.class';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ScheduleDialogComponent} from '@app/modules/creator-module/components/schedule-dialog/schedule-dialog.component';
import {Ng2FloatBtn} from "ng2-float-btn";

@Component({
	selector: 'floating-button',
	templateUrl: './floating-button.component.html',
	styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent implements OnInit {
	@Input() action: any;
	@Input() type: any;
	@Input() label: any;

	constructor(){
	}

	ngOnInit(){

	}
}
