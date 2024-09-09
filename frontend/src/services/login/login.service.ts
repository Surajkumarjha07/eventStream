import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  sendData(email: string | null, password: string | null): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/user/login?email=${email}&password=${password}`,this.httpOptions)
  }
}
