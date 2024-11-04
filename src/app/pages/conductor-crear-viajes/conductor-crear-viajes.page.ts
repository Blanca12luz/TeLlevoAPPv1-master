import { Location } from './../../interfaces/location';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';


@Component({
  selector: 'app-conductor-crear-viajes',
  templateUrl: './conductor-crear-viajes.page.html',
  styleUrls: ['./conductor-crear-viajes.page.scss'],
})
export class ConductorCrearViajesPage implements OnInit {
  public datetime: any;
  private map: GoogleMap | undefined;
  private puntoInicio: Location | undefined;
  private puntoDestino: Location | undefined;

  @ViewChild('map', { static: false }) mapElement: ElementRef | undefined;

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

  async ngAfterViewInit() {
    await this.createMap();
  }

  async createMap() {
    if (!this.mapElement) {
      console.error('mapElement is undefined');
      return;
    }

    const mapRef = this.mapElement.nativeElement;

    this.map = await GoogleMap.create({
      id: 'my-map',
      element: mapRef,
      apiKey: 'AIzaSyAaBSfpqmASg5IN8ywbZQpDveMIR7PMxn4', // Reemplaza con tu clave API
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });

    // Añadir un listener para manejar clicks en el mapa
    await this.map.setOnMapClickListener(async (event) => {
      const { latitude, longitude } = event;
      console.log(`Clicked at: ${latitude}, ${longitude}`);

      if (!this.puntoInicio) {
        // Configura el punto de inicio y crea un marcador
        this.puntoInicio = { lat: latitude, lng: longitude };
        console.log('Punto de inicio establecido:', this.puntoInicio);

        await this.map?.addMarkers([
          {
            coordinate: this.puntoInicio,
            title: "Punto de Inicio",
          },
        ]);
      } else if (!this.puntoDestino) {
        // Configura el punto de destino y crea un marcador
        this.puntoDestino = { lat: latitude, lng: longitude };
        console.log('Punto de destino establecido:', this.puntoDestino);

        await this.map?.addMarkers([
          {
            coordinate: this.puntoDestino,
            title: "Punto de Destino",
          },
        ]);
      } else {
        // Si ya existen ambos puntos, puedes implementar lógica adicional aquí, como reiniciar o mover marcadores
        console.log('Ambos puntos ya están establecidos');
      }
    });
  }

  viajecreado() {
    console.log("viaje creado");
  }
}
