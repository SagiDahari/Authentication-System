import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-code',
  templateUrl: './reset-code.component.html',
  styleUrls: ['./reset-code.component.css']
})
export class ResetCodeComponent implements OnInit {
  form!: FormGroup; // Add non-null assertion operator.
  message = '';
  cls = '';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: ''
    })
  }

  submit(): void {

    const formData = this.form.getRawValue();

    const data = {
      token: this.route.snapshot.params['token'],
      code: formData.code
    }
    this.http.post('http://localhost:8000/api/reset-code', data)
    .subscribe( () => {
      this.cls = 'success';
      this.router.navigate([`/reset/${data['token']}`]);
    }, (error) => {
      this.cls = 'danger';
      this.message = error.error.message || 'An error occurred. Please try again.';
    });
  }

}

