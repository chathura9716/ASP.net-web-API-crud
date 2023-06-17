import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ProCrud';
  displayedColumns: string[] = ['code', 'name','thumbnail', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService) { }
  ngOnInit(): void {
    //this.getAllPrograms();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '70%',
      height: '40%',

    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        //this.getAllPrograms();
      }
    })
  }

  getAllPrograms() {
    this.api.getProgram().subscribe({
      next: (res) => {
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
       // this.getAllPrograms();
      }
    })
  }

  deleteProgram(id: any) {
    this.api.deleteProgram(id).subscribe({
      next: (res) => {
        //this.getAllPrograms();
        alert("Program delete successfull");
      },
      error:()=>{
        alert("Error while deleting product");
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
