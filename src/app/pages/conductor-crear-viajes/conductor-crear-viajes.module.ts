import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConductorCrearViajesPageRoutingModule } from './conductor-crear-viajes-routing.module';

import { ConductorCrearViajesPage } from './conductor-crear-viajes.page';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConductorCrearViajesPageRoutingModule,
    ComponentsModule
],
  declarations: [ConductorCrearViajesPage]
})
export class ConductorCrearViajesPageModule {}
