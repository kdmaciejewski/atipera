import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})

export class EditDialogComponent<T> {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA) public data: { value: T}
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
