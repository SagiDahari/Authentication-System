import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Auth } from 'src/app/classes/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  message = '';
  cls = '';
  alertMessage = '';
  customers: any[] = [];
  auth = false;
  showCustomers = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      idNumber: '',
      first_name: '',
      last_name: ''
    });

    this.http.get("http://localhost:8000/api/user")
    .subscribe(
      ( user: any ) => {
        this.message = `Welcome ${user.first_name} ${user.last_name}`;
        this.auth = true;
        Auth.authEmitter.emit(true);
      },
      () => {
        this.message = 'You are not logged in.';
        Auth.authEmitter.emit(false);
      }
    )
  }

    loadCustomers(): void {
    this.http.get<any[]>('http://localhost:8000/api/customer')
      .subscribe(customers => this.customers = customers);

    }

    addCustomer(): void {
      this.http.post('http://localhost:8000/api/customer', this.form.getRawValue())
        .subscribe(() => {
          this.cls = 'success'
          this.alertMessage = 'A customer has been added'
          this.toggleShowCustomers(); // Refresh the customer list after adding a new customer
        }, (error) => {
          this.cls = 'danger';
          this.alertMessage = error.error.message;
        });
    }

    toggleShowCustomers(): void {
      this.showCustomers = !this.showCustomers;
      if (this.showCustomers) {
        this.loadCustomers(); // Load customers only when displaying them
      }
    }
}
