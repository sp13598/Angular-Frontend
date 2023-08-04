import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ApiService } from '../_services/api.service';
import { customerModel } from '../model/customerModel';
import {MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{

  public dataSource! : MatTableDataSource<customerModel>;
  public customerData! : customerModel[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['name', 'email', 'mobile', 'city', 'action'];

  constructor(
    private api: ApiService,  
    private dialog: MatDialog,
    ){}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.api.getAllCustomers().subscribe(res => {
      this.customerData = res;
      this.dataSource = new MatTableDataSource(this.customerData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openPopUp(id: any){
    this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
  }

  deleteCustomer(row: any){
    this.api.deleteCustomer(row.id).subscribe((res: any)=> {
      alert("customer Deleted")
      this.getCustomers(); 
    })
  } 

  editCustomer(id: any){
    this.openPopUp(id);
    
  }
 
}
