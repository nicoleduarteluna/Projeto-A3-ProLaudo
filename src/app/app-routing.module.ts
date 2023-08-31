import { DadosComponent } from './pages/dados/dados.component';
import { ExamesComponent } from './pages/exames/exames.component';
import { LoginComponent } from './login/login.component';
import { NgModule, } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/auth/auth.guard';
import { RealizarLaudoComponent } from './pages/realizar-laudo/realizar-laudo.component';
import { CadastrarExamesComponent } from './pages/cadastrar-exames/cadastrar-exames.component';
import { NovoCadastroComponent } from './pages/novo-cadastro/novo-cadastro.component';
import { DadosProfissionalComponent } from './pages/dados-profissional/dados-profissional.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'exames', component: ExamesComponent, canActivate:[AuthGuard] },
  { path: 'dados', component: DadosComponent, canActivate:[AuthGuard] },
  { path: 'dados-profissional', component: DadosProfissionalComponent, canActivate:[AuthGuard] },
  { path: 'realizar-laudo', component: RealizarLaudoComponent, canActivate:[AuthGuard] },
  { path: 'cadastrar-exames', component: CadastrarExamesComponent, canActivate:[AuthGuard] },
  { path: 'novo-cadastro', component: NovoCadastroComponent, canActivate:[AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
