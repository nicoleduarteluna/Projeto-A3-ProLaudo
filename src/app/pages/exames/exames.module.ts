import { HttpClientModule } from '@angular/common/http';
import { ExamesComponent } from './exames.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';

@NgModule({
  declarations: [ ExamesComponent
   ],
  imports: [
    BrowserModule,
    PoModule,
    RouterModule,
    PoTemplatesModule,
    HttpClientModule
  ],
  exports: [ ExamesComponent ],
  providers: [],
  bootstrap: []
})
export class ExamesModule { }
