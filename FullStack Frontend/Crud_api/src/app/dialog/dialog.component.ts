import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  programForm!: FormGroup;
  actionBtn: string = "Save";

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
  ) { }

  ngOnInit(): void {
    this.programForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [null, Validators.required],
      salary: ['', Validators.required],
      department: ['', Validators.required],

    });
    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = "Update";
      this.programForm.controls['name'].setValue(this.editData.name);
      this.programForm.controls['email'].setValue(this.editData.email);
      this.programForm.controls['phone'].setValue(this.editData.phone);
      this.programForm.controls['salary'].setValue(this.editData.salary);
      this.programForm.controls['department'].setValue(this.editData.department);

    }
  }


  updateProgram() {
    this.api.updateProgram(this.programForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert("Employee updated successfully..");
        this.programForm.reset();
        this.dialogRef.close('update');
      },
      error: (res) => {
        alert("Error while updating the Employee");
      }
    })
    console.log(this.programForm.value);
  }
  addProgram() {
    if (!this.editData) {
      if (this.programForm.valid) {
        this.api.postProgram(this.programForm.value).subscribe({
          next: (res) => {
            alert("Employee added successfully.");
            this.programForm.reset();
            this.dialogRef.close('save');
          },
          error: (res) => {
            alert("Error while adding the employee.");
          }
        });
      }
    } else {
      this.updateProgram();
    }
  }
  

}
