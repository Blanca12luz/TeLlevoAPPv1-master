import { environment } from './../../../environments/environment.prod';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  static forRoot(): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }
  @ViewChild('map', { static: false }) mapElement: ElementRef | undefined;
  private map: GoogleMap | undefined;

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
      apiKey: environment.googleMapsApiKey, // Usa la clave API del entorno
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });

    // Añadir un listener para manejar clicks en el mapa
    await this.map.setOnMapClickListener((event) => {
      const { latitude, longitude } = event;
      console.log(`Clicked at: ${latitude}, ${longitude}`);
    });
  }
}