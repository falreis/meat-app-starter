import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';

import {tap} from 'rxjs/operators'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    {label: "Dinheiro", value: "MON"},
    {label: "Débito", value: "DEB"},
    {label: "Crédito", value: "CRE"}
  ]

  orderForm: FormGroup

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/

  orderId: string

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.orderForm = new FormGroup({
        name: new FormControl(''
          , {validators: [Validators.required, Validators.minLength(5)]
        }),
        email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
        emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
        address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
        optionalAddress: this.formBuilder.control(''),
        paymentOption: this.formBuilder.control('', [Validators.required])
      }, 
      {validators: [OrderComponent.equalsTo], updateOn: 'blur' }
    )
  }

  static equalsTo(group: AbstractControl): {[key: string]: boolean}{
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    if(!email || !emailConfirmation){
      return undefined
    }
    else{
      if(email.value !== emailConfirmation.value){
        return {emailsNotMatch:true}
      }
    }
    return undefined
  }

  ngOnInit() {
  }

  itemsValue(): number{
    return this.orderService.itemsValue()
  }

  cartItems(){
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem){
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem){
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem){
    this.orderService.remove(item)
  }

  isOrderCompleted():boolean{
    return this.orderId !== undefined
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems()
      .map((item:CartItem)=> new OrderItem(item.quantity, item.menuItem.id))

    this.orderService.checkOrder(order)
      .pipe(
        tap((orderId: string) => {this.orderId = orderId})
      )
      .subscribe((orderId: string) => { 
        this.router.navigate(['/order-summary'])
        console.log(`Compra concluída: ${orderId}`)
        this.orderService.clear()
      })

    Router

    console.log(order)
  }
}
