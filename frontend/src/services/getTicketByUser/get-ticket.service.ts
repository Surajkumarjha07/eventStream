import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetTicketService {

  constructor(private http: HttpClient) { }

  getTicketByUser(email: string | null) {
    return this.http.get(`http://127.0.0.1:8000/events/getTickets?email=${email}`)
  }

}
