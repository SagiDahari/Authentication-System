import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
      email: '',
      password: '',
    })
  }

  submit(): void {
    this.http.post('http://localhost:8000/api/login', this.form.getRawValue())
    .subscribe( () => this.router.navigate(['/']),
          (error) => {
            this.cls = 'danger';
            this.message = error.error.message || 'An error occurred. Please try again.';
          });
  }

}

