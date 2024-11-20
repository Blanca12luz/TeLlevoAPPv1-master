import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ViajeService } from './../../service/viaje.service';
import { Location } from './../../interfaces/location';

@Component({
  selector: 'app-conductor-crear-viajes',
  templateUrl: './conductor-crear-viajes.page.html',
  styleUrls: ['./conductor-crear-viajes.page.scss'],
})
export class ConductorCrearViajesPage implements OnInit {
  public nombre: string = '';
  public fecha: any;
  public espacioDisponible: number = 1;
  public precio: number | null = null;
  public puntoInicio: Location | undefined;
  public puntoDestino: Location | undefined;
viajeForm: any;

  constructor(private storage: Storage, private viajeService: ViajeService) {}

  async ngOnInit() {
    await this.storage.create();
    this.fecha = new Date().toISOString();

    // Obtener los puntos de inicio y destino guardados
    const viaje = await this.viajeService.obtenerViaje();
    if (viaje) {
      this.puntoInicio = viaje.puntoInicio;
      this.puntoDestino = viaje.puntoDestino;
      console.log('Puntos cargados:', this.puntoInicio, this.puntoDestino);
    } else {
      console.log('No se encontraron puntos de inicio o destino');
    }
  }

  async viajecreado(viajeForm: any) {
    if (viajeForm.invalid) {
      console.log('El formulario contiene errores. Por favor, revisa los campos obligatorios.');
      return;
    }

    if (this.precio == null || isNaN(Number(this.precio))) {
      console.log('El precio debe ser un número válido');
      return;
    }

    await this.storage.set('nombre', this.nombre);
    await this.storage.set('fecha', this.fecha);
    await this.storage.set('espacioDisponible', this.espacioDisponible);
    await this.storage.set('precio', this.precio);

    console.log('Viaje creado y datos guardados');
  }
}
