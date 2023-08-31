import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoModalAction, PoModalComponent, PoUploadLiterals } from '@po-ui/ng-components';
import { NotificationService } from 'src/app/util/notification.service';
import { CadastrarExamesService } from './cadastrar-exames.service';

@Component({
  selector: 'app-cadastrar-exames',
  templateUrl: './cadastrar-exames.component.html',
  styleUrls: ['./cadastrar-exames.component.css'],
})
export class CadastrarExamesComponent implements OnInit {
  customLiterals: PoUploadLiterals = {
    startSending: 'Salvar exame',
    sentWithSuccess: 'Exame salvo com sucesso',
  };

  menuItemSelected: string = '';

  nomeExame: string = '';
  dataExecucao: string = '';

  exames = [];

  nomeCompleto: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  email: string;
  telefone: string;

  beneficiarioForm = {};

  showButton: boolean = false;

  @ViewChild('modalCadastroExame') modalCadastroExame: PoModalComponent;

  primaryAction: PoModalAction = {
    action: () => {
      if (this.nomeExame && this.dataExecucao) {
        this.cadastrarExame();
        this.modalCadastroExame.close();
        this.router.navigate(['/home']);
      } else {
        this.notificationService.warning('Preencha todos os campos!');
        this.modalCadastroExame.close();
      }

    },
    label: 'Confirmar',
  };

  secondaryAction: PoModalAction = {
    action: () => {
      this.modalCadastroExame.close();
    },
    label: 'Cancelar',
  };

  constructor(
    private router: Router,
    public cadastrarExamesService: CadastrarExamesService,
    private notificationService: NotificationService
  ) {
    const nav = this.router.getCurrentNavigation().extras.state;
    this.menuItemSelected = nav.menu;
  }

  ngOnInit(): void {}

  onChangeBenef(event) {
    this.cadastrarExamesService.setId(event);
    this.getDadosBenef();
  }

  getDadosBenef() {
    this.cadastrarExamesService.getDadosBenef().subscribe((dadosBenef: any) => {
      this.nomeCompleto = dadosBenef.beneficiarios.nome;
      this.dataNascimento = dadosBenef.beneficiarios.dataNascimento;
      this.cpf = dadosBenef.beneficiarios.cpf;
      this.rg = dadosBenef.beneficiarios.rg;
      this.email = dadosBenef.beneficiarios.email;
      this.telefone = dadosBenef.beneficiarios.telefone;

      dadosBenef.beneficiarios.exames.forEach(exame => {
        this.exames.push({
          nomeExame: exame.nomeExame,
          dataExecucao: exame.dataExecucao,
          statusLaudo: exame.statusLaudo,
          laudo: exame.laudo
        })
      });

    });
  }

  cadastrarExame() {

    this.exames.push({
      nomeExame: this.nomeExame,
      dataExecucao: this.dataExecucao,
      statusLaudo: 'A Laudar',
      laudo: ''
    });

    this.beneficiarioForm = {
      rg: this.rg,
      nome: this.nomeCompleto,
      dataNascimento: this.dataNascimento,
      cpf: this.cpf,
      email: this.email,
      telefone: this.telefone,
      exames: this.exames
    };

    this.cadastrarExamesService
      .atualizarBeneficiario(this.beneficiarioForm)
      .subscribe((res) => {
        this.notificationService.success(`Exame ${this.nomeExame} cadastrado com sucesso!`);
      });
  }

  openModal() {
    this.modalCadastroExame.open();
  }

  showBtn() {
    this.showButton = true;
  }
}
