import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, HostListener, Inject, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
	selector: 'info-dialog',
	templateUrl: './info-dialog.component.html',
})
export class InfoDialogComponent {

	constructor(public dialogRef: MatDialogRef<InfoDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {
	}

	save() {
		this.dialogRef.close();
	}

}
