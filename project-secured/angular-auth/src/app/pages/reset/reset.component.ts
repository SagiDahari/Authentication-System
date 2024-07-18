import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
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
      password: '',
      password_confirmed: '',
    })
  }

  submit(): void {

    const formData = this.form.getRawValue();

    const data = {
      token: this.route.snapshot.params['token'],
      password: formData.password,
      password_confirmed: formData.password_confirmed,
    }

    this.http.post('http://localhost:8000/api/reset', data)
    .subscribe( () => {
      this.cls = 'success';
      this.message = 'Your password has been changed';
      this.router.navigate(['/password-reset-success']);
    }, (error) => {
      if (error.error.message == "Token has expired!") {
        this.router.navigate(['/password-reset-expired']);
      }
      else {
        this.cls = 'danger';
      this.message = error.error.message || 'An error occurred. Please try again.';
      } 
    });
  }

}

