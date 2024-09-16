import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateInfoService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  updateInfo(email: string, newName: string, newPassword: string, currentPassword: string) {
    return this.http.put(`http://127.0.0.1:8000/user/updateUser?email=${email}&newName=${newName}&newPassword=${newPassword}&currentPassword=${currentPassword}`, this.httpOptions)
  }

}
