import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(`lat:${position.coords.latitude}, lon:${position.coords.longitude}`);
    })
  }

}
