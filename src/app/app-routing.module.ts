import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },

  {
    path: 'conductor',
    loadChildren: () => import('./pages/conductor/conductor.module').then( m => m.ConductorPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'rpass',
    loadChildren: () => import('./pages/rpass/rpass.module').then( m => m.RpassPageModule)
  },
  {
    path: 'creador-viaje',
    loadChildren: () => import('./pages/creador-viaje/creador-viaje.module').then( m => m.CreadorViajePageModule)
  },
  {
    path: 'conductor-viajes',
    loadChildren: () => import('./pages/conductor-viajes/conductor-viajes.module').then( m => m.ConductorViajesPageModule)
  },
  {
    path: 'conductor-crear-viajes',
    loadChildren: () => import('./pages/conductor-crear-viajes/conductor-crear-viajes.module').then( m => m.ConductorCrearViajesPageModule)
  },
  {
    path: 'conductor-home',
    loadChildren: () => import('./pages/conductor-home/conductor-home.module').then( m => m.ConductorHomePageModule)
  },
  {
    path: 'solucitud',
    loadChildren: () => import('./pages/solucitud/solucitud.module').then( m => m.SolucitudPageModule)
  },  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
