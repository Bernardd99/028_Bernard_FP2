import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import { payments } from 'src/app/models/payment';
import { Input, EventEmitter } from '@angular/core';
import { TableComponent } from '../table/table.component';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(public paymentService: PaymentService, private table: TableComponent) { }
  @Input() paymentData: payments = {} as payments;
  @Input() refresh: any;

  // @Output() refreshEmitter = new EventEmitter<boolean>();
  // isrefresh: boolean = false;

  payments: payments[] = [];
  paymentId: number = 0;
  isEdit: boolean = false;

  // testRefresh(){
  //   this.refreshEmitter.emit(this.isrefresh)
  // }

  addPaymentForm = new FormGroup({
    paymentDetailId: new FormControl(0, [
    ]),
    cardOwnerName: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
      Validators.pattern("^([0-9]*)$")
    ]),
    securityCode: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
      Validators.pattern("^([0-9]*)$")
    ]),
    expirationDate: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
      Validators.pattern("^(0[1-9]|1[0-2])\/?([0-9]{2})$")
    ])
  })


  get paymentDetailId() {
    return this.addPaymentForm.get('paymentDetailId')
  }
  get cardOwnerName() {
    return this.addPaymentForm.get('cardOwnerName');
  }
  get cardNumber() {
    return this.addPaymentForm.get('cardNumber');
  }
  get securityCode() {
    return this.addPaymentForm.get('securityCode');
  }
  get expirationDate() {
    return this.addPaymentForm.get('expirationDate');
  }

  ngOnInit(): void {
    this.getPayments();
  }

  ngDoCheck(): void {
    if (Object.keys(this.paymentData).length > 0) {
      this.paymentId = this.paymentData.paymentDetailId;
      this.addPaymentForm.controls['paymentDetailId'].setValue(this.paymentData.paymentDetailId)
      this.addPaymentForm.controls['cardOwnerName'].setValue(this.paymentData.cardOwnerName);
      this.addPaymentForm.controls['cardNumber'].setValue(this.paymentData.cardNumber);
      this.addPaymentForm.controls['securityCode'].setValue(this.paymentData.securityCode);
      this.addPaymentForm.controls['expirationDate'].setValue(this.paymentData.expirationDate);
      this.isEdit = true;
      this.paymentData = {} as payments;
    }
  }

  submit() {
    if (this.isEdit == false) {
      this.addPayment();
    } else {
      this.updatePayment();
    }
  }

  addPayment() {
    this.paymentService.addPayment(this.addPaymentForm.value)
      .subscribe((res) => {
        if (res) {
          alert("Payment Data Has Been Added!")
          this.refresh;
          this.addPaymentForm.reset();
          this.table.getPayments();
          this.getPayments();
          location.reload();
        }
      })
  }


  getPayments() {
    this.paymentService.getPayments()
      .subscribe((res) => {
        this.payments = res;
      })
  }

  updatePayment() {
    this.paymentService.updatePayment(this.addPaymentForm.value, this.paymentId)
      .subscribe((res) => {
        if (res) {
          this.isEdit = false
          alert("Payment Data Has Been Updated!")
          this.addPaymentForm.reset();
          this.getPayments();
          this.table.ngOnInit();
          location.reload();
        }
      })
  }

}
