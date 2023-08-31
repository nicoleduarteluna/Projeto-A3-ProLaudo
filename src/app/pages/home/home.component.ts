import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoMenuItem,
  PoSelectOption,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { NotificationService } from 'src/app/util/notification.service';
import { DadosService } from '../dados/dados.service';
import { ExamesService } from '../exames/exames.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  menuItemSelected: string = 'Home';
  usuarioLogado: any;
  labelConteudo: string = 'Conteúdo';
  filtro: string = 'nome';

  filtroOptions: Array<PoSelectOption> = [
    { label: 'Nome do Paciente', value: 'nome' },
    { label: 'Data de Nascimento', value: 'dataNascimento' },
    { label: 'CPF do Paciente', value: 'cpf' },
    { label: 'Nome do Exame', value: 'nomeExame' },
    { label: 'Data do Exame', value: 'dataExecucao' },
  ];

  conteudoFiltro: string = '';

  columnsExame: PoTableColumn[] = [
    { label: 'Status', property: 'statusLaudo' },
    { label: 'Exame', property: 'nomeExame', width: '18%' },
    { label: 'Dt. Exame', property: 'dataExecucao' },
    { label: 'Nome', property: 'nome', width: '15%' },
    { label: 'Dt. Nascimento', property: 'dataNascimento' },
    { label: 'CPF Paciente', property: 'cpf' },
  ];

  exames: any[] = [];
  beneficiarios: any[] = [];

  rowSelected: any;

  user: string = '';

  constructor(
    private router: Router,
    private homeService: HomeService,
    private dadosService: DadosService,
    private exameService: ExamesService,
    private notificationService: NotificationService
  ) {
    const nav = this.router.getCurrentNavigation().extras.state;
    if (nav) {
      this.usuarioLogado = nav.usuarioLogado;
      this.dadosService.setId(this.usuarioLogado.rg);
      this.exameService.setId(this.usuarioLogado.rg);
    } else {
      this.user = '';
      this.user = sessionStorage.getItem('User').toLocaleLowerCase();
      this.getUsers();
    }
  }

  ngOnInit(): void {
    this.getExames(false);
  }

  ngOnDestroy(): void {
    this.exames = [];
  }

  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }

  getExames(filtrar) {
    this.homeService.getExames().subscribe((dados: any) => {
      dados.beneficiarios.forEach((beneficiario) => {
        beneficiario.exames.forEach((exame) => {
          exame = {
            ...exame,
            nome: beneficiario.nome,
            dataNascimento: beneficiario.dataNascimento,
            cpf: beneficiario.cpf,
            rg: beneficiario.rg,
            telefone: beneficiario.telefone,
            email: beneficiario.email,
            id: beneficiario.id,
          };
          if (!filtrar) {
            this.exames.push(exame);
          } else {
            if (exame[`${this.filtro}`] == this.conteudoFiltro) {
              this.exames.push(exame);
            }
          }
        });
      });
    });
  }

  changeFilter(filtro) {
    this.filtro = filtro;
  }

  filtrarItens(conteudo) {
    this.exames = [];
    this.getExames(true);
  }

  teste(row) {
    this.rowSelected = {
      id: row.id,
      nome: row.nome,
      dataNascimento: row.dataNascimento,
      cpf: row.cpf,
      rg: row.rg,
      telefone: row.telefone,
      email: row.email,
      nomeExame: row.nomeExame,
      dataExecucao: row.dataExecucao,
      statusLaudo: row.statusLaudo,
      laudo: row.laudo,
    };
  }

  realizarLaudo() {
    if(this.rowSelected.statusLaudo == 'Laudado') {
      this.notificationService.warning(`Exame ${this.rowSelected.nomeExame} já foi laudado!`);
    } else {
      this.router.navigate(['/realizar-laudo'], {
        state: { exame: this.rowSelected },
      });
    }
  }

  getUsers() {
    this.homeService.getUsers(this.user).subscribe((users: any) => {
      this.usuarioLogado = users.usuarios;
    });
  }

  redirectToDados() {
    this.router.navigate(['/dados']);
  }

  redirectToExames() {
    this.router.navigate(['/exames']);
  }
}
