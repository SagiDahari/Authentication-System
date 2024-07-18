import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup; // Add non-null assertion operator.
  cls = '';
  message = '';
    constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmed: '',
    })
  }

  submit(): void {
    this.http.post('http://localhost:8000/api/register', this.form.getRawValue())
    .subscribe( () => this.router.navigate(['/login']),
  (error) => {this.cls = 'danger';
    this.message = error.error.message || 'An error occurred. Please try again.'; });
  }

}
