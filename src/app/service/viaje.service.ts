// src/app/services/viaje.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Location } from './../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  private storageInitialized = false;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializa Ionic Storage
  async init() {
    await this.storage.create();
    this.storageInitialized = true;
  }

  // Guarda el viaje en Ionic Storage
  async guardarViaje(puntoInicio: Location, puntoDestino: Location) {
    if (!this.storageInitialized) return;
    const viaje = {
      puntoInicio,
      puntoDestino,
      fecha: new Date().toISOString(),
    };
    await this.storage.set('viaje', viaje);
    console.log('Viaje guardado en Ionic Storage:', viaje);
  }

  // Obtiene el viaje almacenado
  async obtenerViaje() {
    if (!this.storageInitialized) return null;
    return await this.storage.get('viaje');
  }

  // Limpia el viaje almacenado
  async limpiarViaje() {
    if (!this.storageInitialized) return;
    await this.storage.remove('viaje');
    console.log('Viaje eliminado de Ionic Storage');
  }
}
