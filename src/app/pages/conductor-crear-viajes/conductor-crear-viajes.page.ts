
import { Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-conductor-crear-viajes',
  templateUrl: './conductor-crear-viajes.page.html',
  styleUrls: ['./conductor-crear-viajes.page.scss'],
})
export class ConductorCrearViajesPage implements OnInit {
  public datetime: any;

  

  constructor() {}

  ngOnInit() {
    const date = new Date();
    let dayChange = -2;

    if (date.getDate() + dayChange <= 0) {
      dayChange = -dayChange;
    }

    date.setDate(date.getDate() + dayChange);
    this.datetime = date.toISOString();
  }

  viajecreado() {
    console.log("viaje creado");
  }
}
