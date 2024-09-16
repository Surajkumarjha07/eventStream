import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateEmailService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  updateEmail(email: string, newEmail: string, password: string) {
    return this.http.put(`http://127.0.0.1:8000/user/updateEmail?email=${email}&newEmail=${newEmail}&password=${password}`,this.httpOptions)
  }

}
