import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateEventService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  url = 'http://127.0.0.1:8000/events/createEvent'

  sendData(data: {event_creator: string | null, title: string | null, category: string | null, date: string | null, start_time: string | null, end_time: string | null, type: string | null, location: string | null, building: string | null, region: string | null, venue: string | null, price: number | null, capacity: number | null}) {
    return this.http.post(this.url, data, this.httpOptions) 
  }
}
