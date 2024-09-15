import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteEventCreatedService {

  constructor(private http: HttpClient) { }

  deleteEvent(email: string | null, title: string | null) {
    return this.http.delete(`http://127.0.0.1:8000/events/deleteEventCreated?email=${email}&title=${title}`)
  }

}
