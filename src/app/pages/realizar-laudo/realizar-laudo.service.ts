import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RealizarLaudoService {

  id: string = '';

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  url = 'http://localhost:5000/api/beneficiarios';

  constructor(private http: HttpClient) { }

  atualizarBeneficiario(dados) {
    return this.http.put(`http://localhost:5000/api/beneficiarios/${this.id}`, dados);
  }

}
