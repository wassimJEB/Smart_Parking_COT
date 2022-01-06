import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

import { Geolocation } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root'
})
export class GeolocService {
  L=[];
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude

  constructor() {
    Geolocation.watchPosition({enableHighAccuracy: true}, (resp) => {
    this.latitude = resp.coords.latitude;
    this.longitude = resp.coords.longitude;
    // @ts-ignore
    this.L=[this.latitude,this.longitude];

  });
  }
  getCoord() {
    console.log('run');

    return this.L;

}}
