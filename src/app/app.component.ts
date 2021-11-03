import { Component } from '@angular/core';
import { Output } from '@angular/core';
import { payments } from './models/payment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'payment-app';

  paymentParent: payments = {} as payments

  shareData(payment: payments){
    this.paymentParent = payment
  }

}
