import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
   ],
  imports: [
    BrowserModule,
    PoModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    HttpClientModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule { }
