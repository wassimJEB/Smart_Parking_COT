import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
// @ts-ignore
import {GeolocService} from '../../services/geoloc.service';
import { antPath } from 'leaflet-ant-path';@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {
  map: Leaflet.Map;
  data={
  "properties": [
    {
      "city": "Marsa",
      "state": "MA",
      "long": 10.321832046,
      "lat":  36.87249651
    },
    {
      "city": "Sfax",
      "state": "MA",
      "long": 10.766163,
      "lat": 34.747847
    },
    {
      "city": "Tunisia",
      "state": "MA",
      "lat": 36.806389,
      "long": 10.181667
    },
    {
      "city": "Cambridge",
      "long": 25,
      "lat": 7
    }
  ]
};


constructor(private geoloc:GeolocService) { }

  ngOnInit() { }
  ionViewDidEnter() { this.leafletMap(); }


  leafletMap() {
    const L=this.geoloc.getCoord();
    this.map = Leaflet.map('mapId').setView([33.92, 8.127], 5);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);

    // @ts-ignore
    Leaflet.marker(L,{ color: '#FF0000' }).addTo(this.map).bindPopup('Your Position').openPopup().bindC;
    for (const property of this.data.properties) {
      Leaflet.marker([property.lat, property.long]).addTo(this.map)
        .bindPopup(property.city)
        .openPopup();
    }

    antPath([L, [36.87249651, 10.321832046]],
      { color: '#FF0000', weight: 5, opacity: 0.6 })
      .addTo(this.map);
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

}
