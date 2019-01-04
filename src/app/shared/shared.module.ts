import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from './restaurant.service';
import { CommentService } from './comment.service';
import { ReviewService } from './review.service';
import { VotingService } from './voting.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RestaurantService,
    CommentService,
    ReviewService,
    VotingService
  ]
})
export class SharedModule { }
