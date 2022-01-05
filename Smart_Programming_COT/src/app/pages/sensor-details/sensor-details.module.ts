import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SensorDetailsPageRoutingModule } from './sensor-details-routing.module';

import { SensorDetailsPage } from './sensor-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SensorDetailsPageRoutingModule
  ],
  declarations: [SensorDetailsPage]
})
export class SensorDetailsPageModule {}
