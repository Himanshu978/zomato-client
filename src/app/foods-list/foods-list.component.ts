import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../shared/restaurant.service';

@Component({
  selector: 'app-foods-list',
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.scss']
})
export class FoodsListComponent implements OnInit {

  sub: Subscription;
  restaurant: any;
  orderList: any = [];
  totalPrice: any;
  order: any = {};

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService) { }

  ngOnInit() {
    // Read the Restaurant Id from the route parameter
  this.sub = this.route.paramMap.subscribe(
  params => {
    if (params.get('id')) {
      const id = +params.get('id');
      this.getFoods(id);
    }

  });
  }

  getFoods(id) {
    this.restaurantService.getFoods(id).subscribe(
      (data) => {
        this.restaurant = data;
      }
    );
  }

  addFood(index) {
    const item = this.restaurant.foods[index];
    item.qty = 1;
    this.orderList.push(item);
    this.calculateTotalPrice();

  }

  decreaseQty(index) {
    --this.orderList[index].qty;
    if (this.orderList[index].qty === 0) {
      this.orderList.splice(index, 1);
    }
    this.calculateTotalPrice();
  }

  increaseQty(index) {
    ++this.orderList[index].qty;
    this.calculateTotalPrice();
  }

  calculateTotalPrice () {
    this.totalPrice = 0;
    this.orderList.map(
      (item) => {
        this.totalPrice += item.price * item.qty;
      }
    );

  }

  placeOrder() {
    if (this.orderList.length) {

      this.order.restaurant_id = this.restaurant.id;
      this.order.price = this.totalPrice;
      const foods = [];

      this.orderList.map(
        (item) => {
          foods.push({
            food_id: item.id,
            qty: item.qty
          });
        }
      );

      this.order.orderedFoods = foods;

        this.restaurantService.placeOrder(this.order).subscribe(
          () => {

          }
        );

    }
  }

}
