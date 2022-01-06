import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public loginPage = { title: 'Login', url: '/login', icon: 'log-in' };
  public registerPage = { title: 'Register', url: '/register', icon: 'person-add' };
  public home = { title: 'home', url: '/home', icon: 'person-add' };
  public nfcReader = { title: 'nfc Reader', url: '/nfc-reader', icon: 'person-add' };
  public map = { title: 'Map', url: '/map', icon: 'person-add' };
  public sensorDetail = { title: 'sensor', url: '/sensor-details', icon: 'person-add' };
  public carList = { title: 'Car List', url: '/car-list', icon: 'person-add' };
  public settings = { title: 'settings', url: '/settings', icon: 'log-out' };
  constructor() {
    console.log(environment.type,'  Mode ')
  }

}
