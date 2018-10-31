import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "../restaurants/restaurants.service";
import { OrderService } from "../order/order.service";

@NgModule({
    providers: [ShoppingCartService
        , RestaurantsService
        , OrderService
    ]
})
export class CoreModule{
}