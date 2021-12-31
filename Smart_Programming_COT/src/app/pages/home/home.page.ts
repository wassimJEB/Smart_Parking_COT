import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
// From assets/data.json import la localisation des parking dispo
export class HomePage implements OnInit {
  pickupLocation: string;
  constructor(private router:Router) {}

  ngOnInit() {
  }




  onpickupClick(){
    this.router.navigate(['map']);
  }

}
