import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  createEvents(formData: FormData) {
    return this.http.post('http://127.0.0.1:8000/events/createEvent', formData) 
  }

  deleteEventBooked(email: string | null, title: string | null) {
    return this.http.delete(`http://127.0.0.1:8000/events/deleteEventBooked?email=${email}&title=${title}`)
  }

  deleteEventCreated(email: string | null, title: string | null) {
    return this.http.delete(`http://127.0.0.1:8000/events/deleteEventCreated?email=${email}&title=${title}`)
  }

  getallEvents() {
    return this.http.get('http://127.0.0.1:8000/events/allEvents')
  }

  getCreatedEventsByUser(email: string | null) {
    return this.http.get(`http://127.0.0.1:8000/events/CreatedEvents?email=${email}`)
  }

  getEventsByCategory(category: string | null) {
    return this.http.get(`http://127.0.0.1:8000/events/specificEvent?category=${category}`)
  }

  getEventsByTitle(title: string) {
    return this.http.get(`http://127.0.0.1:8000/events/geteventBytitle?title=${title}`)
  }

}
