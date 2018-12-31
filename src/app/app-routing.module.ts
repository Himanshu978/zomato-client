import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { FoodsListComponent } from './foods-list/foods-list.component';

const routes: Routes = [
 // { path: 'tweets', loadChildren: () => TweetModule },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'restaurants/:id', component: RestaurantComponent },
  { path: 'restaurants/:id/foods', component: FoodsListComponent },
  { path: 'orders', component: OrderComponent }
 // { path: '404', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
