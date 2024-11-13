import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-creador-viaje',
  templateUrl: './creador-viaje.page.html',
  styleUrls: ['./creador-viaje.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreadorViajePage implements OnInit {

  public datetime: any;
  public nombre: string = '';
  public fecha: any;
  public espacioDisponible: number = 1;
  public precio: number | null = null;
  public viajes: any[] = []; // Arreglo para almacenar y mostrar los viajes creados

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create(); // Inicializar el almacenamiento

    // Configurar la fecha inicial
    const date = new Date();
    let dayChange = -2;

    if (date.getDate() + dayChange <= 0) {
      dayChange = -dayChange;
    }

    date.setDate(date.getDate() + dayChange);
    this.fecha = date.toISOString(); // Almacenar en `this.fecha`

    // Cargar los viajes guardados en el arreglo `viajes`
    const storedViajes = await this.storage.get('viajes');
    if (storedViajes) {
      this.viajes = storedViajes;
    }
  }

  async viajecreado() {
    if (this.precio === null || isNaN(this.precio)) {
      console.log("El precio debe ser un número válido");
      return;
    }

    // Crear un objeto de viaje con los datos actuales
    const nuevoViaje = {
      nombre: this.nombre,
      fecha: this.fecha,
      espacioDisponible: this.espacioDisponible,
      precio: this.precio
    };

    // Agregar el nuevo viaje al arreglo de viajes
    this.viajes.push(nuevoViaje);

    // Guardar el arreglo de viajes actualizado en el storage
    await this.storage.set('viajes', this.viajes);

    console.log("Viaje creado y datos guardados");

    // Limpiar los campos después de crear el viaje
    this.nombre = '';
    const resetDate = new Date(); // Crear una nueva fecha para resetear
    resetDate.setDate(resetDate.getDate() - 2); // Aplicar el cambio de días
    this.fecha = resetDate.toISOString(); // Asignar el valor actualizado a `this.fecha`
    this.espacioDisponible = 1;
    this.precio = null;
  }
}
