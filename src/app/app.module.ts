import { DadosModule } from './pages/dados/dados.module';
import { DadosProfissionalModule } from './pages/dados-profissional/dados-profissional.module';
import { ExamesModule } from './pages/exames/exames.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule, PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { HomeModule } from './pages/home/home.module';
import { MenuModule } from './core/auth/menu/menu.module';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './core/auth/auth.guard';
import { NgModule } from '@angular/core';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';
import { HttpClientModule } from '@angular/common/http';
import { RealizarLaudoComponent } from './pages/realizar-laudo/realizar-laudo.component';
import { CadastrarExamesComponent } from './pages/cadastrar-exames/cadastrar-exames.component';
import { NovoCadastroComponent } from './pages/novo-cadastro/novo-cadastro.component';
import { NovoCadastroModule } from './pages/novo-cadastro/novo-cadastro.module';
import { RealizarLaudoModule } from './pages/realizar-laudo/realizar-laudo.module';
import { CadastrarExamesModule } from './pages/cadastrar-exames/cadastrar-exames.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    PoTemplatesModule,
    LoginModule,
    HomeModule,
    PoPageDynamicSearchModule,
    MenuModule,
    PoCodeEditorModule,
    HttpClientModule,
    ExamesModule,
    DadosModule,
    DadosProfissionalModule,
    NovoCadastroModule,
    RealizarLaudoModule,
    CadastrarExamesModule,
    HomeModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
