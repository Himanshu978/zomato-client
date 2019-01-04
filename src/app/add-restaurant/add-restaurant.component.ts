import { Component, OnInit, ElementRef, AfterViewInit, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CoreService } from '../core/core.service';
import { GenericValidator } from '../core/generic-validator';
import { RestaurantService } from '../shared/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss']
})
export class AddRestaurantComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  selectedFile: File;
  restaurantForm: FormGroup;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  genericValidator: GenericValidator;

  states: any;
  districts: any;

  fileToUpload: File = null;

  constructor(private fb: FormBuilder,
    private coreService: CoreService,
    private resturantService: RestaurantService,
    private cd: ChangeDetectorRef) {

      this.setValidationMessages();
      this.genericValidator = new GenericValidator(this.validationMessages);
    }

  ngOnInit() {
    this.restaurantForm =  this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      opening: ['', [Validators.required]],
      closing: ['', Validators.required],
      phone: ['', Validators.required],
      street_address: ['', Validators.required],
      state: ['', Validators.required],
      district_id: ['', Validators.required],
      zip: ['', Validators.required],
      image: ''
    });

    this.onChanges();
    this.getStates();

  }

  setValidationMessages() {
    this.validationMessages = {
      name: {
        required: 'Restaurant name is required!',
        minlength: 'Restaurant name must be at least two characters long',
      //  maxlength: 'Product name cannot exceed 50 characters.'
      },
      description: {
        required: 'Description is required!',
        minlength: 'Description name must be at least two characters long',
      },
      phone: {
        required: 'Please fill phone number!'
      },
      opening: {
        required: 'Opening time is required!'
      },
      closing: {
        required: 'Closing time is required!'
      },
      street_address: {
        required: 'Pleas fill street address'
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

  ngAfterViewInit(): void {

    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    merge(this.restaurantForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.restaurantForm);
      console.log(this.displayMessage);
      console.log(this.restaurantForm.valid);
    });

  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onFileChanged(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.restaurantForm.patchValue({
          image: reader.result
       });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  addRestaurant(restautantData) {
    console.log(this.restaurantForm.value);

    this.resturantService.addRestauarant(this.restaurantForm.value).subscribe(
      (res) => {
        console.log(res);
      }
    );

    if ( this.restaurantForm.valid ) {


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
    this.restaurantForm.get('state').valueChanges.subscribe(id => {
      this.getDistricts(id);
    });
  }

}
