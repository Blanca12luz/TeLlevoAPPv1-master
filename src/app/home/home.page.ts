import { Component } from '@angular/core';
import { Itemlist, ItemListConductor } from '../interfaces/itemlist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  vinculos: Itemlist[] = [{
    ruta: '/creador-viaje',
    titulo: 'Solicitar viaje',
    icono: 'add'
  },
  ];

  vinculoConductor: ItemListConductor[] = [{
    rutaconductor: '/conductor-crear-viajes',
    tituloconductor: 'Crear viaje',
    iconoconductor: 'car'
  },
  {
    rutaconductor: '/conductor-home',
    tituloconductor: 'Historial Conductor',
    iconoconductor: 'person'
  },
  ];

  constructor(private router: Router) { }

  ngOnInit() {

  }


  logout() {
    this.router.navigate(['']);
  }

  onConductor() {
    this.router.navigate(['/conductor'])
  }
}
