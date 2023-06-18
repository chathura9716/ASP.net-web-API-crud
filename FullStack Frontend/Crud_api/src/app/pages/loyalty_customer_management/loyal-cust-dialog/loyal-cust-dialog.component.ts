
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoyalCustServiceService } from '../loyal-cust-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-loyal-cust-dialog',
  templateUrl: './loyal-cust-dialog.component.html',
  styleUrls: ['./loyal-cust-dialog.component.scss']
})
export class LoyalCustDialogComponent implements OnInit {

  loyalCustForm!: FormGroup;
  actionBtn: string = "Save";

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private api: LoyalCustServiceService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<LoyalCustDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.loyalCustForm = this.formBuilder.group({
      custID: [''],
      cardNo: ['', Validators.required],
      custName: ['', Validators.required],
      add1: [''],
      add2: [''],
      add3: [''],
      refNo: [''],
      homePhone: ['', Validators.required],
      mobilePhone: [''],
      custType: [''],
      isIssued: [''],
      issueDate: [''],
      creatDate: [''],
      collectionType: [''],
      appTime: [''],
      isPrint: [''],
      printTime: [''],
      email: [''],
      namePrintOnCard: [''],

    });
    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = "Update";
      this.loyalCustForm.controls['custID'].setValue(this.editData.custID);
      this.loyalCustForm.controls['cardNo'].setValue(this.editData.cardNo);
      this.loyalCustForm.controls['custName'].setValue(this.editData.custName);
      this.loyalCustForm.controls['add1'].setValue(this.editData.add1);
      this.loyalCustForm.controls['add2'].setValue(this.editData.add2);
      this.loyalCustForm.controls['add3'].setValue(this.editData.add3);
      this.loyalCustForm.controls['refNo'].setValue(this.editData.refNo);
      this.loyalCustForm.controls['homePhone'].setValue(this.editData.homePhone);
      this.loyalCustForm.controls['mobilePhone'].setValue(this.editData.mobilePhone);
      this.loyalCustForm.controls['custType'].setValue(this.editData.custType);
      this.loyalCustForm.controls['isIssued'].setValue(Number(this.editData.isIssued));
      this.loyalCustForm.controls['issueDate'].setValue(this.editData.issueDate);
      this.loyalCustForm.controls['creatDate'].setValue(this.editData.creatDate);
      this.loyalCustForm.controls['collectionType'].setValue(this.editData.collectionType);
      this.loyalCustForm.controls['appTime'].setValue(this.editData.appTime);
      this.loyalCustForm.controls['isPrint'].setValue(Boolean(this.editData.isPrint));
      this.loyalCustForm.controls['printTime'].setValue(this.editData.printTime);
      this.loyalCustForm.controls['email'].setValue(this.editData.email);
      this.loyalCustForm.controls['namePrintOnCard'].setValue(this.editData.namePrintOnCard);
      console.log(this.editData.isIssued);
    }
  }
  updateLoyalCust() {
    const loyalCustData = {
      cardNo: this.loyalCustForm.value.cardNo,
      custName: this.loyalCustForm.value.custName,
      add1: this.loyalCustForm.value.add1,
      add2: this.loyalCustForm.value.add2,
      add3: this.loyalCustForm.value.add3,
      refNo: this.loyalCustForm.value.refNo,
      homePhone: this.loyalCustForm.value.homePhone,
      mobilePhone: this.loyalCustForm.value.mobilePhone,
      custType: this.loyalCustForm.value.custType,
      isIssued: Number(this.loyalCustForm.value.isIssued),
      issueDate: this.loyalCustForm.value.issueDate,
      creatDate: this.loyalCustForm.value.creatDate,
      collectionType: this.loyalCustForm.value.collectionType,
      appTime: this.loyalCustForm.value.appTime,
      isPrint: Boolean(this.loyalCustForm.value.isPrint),
      printTime: this.loyalCustForm.value.printTime,
      email: this.loyalCustForm.value.email,
      namePrintOnCard: this.loyalCustForm.value.namePrintOnCard
    };
    this.api.updateLoyalCust(loyalCustData, this.editData.custID).subscribe({
      next: (res) => {
        alert("Loyal customer updated successfully..");
        this.loyalCustForm.reset();
        this.dialogRef.close('update');
      },
      error: (res) => {
        alert("Error while updating the customer");
      }
    })
  
  }
  addLoyalCust() {
    if (!this.editData) {
      if (this.loyalCustForm.valid) {
        const loyalCustData = {
          cardNo: this.loyalCustForm.value.cardNo,
          custName: this.loyalCustForm.value.custName,
          add1: this.loyalCustForm.value.add1,
          add2: this.loyalCustForm.value.add2,
          add3: this.loyalCustForm.value.add3,
          refNo: this.loyalCustForm.value.refNo,
          homePhone: this.loyalCustForm.value.homePhone,
          mobilePhone: this.loyalCustForm.value.mobilePhone,
          custType: this.loyalCustForm.value.custType,
          isIssued: Number(this.loyalCustForm.value.isIssued),
          issueDate: this.loyalCustForm.value.issueDate,
          creatDate: this.loyalCustForm.value.creatDate,
          collectionType: this.loyalCustForm.value.collectionType,
          appTime: this.loyalCustForm.value.appTime,
          isPrint: Boolean(this.loyalCustForm.value.isPrint),
          printTime: this.loyalCustForm.value.printTime,
          email: this.loyalCustForm.value.email,
          namePrintOnCard: this.loyalCustForm.value.namePrintOnCard
        };
  
        console.log(loyalCustData);
        this.api.addLoyalCust(loyalCustData).subscribe({
          next: (res) => {
            alert("Loyal Customer added successfully.");
            this.loyalCustForm.reset();
            this.dialogRef.close('save');
          },
          error: (res) => {
            alert("Error while adding the customer.");
          }
        });
      }
    } else {
      this.updateLoyalCust();
    }
  }


}
