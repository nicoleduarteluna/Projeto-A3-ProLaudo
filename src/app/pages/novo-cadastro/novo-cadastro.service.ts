import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NovoCadastroService {

  url = '';

  setUrl(url: string) {
    this.url = url;
  }

  constructor(private http: HttpClient) { }

  postUser(usuario: any) {
    let headers = new HttpHeaders();

    headers = headers.append("X-PO-No-Error", "true");

    return this.http
      .post(this.url, usuario, {
        headers,
      });
  }

  createUsuario(url, usuario: any) {
    let headers = new HttpHeaders();

    headers = headers.append("X-PO-No-Error", "true");

    return this.http
      .post(url, usuario, {
        headers,
      });
  }
}
