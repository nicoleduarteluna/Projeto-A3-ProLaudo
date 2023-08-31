import { ExamesService } from './exames.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoModalAction,
  PoModalComponent,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { NotificationService } from 'src/app/util/notification.service';

@Component({
  selector: 'app-exames',
  templateUrl: './exames.component.html',
  styleUrls: ['./exames.component.css'],
})
export class ExamesComponent implements OnInit {
  menuItemSelected: string = '';

  columnsExame: PoTableColumn[] = [
    { label: 'Exame', property: 'nomeExame' },
    { label: 'Realizado em', property: 'dataExecucao' },
    { label: 'Status', property: 'statusLaudo' },
  ];

  exames: any[] = [];

  laudo = '';
  titleModal = '';

  @ViewChild('modalLaudo') modalLaudo: PoModalComponent;

  primaryAction: PoModalAction = {
    action: () => {
      this.modalLaudo.close();
    },
    label: 'Voltar',
  };

  actions: PoTableAction[] = [
    {
      label: 'Abrir Laudo',
      action: this.abrirModalLaudo.bind(this),
    },
  ];

  constructor(private router: Router, private exameService: ExamesService, private notificationService: NotificationService) {
    const nav = this.router.getCurrentNavigation().extras.state;
    this.menuItemSelected = nav.menu;
  }

  ngOnInit() {
    this.preencherExames();
  }

  preencherExames() {
    this.exameService.getExame().subscribe((beneficiarioLogado: any) => {
      beneficiarioLogado.beneficiarios.exames.forEach((exame) => {
        this.exames.push(exame);
      });
    });
  }

  abrirModalLaudo(exame) {
    if(exame.statusLaudo == 'A Laudar') {
      this.notificationService.warning('Não é possível visualizar o laudo deste exame!');
    } else {
      this.laudo = exame.laudo;
      this.titleModal = exame.nomeExame;
      this.modalLaudo.open();
    }
  }
}
