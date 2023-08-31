import { Injectable } from '@angular/core';
import { PoComboOption } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastrarExamesService {
  beneficiarios: any[] = [];
  url = 'http://localhost:5000/api/beneficiarios';

  id: string = '';

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  constructor(private http: HttpClient) {}

  getFilteredData(param): Observable<PoComboOption[]> {
    this.beneficiarios = [];

    return this.http
      .get(this.url)
      .pipe(
        map((response: any) =>
          this.convertToArrayComboOption(response.beneficiarios)
        )
      );
  }

  getObjectByValue(value): Observable<PoComboOption> {
    this.beneficiarios = [];

    return this.http
      .get(this.url)
      .pipe(map((item) => this.convertToThfComboOption(item)));
  }

  private convertToArrayComboOption(items: any[]): PoComboOption[] {
    if (items && items.length > 0) {
      return items.map((item) => this.convertToThfComboOption(item));
    }

    return [];
  }

  private convertToThfComboOption(item: any): PoComboOption {
    item = item || {};

    this.beneficiarios.push(item);

    return {
      label: `${item.nome}, CPF: ${item.cpf}` || undefined,
      value: item.rg || undefined,
    };
  }

  getDadosBenef() {
    return this.http.get(`${this.url}/${this.id}`);
  }

  atualizarBeneficiario(dados) {
    return this.http.put(`http://localhost:5000/api/beneficiarios/${this.id}`, dados);
  }
}
