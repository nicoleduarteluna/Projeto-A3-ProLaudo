import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { NovoCadastroComponent } from './novo-cadastro.component';

@NgModule({
  declarations: [ NovoCadastroComponent],
  imports: [
    PoModule,
    PoTemplatesModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule
  ],
  exports: [ NovoCadastroComponent ]
})

export class NovoCadastroModule { }
