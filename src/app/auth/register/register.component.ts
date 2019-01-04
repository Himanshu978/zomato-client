import { Component, OnInit , AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControlName } from '@angular/forms';
import { CoreService } from 'src/app/core/core.service';
import { GenericValidator } from 'src/app/core/generic-validator';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit , AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errorMessage: string;
  registerForm: FormGroup;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  genericValidator: GenericValidator;

  states: any;
  districts: any;

  constructor(private  authService: AuthService,
     private coreService: CoreService,
     private fb: FormBuilder) {

      this.setValidationMessages();
      this.genericValidator = new GenericValidator(this.validationMessages);
    }

  ngOnInit() {
    this.registerForm =  this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      c_password: ['', Validators.required],
      phone: ['', Validators.required],
      age: ['', Validators.required],
      street_address: ['', Validators.required],
      state: ['', Validators.required],
      district_id: ['', Validators.required],
      zip: ['', Validators.required],
      type: ''
    });

    this.onChanges();
    this.getStates();

  }

  ngAfterViewInit(): void {

    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    merge(this.registerForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.registerForm);
    });

  }

  setValidationMessages() {
    this.validationMessages = {
      firstname: {
        required: 'Firtname name is required!',
        minlength: 'First name must be at least two characters long',
      //  maxlength: 'Product name cannot exceed 50 characters.'
      },
      lastname: {
        required: 'Lastname is required!',
        minlength: 'Last name must be at least two characters long',
      },
      email: {
        required: 'Email is required!',
        email: 'Invalid email.'
      },
      username: {
        required: 'Username is required!',
        minlength: 'username name must be at least 5 characters long',
        maxlength: 'Username must not exceed 20 characters limit.',
      },
      password: {
        required: 'Password is required!',
        minlength: 'Password must be at least 6 characters long',
      },
      c_password: {
        required: 'Please confirm your password!'
      },
      phone: {
        required: 'Please fill your phone number!'
      },
      age: {
        required: 'Age is required!'
      },
      street_address: {
        required: 'Pleas fill your street address'
      },
      state: {
        required: 'Pleas select a state!'
      },
      district_id: {
        required: 'Please select a district!'
      },
      zip: {
        required: 'Zip code is required!'
      }
    };
  }

  registerUser() {
    if (this.registerForm.valid) {

      this.authService.registerUser(this.registerForm.value).subscribe((res) => {
        console.log(res);
     });

    } else {
        this.errorMessage = 'Error message!';
        console.log(this.registerForm.errors);
    }

  }

  getStates() {

    this.coreService.getStates().subscribe(
      (res) => {
        this.states = res;
      });
  }

  getDistricts(stateId) {
    this.coreService.getDistricts(stateId).subscribe(
      (res) => {
        this.districts = res;
      });
  }

  onChanges(): void {
    this.registerForm.get('state').valueChanges.subscribe(id => {

      this.getDistricts(id);
    });
  }
}
