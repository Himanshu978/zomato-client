import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReviewService } from '../shared/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  @Input() restaurantId: any;
  reviewForm: FormGroup;
  errorMessage: any;

  constructor(private fb: FormBuilder, private reviewService: ReviewService) { }

  ngOnInit() {
    this.reviewForm = this.fb.group( {
      content: [ '', Validators.required],

    });
  }

  submitReview() {
    if (this.reviewForm.valid) {

      this.reviewService.submitReview(this.reviewForm.value, this.restaurantId).subscribe((res) => {
        console.log(res);
        this.errorMessage = '';
        this.reviewForm.reset();
        this.reviewForm.updateValueAndValidity();
     },
     (err) => {
       if (err.status === 403) {
        this.errorMessage = 'You have not placed any order from this place yet!';
       }

     }
     );

    }

  }

}
