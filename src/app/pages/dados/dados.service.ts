import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  id: string = '';

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  url = 'http://localhost:5000/api/beneficiarios';

  constructor(private http: HttpClient) { }

  getDadosBenef() {
    return this.http.get(`${this.url}/${this.id}`);
  }

  atualizarBeneficiario(dados) {
    return this.http.put(`http://localhost:5000/api/beneficiarios/${this.id}`, dados);
  }

}
