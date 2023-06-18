import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoyalCustServiceService } from '../loyal-cust-service.service';
import { LoyalCustDialogComponent } from '../loyal-cust-dialog/loyal-cust-dialog.component';

@Component({
  selector: 'app-loyal-cust-view-page',
  templateUrl: './loyal-cust-view-page.component.html',
  styleUrls: ['./loyal-cust-view-page.component.scss']
})
export class LoyalCustViewPageComponent implements OnInit {
 
  title = 'Loyal customers page';
  displayedColumns: string[] = ['CustID', 'CardNo','CustName', 'Add1','Add2','Add3','RefNo','HomePhone','MobilePhone','CustType','IsIssued','IssueDate','CreatDate','CollectionType','AppTime','IsPrint','PrintTime','Email','NamePrintOnCard', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: LoyalCustServiceService) { }
  ngOnInit(): void {
    this.getAllLoyalCust();
  }
  openDialog() {
    this.dialog.open(LoyalCustDialogComponent, {
      width: '1500px',
      height: 'auto',

    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllLoyalCust();
      }
    })
  }

  getAllLoyalCust() {
    this.api.getAllLoyalCust().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      },
      error: (err) => {
        alert("Error while getting all loyal customers!!!");
      }
    })
  }

  editLoyalCust(row: any) {
    this.dialog.open(LoyalCustDialogComponent, {
      width: '1500px',
      height: 'auto',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
      this.getAllLoyalCust();
      }
    })
  }

  deleteLoyalCust(id: any) {
    
    this.api.deleteLoyalCust(id).subscribe({
      next: (res) => {
        this.getAllLoyalCust();
        alert("Employee delete successfull");
      },
      error:()=>{
        alert("Error while deleting Employee");
      }

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
