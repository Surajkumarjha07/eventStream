import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  url = "http://127.0.0.1:8000/user/signUp"

  sendData(data: {name: string | null,email: string | null, password: string | null}): Observable<any> {
    return this.http.post(this.url, data, this.httpOptions)
  }
  
}
