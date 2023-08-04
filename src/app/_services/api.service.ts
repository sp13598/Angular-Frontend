import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { customerModel } from '../model/customerModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

  saveCustomer(customerForm: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/customers`, customerForm);
  }

  getAllCustomers(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/customers`);
  }

  getCustomerById(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/customers/${id}`);
  }

  updateCustomer(id: any, customerData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/customers/${id}`, customerData);
  }

  deleteCustomer(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/customers/${id}`);
  }
  
}
