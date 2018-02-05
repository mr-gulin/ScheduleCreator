import {Component, Input, OnInit} from '@angular/core';
import {Schedule} from '@app/modules/creator-module/classes/schedule.class';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ScheduleDialogComponent} from '@app/modules/creator-module/components/schedule-dialog/schedule-dialog.component';
import {Ng2FloatBtn} from "ng2-float-btn";

@Component({
	selector: 'pair-edit',
	templateUrl: './pair-edit.component.html',
	styleUrls: ['./pair-edit.component.css']
})
export class PairEditComponent implements OnInit {

	constructor(){
	}

	ngOnInit(){

	}
}
