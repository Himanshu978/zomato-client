import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from '../shared/restaurant.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
@Input() restaurantId: any;
reviews: any;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    if (this.restaurantId) {
      this.restaurantService.getReviews(this.restaurantId).subscribe(
        (res) => {
          this.reviews = res;
          console.log(this.reviews);
        }
      );
    }
  }

}
