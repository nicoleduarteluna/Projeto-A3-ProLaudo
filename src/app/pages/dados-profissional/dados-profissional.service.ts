import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DadosProfissionalService {
  id: string = '';

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  url = 'http://localhost:5000/api/profissionais';

  constructor(private http: HttpClient) {}

  getDadosBenef() {
    return this.http.get(`${this.url}/${this.id}`);
  }

  atualizarProfissional(usuario) {
    return this.http.put(`http://localhost:5000/api/profissionais/${this.id}`, usuario);
  }
}
