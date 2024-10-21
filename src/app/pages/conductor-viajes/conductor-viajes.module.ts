import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConductorViajesPageRoutingModule } from './conductor-viajes-routing.module';

import { ConductorViajesPage } from './conductor-viajes.page';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConductorViajesPageRoutingModule,
    ComponentsModule
],
  declarations: [ConductorViajesPage]
})
export class ConductorViajesPageModule {}
