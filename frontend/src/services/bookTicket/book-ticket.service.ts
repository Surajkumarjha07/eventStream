import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookTicketService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }

  bookTicket(email: string | null, eventName: string | null, date: string | null) {
    return this.http.post(`http://127.0.0.1:8000/events/bookTicket?email=${email}&eventName=${eventName}&date=${date}`, this.httpOptions)
  }

}
