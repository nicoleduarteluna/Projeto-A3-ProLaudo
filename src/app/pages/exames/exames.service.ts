import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamesService {

  id: string = '';

  setId(id) {
    this.id = id;
  }

  url = 'http://localhost:5000/api/beneficiarios';

  constructor(private http: HttpClient) { }

  getExame() {
    return this.http.get(`${this.url}/${this.id}`);
  }

}
