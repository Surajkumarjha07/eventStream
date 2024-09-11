import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecificEventService {

  constructor(private http: HttpClient) { }

  getData(category: string | null) {
    return this.http.get(`http://127.0.0.1:8000/events/specificEvent?category=${category}`)
  }

}
