import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import {Observable, throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpService: HttpService,
              private router: Router,) { }

  List(): Observable<any>{
    return this.httpService.getMeth('car-list');
  }
}
