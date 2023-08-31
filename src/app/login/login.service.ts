import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost:5000/api/usuarios'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.url);
  }
}
