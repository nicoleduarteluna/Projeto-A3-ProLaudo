import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getExames() {
    return this.http.get('http://localhost:5000/api/beneficiarios');
  }

  getUsers(user) {
    return this.http.get(`http://localhost:5000/api/usuarios/${user}`);
  }

}
