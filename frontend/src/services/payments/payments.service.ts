import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application-json'
    })
  }

  sendData(price: number | null) {
    return this.http.post(`http://127.0.0.1:8000/payment?amount=${price}`,this.httpOptions)
  }

}
