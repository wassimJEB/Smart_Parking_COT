import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SensorDetailsPage } from './sensor-details.page';

const routes: Routes = [
  {
    path: '',
    component: SensorDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SensorDetailsPageRoutingModule {}
