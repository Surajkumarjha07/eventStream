import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetEventsService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('http://127.0.0.1:8000/events/allEvents')
  }
}
