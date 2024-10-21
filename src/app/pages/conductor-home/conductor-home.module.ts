import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConductorHomePageRoutingModule } from './conductor-home-routing.module';

import { ConductorHomePage } from './conductor-home.page';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConductorHomePageRoutingModule,
    ComponentsModule
],
  declarations: [ConductorHomePage]
})
export class ConductorHomePageModule {}
