import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CadastrarExamesComponent } from './cadastrar-exames.component';
import { PoModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [ CadastrarExamesComponent ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    PoModule
  ],
  exports: [ CadastrarExamesComponent ]
})
export class CadastrarExamesModule { }
