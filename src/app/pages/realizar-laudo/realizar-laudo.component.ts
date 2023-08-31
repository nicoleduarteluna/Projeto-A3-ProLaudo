import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoModalAction,
  PoModalComponent,
  PoRichTextComponent,
} from '@po-ui/ng-components';
import { NotificationService } from 'src/app/util/notification.service';
import { RealizarLaudoService } from './realizar-laudo.service';
@Component({
  selector: 'app-realizar-laudo',
  templateUrl: './realizar-laudo.component.html',
  styleUrls: ['./realizar-laudo.component.css'],
})
export class RealizarLaudoComponent implements OnInit {
  @ViewChild(PoRichTextComponent) richText: PoRichTextComponent;

  menu = 'Laudo';

  nomePaciente: string = '';
  dataNascimento: string = '';
  cpf: string = '';
  rg: string = '';
  telefone: string = '';
  email: string = '';
  nomeExame: string = '';
  statusLaudo: string = '';
  dataExecucao: string = '';

  laudo: string = '';

  beneficiarioForm = {};

  raioXBraco = `Estruturas ósseas examinadas de aspectos radiológicos normais. Espaço articular conservado.`;

  raioXCLS = 'Corpos vertebrais anatômicos. Pedículos íntegros. Discos e espaços inter-vertebrais conservados. Aspecto normal das articulações inter-apofisárias.'

  ultrassomAPU = `Exame realizado com transdutor de alta resolução, com varredura em múltiplos planos, que mostra:
  Bexiga urinária com boa repleção, apresentando paredes com espessura normal e contornos regulares. Conteúdo líquido anecóide. Próstata tópica, de dimensões normais, com forma habitual e contornos regulares.`;

  srcImage = '../../../assets/imagens/raioXColuna.jpg';

  @ViewChild('modalConfirmLaudo') modalConfirmLaudo: PoModalComponent;
  @ViewChild('modalImagem') modalImagem: PoModalComponent;

  primaryAction: PoModalAction = {
    action: () => {
      this.realizarLaudo();
      this.modalConfirmLaudo.close();
      this.router.navigate(['/home']);
    },
    label: 'Confirmar',
  };

  primaryActionImagem: PoModalAction = {
    action: () => {
      this.modalImagem.close();
    },
    label: 'Voltar',
  };

  secondaryAction: PoModalAction = {
    action: () => {
      this.modalConfirmLaudo.close();
    },
    label: 'Cancelar',
  };

  constructor(
    private router: Router,
    private realizarLaudoService: RealizarLaudoService,
    private notificationService: NotificationService
  ) {
    const nav = this.router.getCurrentNavigation().extras.state;
    this.nomePaciente = nav.exame.nome;
    this.dataNascimento = nav.exame.dataNascimento;
    this.cpf = nav.exame.cpf;
    this.rg = nav.exame.rg;
    this.telefone = nav.exame.telefone;
    this.email = nav.exame.email;
    this.nomeExame = nav.exame.nomeExame;
    this.dataExecucao = nav.exame.dataExecucao;
    this.statusLaudo = nav.exame.statusLaudo;
    this.laudo = nav.exame.laudo;

    this.realizarLaudoService.setId(this.rg);

    if(this.nomeExame == 'Raio X Mão') {
      this.srcImage = '../../../assets/imagens/raioXMao.jpg';
    } else if (this.nomeExame == 'Ultrassom Abdômen') {
      this.srcImage = '../../../assets/imagens/ultrassom_abdomem.jpg';
    } else if (this.nomeExame == 'Raio X Tórax') {
      this.srcImage = '../../../assets/imagens/raioXTorax.jpg';
    }
  }

  openModal() {
    this.modalConfirmLaudo.open();
  }

  ngOnInit(): void {}

  realizarLaudo() {
    this.beneficiarioForm = {
      rg: this.rg,
      nome: this.nomePaciente,
      dataNascimento: this.dataNascimento,
      cpf: this.cpf,
      email: this.email,
      telefone: this.telefone,
      exames: [{
        nomeExame: this.nomeExame,
        dataExecucao: this.dataExecucao,
        statusLaudo: 'Laudado',
        laudo: this.laudo
      }],
    };

    this.realizarLaudoService
      .atualizarBeneficiario(this.beneficiarioForm)
      .subscribe((res) => {
        this.notificationService.success(`Laudo referente ao exame ${this.nomeExame} realizado com sucesso!`);
      });
  }

  modelBraco() {
    this.laudo = this.raioXBraco;
  }

  modelCLS() {
    this.laudo = this.raioXCLS;
  }

  modelUltrassomAPU() {
    this.laudo = this.ultrassomAPU;
  }

  openModalImagem() {
    this.modalImagem.open();
  }
}
