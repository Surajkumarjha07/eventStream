import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  constructor(private http: HttpClient) { }

  deleteUser(email: string, password: string) {
    return this.http.delete(`http://127.0.0.1:8000/user/deleteUser?email=${email}&password=${password}`)
  }
}
