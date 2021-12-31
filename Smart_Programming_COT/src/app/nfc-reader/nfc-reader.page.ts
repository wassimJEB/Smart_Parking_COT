import { Component, OnInit } from '@angular/core';
//import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
//import { NFC, Ndef } from "@ionic-native/nfc/ngx";
@Component({
  selector: 'app-nfc-reader',
  templateUrl: './nfc-reader.page.html',
  styleUrls: ['./nfc-reader.page.scss'],
})
export class NfcReaderPage implements OnInit {


  constructor(
    //private nfc: NFC, private ndef: Ndef
    ) { }

  ngOnInit() {
  }
  test2(){
    /*this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe(() => {
      console.log("works");
      let message = [this.ndef.textRecord("hello, world")];
      this.nfc.share(message);
    }, err => console.log(err));*/

  }

}
