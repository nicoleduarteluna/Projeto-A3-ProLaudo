import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/util/notification.service';
import { NovoCadastroService } from './novo-cadastro.service';

@Component({
  selector: 'app-novo-cadastro',
  templateUrl: './novo-cadastro.component.html',
  styleUrls: ['./novo-cadastro.component.css'],
})
export class NovoCadastroComponent implements OnInit {
  menuItemSelected: string = 'Cadastro de Usuários';

  nomeCompleto: string = '';
  dataNascimento: string = '';
  cpf: string = '';
  rg: string = '';
  email: string = '';
  telefone: string = '';

  siglaConselho: string = '';
  numeroConselho: string = '';
  ufConselho: string = '';

  nomeUsuario: string = '';
  senhaUsuario: string = '';

  tipoUsuario: string = '';

  profissionalForm = {};
  beneficiarioForm = {};
  userForm = {};

  constructor(
    private novoCadatroService: NovoCadastroService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    // const nav = this.router.getCurrentNavigation().extras.state;
    // this.menuItemSelected = nav.menu;
  }

  ngOnInit(): void {}

  updateForm(event) {
    this.tipoUsuario = event;
    if (event == 'medico') {
      this.novoCadatroService.setUrl('http://localhost:5000/api/profissionais');
    } else {
      this.novoCadatroService.setUrl('http://localhost:5000/api/beneficiarios');
    }
  }

  postInfo() {
    if (this.tipoUsuario == 'medico') {
      if (
        !this.nomeCompleto ||
        !this.nomeUsuario ||
        !this.siglaConselho ||
        !this.numeroConselho ||
        !this.ufConselho
      ) {
        this.notificationService.warning(
          'É necessário preencher todos os campos!'
        );
      } else {
        this.postUsuario();
        this.createUsuario();
        this.router.navigate(['/login']);
      }
    } else {
      if (
        !this.nomeUsuario ||
        !this.nomeCompleto ||
        !this.dataNascimento ||
        !this.cpf ||
        !this.rg ||
        !this.telefone ||
        !this.email
      ) {
        this.notificationService.warning(
          'É necessário preencher todos os campos!'
        );
      } else {
        this.postUsuario();
        this.createUsuario();
        this.router.navigate(['/login']);
      }
    }
  }

  postUsuario() {
    let usuario;

    this.profissionalForm = {
      user: this.nomeUsuario,
      nome: this.nomeCompleto,
      siglaConselho: this.siglaConselho,
      numeroConselho: this.numeroConselho,
      estadoConselho: this.ufConselho,
    };

    this.beneficiarioForm = {
      nome: this.nomeCompleto,
      dataNascimento: this.dataNascimento,
      cpf: this.cpf,
      rg: this.rg,
      email: this.email,
      telefone: this.telefone,
    };

    if (this.tipoUsuario == 'medico') {
      usuario = this.profissionalForm;
    } else {
      usuario = this.beneficiarioForm;
    }

    this.novoCadatroService.postUser(usuario).subscribe({
      next: (data: any) => {
        this.notificationService.success('Usuário incluído com sucesso!');
      },
      error: (err) => {
        this.notificationService.error('Erro ao incluir profissional!');
      },
    });
  }

  createUsuario() {
    this.userForm = {
      user: this.nomeUsuario,
      password: this.senhaUsuario,
      type: this.tipoUsuario,
      rg: this.rg
    };

    this.novoCadatroService
      .createUsuario('http://localhost:5000/api/usuarios', this.userForm)
      .subscribe({
        next: (data: any) => {
          console.log('Usuário inserido no banco');
        },
        error: (err) => {
          console.log('Erro ao inserir usuário no banco');
        },
      });
  }
}
