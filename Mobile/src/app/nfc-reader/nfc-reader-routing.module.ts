import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NfcReaderPage } from './nfc-reader.page';

const routes: Routes = [
  {
    path: '',
    component: NfcReaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NfcReaderPageRoutingModule {}
