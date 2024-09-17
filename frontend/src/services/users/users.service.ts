import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  login(email: string | null, password: string | null): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/user/login?email=${email}&password=${password}`,this.httpOptions)
  }

  signUp(data: {name: string | null,email: string | null, password: string | null}): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/user/signUp', data, this.httpOptions)
  }

  updateEmail(email: string, newEmail: string, password: string) {
    return this.http.put(`http://127.0.0.1:8000/user/updateEmail?email=${email}&newEmail=${newEmail}&password=${password}`,this.httpOptions)
  }

  updateInfo(email: string, newName: string, newPassword: string, currentPassword: string) {
    return this.http.put(`http://127.0.0.1:8000/user/updateUser?email=${email}&newName=${newName}&newPassword=${newPassword}&currentPassword=${currentPassword}`, this.httpOptions)
  }

  deleteUser(email: string, password: string) {
    return this.http.delete(`http://127.0.0.1:8000/user/deleteUser?email=${email}&password=${password}`)
  }

}
