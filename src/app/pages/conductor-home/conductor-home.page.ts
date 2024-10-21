import { Component,} from '@angular/core';
import { ItemListConductor } from 'src/app/interfaces/itemlist';

@Component({
  selector: 'app-conductor-home',
  templateUrl: './conductor-home.page.html',
  styleUrls: ['./conductor-home.page.scss'],
})
export class ConductorHomePage {

  vinculos: ItemListConductor[] = [{
    rutaconductor: '/conductor-viajes',
    tituloconductor: 'Viajes',
    iconoconductor: 'car-outline'
  },
  {
    rutaconductor: '/solucitud',
    tituloconductor: 'Mensajes',
    iconoconductor: 'mail-outline'
  },
  ]

  constructor() { }

  ngOnInit() {
  }

}
