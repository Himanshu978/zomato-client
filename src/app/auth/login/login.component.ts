import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { GenericValidator } from 'src/app/core/generic-validator';
import { merge, Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  loginForm: FormGroup;
  errorMessage: string;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) {

    this.setValidationMessages();
    this.genericValidator = new GenericValidator(this.validationMessages);

   }

  ngOnInit() {
    this.loginForm = this.fb.group( {
      email: [ '', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }


 loginUser() {

  if ( this.loginForm.valid ) {

    return this.authService.login(this.loginForm.value).subscribe(
      (res) => {
          if (res.hasOwnProperty('success')) {
            console.log('Login Successful!');
             this.errorMessage = '';
             window.localStorage.setItem('token', res.success.token);
             window.localStorage.setItem('userInfo', JSON.stringify(res.success.user));
             this.route.navigate(['/home']);
          }
      },
      (err) => {
      if (err.status === 401) {
        console.log('ad');
        this.errorMessage = 'Login failed';
      }
      }
    );

  }


 }




 ngAfterViewInit(): void {

  // Watch for the blur event from any input element on the form.
  const controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

  // Merge the blur event observable with the valueChanges observable
  merge(this.loginForm.valueChanges, ...controlBlurs).pipe(
    debounceTime(800)
  ).subscribe(value => {
    this.displayMessage = this.genericValidator.processMessages(this.loginForm);
  });

}

 setValidationMessages() {
  this.validationMessages = {
    email: {
      required: 'Email is required!',
      email: 'Invalid email.'
    },
    password: {
      required: 'Password is required!',
      minlength: 'Password must be at least 6 characters long',
    }

  };
}


}
