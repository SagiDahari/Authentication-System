import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  form!: FormGroup; // Add non-null assertion operator.
  cls = ''; // For the alert message, css style.
  message = ''; // An according message.
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
    
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ''
    })
  }

  submit(): void {
    this.http.post('http://localhost:8000/api/forgot', this.form.getRawValue())
    .subscribe( () => {
      this.cls = 'success';
      this.message = 'An Email has been sent to you.';
    },
    () => {
      this.cls = 'danger';
      this.message = 'This Email is not linked to an existing account.';

    });
  }

}


