import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreService } from './core/core.service';
import { HomeComponent } from './home/home.component';
import { RestuarantsListComponent } from './restuarants-list/restuarants-list.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { WriteCommentComponent } from './write-comment/write-comment.component';
import { VoteComponent } from './vote/vote.component';
import { FoodsListComponent } from './foods-list/foods-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RestuarantsListComponent,
    RestaurantComponent,
    ReviewsComponent,
    AddReviewComponent,
    WriteCommentComponent,
    VoteComponent,
    FoodsListComponent,

  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    CoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
