//Auth service is a controller to connect the APIs.

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, throwError} from 'rxjs';
import { HttpService } from './http.service';
//import { StorageService } from './storage.service';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {TokenService} from './token.service';
import {catchError, tap} from 'rxjs/operators';

const OAUTH_CLIENT = 'express-client';
const OAUTH_SECRET = 'express-secret';
const API_URL = 'http://localhost:8084/';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/x-www-form-urlencoded',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Authorization: 'Basic ' + btoa(OAUTH_CLIENT + ':' + OAUTH_SECRET)
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl='';
  //private urlReg ='http://localhost:8084/register';
  constructor(
    private httpService: HttpService,
    //private storageService: StorageService,
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}
  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  private static log(message: string): any {
    console.log(message);
  }



  register(postData: any): Observable<any> {
    console.log('Send Data correctly');
    console.log(postData);
    return this.httpService.postMeth('register', postData);
  }
  /*login(postData: any): Observable<any> {
    return this.httpService.postMeth('login', postData);
  }
  logout() {
    //this.storageService.clear();
    //this.storageService.removeStorageItem('userData').then(res => {
      //this.router.navigate(['/login']);});
 }*/
  login(loginData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('username', loginData.username)
      .set('password', loginData.password)
      .set('grant_type', 'password');

    return this.http.post<any>(API_URL + 'login', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token');
    return this.http.post<any>(API_URL + 'oauth/token', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }
  secured(): Observable<any> {
    return this.http.get<any>(API_URL + 'secret')
      .pipe(catchError(AuthService.handleError));
  }

}
