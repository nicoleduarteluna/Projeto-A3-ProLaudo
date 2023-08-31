import { Component, OnInit, ViewChild } from '@angular/core';
import { DadosProfissionalService } from './dados-profissional.service';
import { Router } from '@angular/router';
import { PoModalAction, PoModalComponent } from '@po-ui/ng-components';
import { NotificationService } from 'src/app/util/notification.service';

@Component({
  selector: 'app-dados-profissional',
  templateUrl: './dados-profissional.component.html',
  styleUrls: ['./dados-profissional.component.css'],
})
export class DadosProfissionalComponent implements OnInit {
  menuItemSelected: string = '';
  nomeCompleto: string;
  siglaConselho: string;
  numeroConselho: string;
  ufConselho: string;

  usuarioForm = {};

  @ViewChild('modalUpdate') modalUpdate: PoModalComponent;

  primaryAction: PoModalAction = {
    action: () => {
      this.alterarDados();
      this.modalUpdate.close();
    },
    label: 'Confirmar',
  };

  secondaryAction: PoModalAction = {
    action: () => {
      this.modalUpdate.close();
    },
    label: 'Cancelar',
  };

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private dadosProfService: DadosProfissionalService,

  ) {
    const nav = this.router.getCurrentNavigation().extras.state;
    this.menuItemSelected = nav.menu;
    this.dadosProfService.setId(nav.usuario.user);
  }

  ngOnInit(): void {
    this.dadosProfService.getDadosBenef().subscribe((dadosBenef: any) => {
      this.nomeCompleto = dadosBenef.profissionais.nome;
      this.siglaConselho = dadosBenef.profissionais.siglaConselho;
      this.numeroConselho = dadosBenef.profissionais.numeroConselho;
      this.ufConselho = dadosBenef.profissionais.estadoConselho;
    });
  }

  openModal() {
    this.modalUpdate.open();
  }

  alterarDados() {
    this.usuarioForm = {
      user: this.dadosProfService.getId(),
      nome: this.nomeCompleto,
      siglaConselho: this.siglaConselho,
      numeroConselho: this.numeroConselho,
      estadoConselho: this.ufConselho,
    };

    this.dadosProfService
      .atualizarProfissional(this.usuarioForm)
      .subscribe((res) => {
        this.notificationService.success('Dados alterados com sucesso!');
      });
  }
}
