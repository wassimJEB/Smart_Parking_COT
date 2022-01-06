import { Component, OnInit } from '@angular/core';
import {ListService} from '../../services/list.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.page.html',
  styleUrls: ['./car-list.page.scss'],
})
export class CarListPage implements OnInit {
  getData: any[] = [];

  constructor(private list:ListService,private httpClient:HttpClient) { }

  ngOnInit() {
    this.Afficher();

  }
  Afficher(){
    const Table =this.list.List().subscribe(data=>{
      console.log(data);
      this.getData=data;

    });


  }


}
