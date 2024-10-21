import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolucitudPageRoutingModule } from './solucitud-routing.module';

import { SolucitudPage } from './solucitud.page';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolucitudPageRoutingModule,
    ComponentsModule
],
  declarations: [SolucitudPage]
})
export class SolucitudPageModule {}
