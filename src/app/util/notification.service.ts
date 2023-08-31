import { Injectable } from '@angular/core';
import { PoToasterOrientation } from '@po-ui/ng-components';
import { PoNotification } from '@po-ui/ng-components';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private poNotification: PoNotification = {
    message: '',
    orientation: PoToasterOrientation.Bottom,
  };

  constructor(private poNotificationService: PoNotificationService) { }

  information(msg: string) {
    this.poNotification.message = msg;
    this.poNotification.duration = 3000;
    this.poNotificationService.information(this.poNotification);
  }

  success(msg: string) {
    this.poNotification.message = msg;
    this.poNotification.duration = 3000;
    this.poNotificationService.success(this.poNotification);
  }

  warning(msg: string) {
    this.poNotification.message = msg;
    this.poNotification.duration = 3000;
    this.poNotificationService.warning(this.poNotification);
  }

  error(msg: string) {
    this.poNotification.message = msg;
    this.poNotificationService.error(this.poNotification);
  }

}
