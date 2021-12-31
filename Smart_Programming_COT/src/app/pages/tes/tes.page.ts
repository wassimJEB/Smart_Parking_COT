import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-tes',
  templateUrl: './tes.page.html',
  styleUrls: ['./tes.page.scss'],
})
export class TesPage {

  map: Leaflet.Map;
  propertyList = [];

  constructor() { }

  ionViewDidEnter() {
    this.map = new Leaflet.Map('mapId3').setView([42.35663, -71.1109], 16);

    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'edupala.com'
    }).addTo(this.map);

    fetch('./assets/data.json')
      .then(res => res.json())
      .then(data => {
        this.propertyList = data.properties;
        this.leafletMap();
      })
      .catch(err => console.error(err));
  }

  leafletMap() {
    for (const property of this.propertyList) {
      Leaflet.marker([property.lat, property.long]).addTo(this.map)
        .bindPopup(property.city)
        .openPopup();
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }

}
