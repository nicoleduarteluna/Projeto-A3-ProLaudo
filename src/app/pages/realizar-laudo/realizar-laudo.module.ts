import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { RealizarLaudoComponent } from './realizar-laudo.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ RealizarLaudoComponent ],
  imports: [
    CommonModule,
    FormsModule,
    PoModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [ RealizarLaudoComponent ]
})
export class RealizarLaudoModule { }
