import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  bookTicket(email: string | null, eventName: string | null, date: string | null) {
    return this.http.post(`http://127.0.0.1:8000/events/bookTicket?email=${email}&eventName=${eventName}&date=${date}`, this.httpOptions)
  }

  getTicketByUser(email: string | null) {
    return this.http.get(`http://127.0.0.1:8000/events/getTickets?email=${email}`)
  }

}
