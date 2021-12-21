import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NfcReaderPageRoutingModule } from './nfc-reader-routing.module';

import { NfcReaderPage } from './nfc-reader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NfcReaderPageRoutingModule
  ],
  declarations: [NfcReaderPage]
})
export class NfcReaderPageModule {}
