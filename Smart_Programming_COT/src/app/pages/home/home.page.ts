import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
// From assets/data.json import la localisation des parking dispo
export class HomePage implements OnInit {
  pickupLocation: string;
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  constructor(private router:Router) {}

  ngOnInit() {
  }
  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };
  // use geolocation to get user's device coordinates

  getCC() {
    console.log('run');
    Geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(resp);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }



  onpickupClick(){
    this.router.navigate(['map']);
  }

}
