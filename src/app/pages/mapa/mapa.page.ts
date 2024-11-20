import { ViajeService } from './../../service/viaje.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Location } from './../../interfaces/location';

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
    await this.getCurrentLocation();
  }

  async createMap() {
    if (!this.mapElement) {
      console.error('mapElement is undefined');
      return;
    }

    const mapRef = this.mapElement.nativeElement;

    try {
      this.map = await GoogleMap.create({
        id: 'my-map',
        element: mapRef,
        apiKey: this.getApiKey(), // Mover la clave a un método o variable de entorno
        config: {
          center: { lat: 33.6, lng: -117.9 },
          zoom: 14,
        },
      });
    } catch (error) {
      console.error('Error al crear el mapa:', error);
    }
  }

  private getApiKey(): string {
    // Aquí podrías cargar la clave de API desde un archivo de configuración o variable de entorno
    return 'AIzaSyAaBSfpqmASg5IN8ywbZQpDveMIR7PMxn4';
  }

  async getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const currentLocation: Location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          await this.map?.setCamera({
            coordinate: currentLocation,
            zoom: 14,
          });
          await this.map?.addMarkers([
            {
              coordinate: currentLocation,
              title: "Tu Ubicación",
            },
          ]);
        },
        (error) => {
          console.error("Error al obtener la ubicación actual: ", error);
        }
      );
    } else {
      console.error("Geolocalización no es soportada por este navegador.");
    }
  }

  async guardarViaje() {
    if (this.puntoInicio && this.puntoDestino) {
      try {
        await this.viajeService.guardarViaje(this.puntoInicio, this.puntoDestino);
        console.log('Viaje guardado correctamente en Ionic Storage');
      } catch (error) {
        console.error('Error al guardar el viaje:', error);
      }
    } else {
      console.log('Puntos de inicio o destino no definidos');
    }
  }
}