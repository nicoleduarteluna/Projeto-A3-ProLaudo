import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DadosProfissionalComponent} from './dados-profissional.component'

@NgModule({
  declarations: [ DadosProfissionalComponent],
  imports: [
    BrowserModule,
    CommonModule,
    PoModule,
    RouterModule,
    PoTemplatesModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [ DadosProfissionalComponent ]
})
export class DadosProfissionalModule { }
