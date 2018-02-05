import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, HostListener, Inject, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
	selector: 'schedule-dialog',
	templateUrl: './schedule-dialog.component.html',
})
export class ScheduleDialogComponent {

	@ViewChild('f') form : NgForm;

	constructor(public dialogRef: MatDialogRef<ScheduleDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {
	}

	onNoClick(): void {
		console.log("cancel");
		this.dialogRef.close();
	}

	save() {
		if (this.form.valid) {
			console.log("form valid enter");
			this.dialogRef.close(this.data);
		} else {
			console.log("form invalid");
		}
	}

	// @HostListener('document:keydown', ['$event'])
	// onKeydownHandler(event: KeyboardEvent) {
	// 	if (event.key === "Enter") {
	// 		this.save();
	// 	}
	// }

}
