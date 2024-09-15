import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetCreatedEventsByUserService {

  constructor(private http: HttpClient) { }

  getCreatedEvents(email: string | null) {
    return this.http.get(`http://127.0.0.1:8000/events/CreatedEvents?email=${email}`)
  }
}
