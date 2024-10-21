import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolucitudPage } from './solucitud.page';

const routes: Routes = [
  {
    path: '',
    component: SolucitudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolucitudPageRoutingModule {}
