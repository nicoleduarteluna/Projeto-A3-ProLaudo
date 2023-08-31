import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './login/auth.service';
import { AfterViewChecked, Component, ViewChild } from '@angular/core';
import { AuthGuard } from './core/auth/auth.guard';
import { PoMenuItem, PoModalAction, PoModalComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {

  mostraMenu: boolean = false;
  menuItemSelected: string;
  usuarioLogado: any;

  menus: Array<PoMenuItem> = [
    {
      label: 'Home',
      action: this.updateMenu.bind(this),
      icon: 'po-icon po-icon-home',
      shortLabel: 'Home',
      link: '/home'
    },
    {
      label: 'Meus Exames',
      action: this.updateMenu.bind(this),
      icon: 'po-icon po-icon-exam',
      shortLabel: 'Exames',
      link: '/exames'
    },
    {
      label: 'Meus Dados',
      action: this.updateMenu.bind(this),
      icon: 'po-icon po-icon-archive',
      shortLabel: 'Dados',
      link: '/dados'
    },
    {
      label: 'Sair',
      action: this.openModalExit.bind(this),
      icon: 'po-icon po-icon-exit',
      shortLabel: 'Sair',
      link: '/sair'
    },
  ];

  @ViewChild('modalExit') modalExit: PoModalComponent;

  primaryAction: PoModalAction = {
    action: () => {
      this.redirectLogin();
      this.modalExit.close();
      this.mostraMenu = false;
    },
    label: 'Confirmar'
  };

  constructor( private authService: AuthService,
    private authGuard: AuthGuard,
    private router: Router,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit(){
    this.authGuard.mostraMenuEmit.subscribe(mostra => {
      this.mostraMenu = mostra
    });

    this.authService.usuarioLogadoEmitter.subscribe(usuario => {
      this.usuarioLogado = usuario;
      if(this.usuarioLogado.type == 'medico') {
        this.menus = [
          {
            label: 'Home',
            action: this.updateMenu.bind(this),
            icon: 'po-icon po-icon-home',
            shortLabel: 'Home',
            link: '/home'
          },
          {
            label: 'Cadastrar Exames',
            action: this.updateMenu.bind(this),
            icon: 'po-icon po-icon-user-add',
            shortLabel: 'Cad. Exames',
            link: '/cadastrar-exames'
          },
          {
            label: 'Meus Dados',
            action: this.updateMenu.bind(this),
            icon: 'po-icon po-icon-archive',
            shortLabel: 'Dados',
            link: '/dados-profissional'
          },
          {
            label: 'Sair',
            action: this.openModalExit.bind(this),
            icon: 'po-icon po-icon-exit',
            shortLabel: 'Sair',
            link: '/sair'
          },
        ];
      }
    });

  }

  ngAfterViewChecked(): void {
    const rotaAtiva = this.activatedRoute.snapshot.children[0].routeConfig.path;
    if (rotaAtiva == 'login' ) {
      this.mostraMenu = false;
    } else if (rotaAtiva == 'novo-cadastro'){
      this.mostraMenu = true;
    }
  }

  updateMenu(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
    this.router.navigate([menu.link], { state: { menu: this.menuItemSelected, usuario: this.usuarioLogado } })
  }

  openModalExit() {
    this.modalExit.open();
  }

  redirectLogin() {
    this.router.navigate(['/']);
  }

}
