import { Component, OnInit } from '@angular/core';
import { Plugins ,Capacitor} from '@capacitor/core';
const { NFC } = Plugins;
@Component({
  selector: 'app-nfc-reader',
  templateUrl: './nfc-reader.page.html',
  styleUrls: ['./nfc-reader.page.scss'],
})
export class NfcReaderPage implements OnInit {
   info:any;


  constructor() { }

  ngOnInit() {
  }
  //----------- Only for Android----------
  async NfcReader(info) {

    console.log('run nfc')
      if (Capacitor.isPluginAvailable('NFC')) {
        const status = NFC.getStatus();
        console.log('NFC is enabled', status);



        if (status !== 'enabled') {
          NFC.showSettings();
        }else{
          NFC.getTags().then(data=>{
            console.log(data)
            info = data;
          });

        }
      }

  }

}
