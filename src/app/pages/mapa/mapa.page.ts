import { ViajeService } from './../../service/viaje.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Location } from './../../interfaces/location';


declare var google: any; // Para acceder a la API de Google Places

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  public map: GoogleMap | undefined;
  public puntoInicio: Location | undefined;
  public puntoDestino: Location | undefined;
  public lugarInicio: string = '';
  public lugarDestino: string = '';

  @ViewChild('map', { static: false }) mapElement: ElementRef | undefined;

  constructor(public viajeService: ViajeService) {}

  ngOnInit() {}

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
  }

  async buscarLugares() {
    // Inicializa el servicio de Places
    const service = new google.maps.places.PlacesService(this.mapElement);

    // Buscar el lugar de inicio
    if (this.lugarInicio) {
      service.findPlaceFromQuery(
        {
          query: this.lugarInicio,
          fields: ['name', 'geometry'],
        },
        (results: any[], status: any) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
            this.puntoInicio = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            };
            this.map?.setCamera({
              coordinate: this.puntoInicio,
              zoom: 14,
            });
            this.map?.addMarkers([
              {
                coordinate: this.puntoInicio,
                title: "Inicio",
              },
            ]);
          }
        }
      );
    }

    // Buscar el lugar de destino
    if (this.lugarDestino) {
      service.findPlaceFromQuery(
        {
          query: this.lugarDestino,
          fields: ['name', 'geometry'],
        },
        (results: any[], status: any) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
            this.puntoDestino = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            };
            this.map?.addMarkers([
              {
                coordinate: this.puntoDestino,
                title: "Destino",
              },
            ]);
          }
        }
      );
    }
  }

  async guardarViaje() {
    if (this.puntoInicio && this.puntoDestino) {
      await this.viajeService.guardarViaje(this.puntoInicio, this.puntoDestino);
      console.log('Viaje guardado correctamente en Ionic Storage');
    }
  }
}
