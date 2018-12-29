import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from '../shared/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  @Input() restaurant: any;
  @Input() wait = true;

  sub: Subscription;

  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute) { }

  ngOnInit() {

 // Read the Restaurant Id from the route parameter
 this.sub = this.route.paramMap.subscribe(
  params => {
    if (params.get('id')) {
      const id = +params.get('id');
      this.getRestaurant(id);
    }

  }
);

  // this.getTweet();
  // console.log(this.wait);
  if (this.wait) {
  //  this.restaurant = this.route.snapshot.data['restaurant'];
  }

 // console.log(this.tweet);
  }



  getRestaurant(id) {
    this.restaurantService.getRestaurant(id).subscribe(
      (data) => {
        this.restaurant = data;
      //  this.displayTweet();
      }
    );

  }





}
