import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  CreateLikes(name: string, email: string, likedEvents: string) {
    return this.http.post(`http://127.0.0.1:8000/events/likes?name=${name}&email=${email}&likedEvent=${likedEvents}`,this.httpOptions)
  }

  getLikes(email: string) {
    return this.http.get(`http://127.0.0.1:8000/events/getLikes?email=${email}`)
  }

  deleteLike(email: string, title: string) {
    return this.http.delete(`http://127.0.0.1:8000/events/deleteLikes?email=${email}&title=${title}`)
  }

}
