import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../_services/api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit{

  customerForm!: FormGroup;
  customerData! : any;
  editData: any;

  constructor(
    private formBilder: FormBuilder,
    private api: ApiService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.customerForm = this.formBilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      city: ['', [Validators.required]],
      // Add more form controls here
    });


    if(this.data.id!='' && this.data.id!= null){
      this.api.getCustomerById(this.data.id).subscribe(res => {
        this.editData = res;
        this.customerForm.setValue({name: this.editData.name, email: this.editData.email, mobile: this.editData.mobile, city: this.editData.city})
      })
    }
  }

  addCustomer(){
    if(this.customerForm.valid){
      const EditId = this.customerForm.getRawValue().id;
      if(EditId!='' && EditId!= null){
        this.api.updateCustomer(EditId, this.customerForm.getRawValue()).subscribe(res =>{
          this.closePopUp();
          this.getAllCustomers();
          alert("Updated Successfully")
        })
      }
      else{    
        this.api.saveCustomer(this.customerForm.value).subscribe(res =>{
          this.closePopUp();
          this.getAllCustomers();
          alert("added Successfully")
        })
      }
    }
  }

  getAllCustomers(){
    this.api.getAllCustomers().subscribe((res: any) => {
      this.customerData = res;
    })
  }


  closePopUp(){
    this.dialog.closeAll();
  }

}
