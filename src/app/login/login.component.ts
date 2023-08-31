import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoLanguage } from '@po-ui/ng-components';
import { PoPageLoginLiterals } from '@po-ui/ng-templates';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authservice: AuthService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  languages: Array<PoLanguage> = [];

  literals: PoPageLoginLiterals = {
    loginHint: 'Insira seu e-mail ou usuário',
    registerUrl: 'Novo cadastro'
  };

  user: string = '';
  users: any[] = [];

  goToLogin(event) {
    this.authservice.checkLogin(event, this.users);
  }

  getUsers() {
    this.loginService.getUsers().subscribe((users: any) => {
      users.usuarios.forEach((user) => {
        this.users.push(user);
      });
    });
  }

}
