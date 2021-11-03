import { Injectable } from '@angular/core';
import { payments } from '../models/payment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // paymentData !: payments 

  endpoint: string = `https://paymentapiangular.herokuapp.com/api/PaymentDetail`

  constructor(private http: HttpClient) { }

  addPayment(payments: payments): Observable<any> {
    const api = `${this.endpoint}`;
    return this.http.post(api, payments).pipe(
      catchError(this.handleError)
    )
  }

  getPayments(): Observable<any>{
    const api = `${this.endpoint}`;
    return this.http.get(api).pipe(
      catchError(this.handleError)
    )
  }

  deletePayment(id: number): Observable<any>{
    const api = `${this.endpoint}/${id}`;
    return this.http.delete(api).pipe(
      catchError(this.handleError)
    )
  }

  updatePayment(payments: payments, id: number): Observable<any>{
    const api =`${this.endpoint}/${id}`;
    return this.http.put(api, payments).pipe(
      catchError(this.handleError)
    )
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      return throwError(err.error.message)
    } else {
      return throwError(`Server-side error code: ${err.status}\nMessage: ${err.message}`)
    }
  }
}
