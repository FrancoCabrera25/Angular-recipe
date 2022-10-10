import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-confirmation',
	templateUrl: './dialog-confirmation.component.html',
	styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit {
	constructor(public dialogRef: MatDialogRef<DialogConfirmationComponent>) {}
	ngOnInit(): void {}

	actionClose(result: boolean): void {
		this.dialogRef.close(result);
	}
}
