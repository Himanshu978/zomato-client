import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../shared/restaurant.service';

@Component({
  selector: 'app-restuarants-list',
  templateUrl: './restuarants-list.component.html',
  styleUrls: ['./restuarants-list.component.scss']
})
export class RestuarantsListComponent implements OnInit {

  restaurants: any;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.getAllRestaurants();
  }


  getAllRestaurants() {
    this.restaurantService.getAllRestuarnats().subscribe(
      (res) => {
        this.restaurants = res;
      }
      );
  }
}
