import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreadorViajePageRoutingModule } from './creador-viaje-routing.module';

import { CreadorViajePage } from './creador-viaje.page';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreadorViajePageRoutingModule,
    ComponentsModule
],
  declarations: [CreadorViajePage]
})
export class CreadorViajePageModule {}
