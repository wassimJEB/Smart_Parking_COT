import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
providedIn: 'root'
})
export class HttpService {
constructor(private http: HttpClient) {}
////JSON.stringify
postMeth(serviceName: string, data: any) {
const headers = new HttpHeaders({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'Content-Type': 'application/x-www-form-urlencoded'
  //Authorization: 'Basic ' + btoa(OAUTH_CLIENT + ':' + OAUTH_SECRET)
});
const options = {headers, withCredintials: false };
const url = environment.apiUrl + serviceName;

return this.http.post(url,JSON.stringify(data), options);
}
getMeth(serviceName: string){
  const headers = new HttpHeaders();
  const options = { headers: headers, withCredentials: false };
  const url = environment.apiUrl + serviceName;
  return this.http.get(url, options)
  }
}

