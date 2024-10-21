import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConductorCrearViajesPage } from './conductor-crear-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: ConductorCrearViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConductorCrearViajesPageRoutingModule {}
