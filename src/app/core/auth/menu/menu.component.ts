import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { PoMenuItem, PoMenuModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  providers: [MenuService],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItemSelected: string;

  menuCollapsed: boolean;

  constructor(public MenuService: MenuService) {}

  ngOnInit() {
    this.menuCollapsed = true;
  }

  menus: Array<PoMenuItem> = [
    {
      label: 'Home',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon po-icon-home',
      shortLabel: 'Home',
      link: '/home'
    },
    {
      label: 'Configurar',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon po-icon-xml',
      shortLabel: 'Configurar',
      link: '/configurar'
    },
    {
      label: 'Documenta��o',
      icon: 'po-icon po-icon-document-filled',
      shortLabel: 'Documenta��o',
      link:'https://tdn.totvs.com/pages/releaseview.action?pageId=203771195',

    }
  ];


  widgetClicadoDocumetacao(){
    window.open("https://tdn.totvs.com/pages/releaseview.action?pageId=203771195", '_blank');
  }


  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }
}
