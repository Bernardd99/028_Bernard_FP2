import { Component, OnInit } from '@angular/core';
import { payments } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(public paymentService: PaymentService) { }

  @Output() FormEmitter = new EventEmitter<payments>();
  @Output() refreshEmitter = new EventEmitter<any>();


  onPayment: payments = {} as payments
  payments: payments[] = [];
  paymentId: number = 0;
  cardOwnerName: string = '';

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments() {
    this.paymentService.getPayments()
      .subscribe((res) => {
        this.payments = res;
      })
  }

  deletePayment() {
    this.paymentService.deletePayment(this.paymentId).
      subscribe((res) => {
        alert("Payment Data Has Been Deleted")
        let closeModal = document.getElementById('closeDelete')
        closeModal?.click();
        this.getPayments();
      })
  }

  confirmDelete(paymentDetailId: number, cardOwnerName: string) {
    this.paymentId = paymentDetailId
    this.cardOwnerName = cardOwnerName

  }

  onForm(payment: payments) {
    this.onPayment = payment;
    this.FormEmitter.emit(this.onPayment)
  }

  test() {
    this.refreshEmitter.emit(this.ngOnInit())
  }
}
