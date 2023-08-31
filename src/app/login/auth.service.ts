import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../util/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mostraMenuEmitter = new EventEmitter<boolean>();
  usuarioLogadoEmitter = new EventEmitter();

  usuarioAutenticado: boolean = false;

  constructor(private router: Router, private notificationService: NotificationService) { }

  checkLogin(event, users){
    users.forEach((user, index) => {
      if (event.login.toUpperCase() == user.user.toUpperCase() && event.password == user.password ) {
        this.usuarioAutenticado = true;
        this.mostraMenuEmitter.emit(true);
        this.usuarioLogadoEmitter.emit(user);
        sessionStorage.setItem('User', event.login.toUpperCase());
        sessionStorage.setItem('Password', event.password);
        this.router.navigate(['home'], { state: { usuarioLogado: user } });
      } else {
        if (index == (users.length -1) && !this.usuarioAutenticado) {
          this.notificationService.warning('Usuário não autorizado!');
          this.mostraMenuEmitter.emit(false);
        }
      }
    });
  }

}
