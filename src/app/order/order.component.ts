import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../shared/restaurant.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders: any;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.getOrders();
  }


  getOrders() {
    this.restaurantService.getOrders().subscribe(
      (res) => {
        this.orders = res;

          this.orders.orders.map((order) => {
            order.price = 0;
            order.ordered_foods.map(
              (food) => {
                order.price +=  food.qty * food.food.price;
              }
            );
          });

      }
      );
  }
}
