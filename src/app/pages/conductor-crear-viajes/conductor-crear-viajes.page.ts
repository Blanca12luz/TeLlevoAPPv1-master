import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-conductor-crear-viajes',
  templateUrl: './conductor-crear-viajes.page.html',
  styleUrls: ['./conductor-crear-viajes.page.scss'],
})
export class ConductorCrearViajesPage implements OnInit {
  public datetime: any;
  public nombre: string = '';
  public fecha: any;
  public espacioDisponible: number = 1;
  public precio: number | null = null; // Asegurar que sea un número o nulo

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create(); // Inicializar el almacenamiento

    const date = new Date();
    let dayChange = -2;

    if (date.getDate() + dayChange <= 0) {
      dayChange = -dayChange;
    }

    date.setDate(date.getDate() + dayChange);
    this.fecha = date.toISOString();
  }

  async viajecreado() {
    // Validar que el precio sea numérico y esté definido
    if (this.precio === null || isNaN(this.precio)) {
      console.log("El precio debe ser un número válido");
      return;
    }

    // Guardar los datos en el storage
    await this.storage.set('nombre', this.nombre);
    await this.storage.set('fecha', this.fecha);
    await this.storage.set('espacioDisponible', this.espacioDisponible);
    await this.storage.set('precio', this.precio);

    console.log("Viaje creado y datos guardados");
  }
}
