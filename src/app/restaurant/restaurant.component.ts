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
  image: any = false;

  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute) { }

  ngOnInit() {
// tslint:disable-next-line:max-line-length

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
        this.getImage(this.restaurant.image.url);

      }
    );
  }

  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    return blob;
 }

  getImage(path) {
 this.restaurantService.getImage(path).subscribe(
      (data) => {
       //  const imageBlob = this.dataURItoBlob(data);
       //  const imageFile = new File([imageBlob], 'restaurant_image', { type: 'image/jpeg' });
       //  console.log(imageFile);
    this.image = data;

      }
    );
  }







}
