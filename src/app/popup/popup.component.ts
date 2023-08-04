import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../_services/api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { customerModel } from '../model/customerModel';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit{

  customerForm!: FormGroup;
  customerData! : any;
  editData: any;
  showAdd! : boolean;
  showUpdate!: boolean;
  customerModelObj : customerModel = new customerModel();

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

  clickAddCustomer(){
    this.customerForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  addCustomer(){
    if(this.customerForm.valid){
      this.api.saveCustomer(this.customerForm.value).subscribe(res =>{
        this.closePopUp();
        this.getAllCustomers();
        alert("added Successfully")
      })
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

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.customerData.id = row.id;
    this.customerForm.controls['name'].setValue(row.name)
    this.customerForm.controls['email'].setValue(row.email)
    this.customerForm.controls['mobile'].setValue(row.mobile)
    this.customerForm.controls['city'].setValue(row.city)
  }
  
  updateCustomerDetails(){
    this.customerModelObj.name = this.customerForm.value.name;
    this.customerModelObj.email = this.customerForm.value.email;
    this.customerModelObj.mobile = this.customerForm.value.mobile;
    this.customerModelObj.city = this.customerForm.value.city;
  
    this.api.updateCustomer(this.customerModelObj.id, this.customerModelObj).subscribe(res => {
      alert("Customer Updated Successfully...")
      this.customerForm.reset();
      let ref = document.getElementById('cancel')
      ref?.click()
      this.getAllCustomers() 
    })
  }

}
