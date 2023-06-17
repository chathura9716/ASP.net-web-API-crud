import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
 
  title = 'ProCrud';
  displayedColumns: string[] = ['id', 'name','email', 'phone','salary','department', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService) { }
  ngOnInit(): void {
    this.getAllPrograms();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '1500px',
      height: 'auto',

    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllPrograms();
      }
    })
  }

  getAllPrograms() {
    this.api.getProgram().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      },
      error: (err) => {
        alert("Error while getting programs!!!");
      }
    })
  }

  editProgram(row: any) {
    this.dialog.open(DialogComponent, {
      width: '70%',
      height: '40%',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
      this.getAllPrograms();
      }
    })
  }

  deleteProgram(id: any) {
    
    this.api.deleteProgram(id).subscribe({
      next: (res) => {
        this.getAllPrograms();
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
