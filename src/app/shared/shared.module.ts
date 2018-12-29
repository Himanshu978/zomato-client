import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from './restaurant.service';
import { CommentService } from './comment.service';
import { ReviewService } from './review.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RestaurantService,
    CommentService,
    ReviewService
  ]
})
export class SharedModule { }
