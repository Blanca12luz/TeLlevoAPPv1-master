import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {
  username: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  patente:string;
  Vehiculo:string;
  constructor(private router: Router) { 
        // Inicializa los datos del perfil
        this.username = 'johnDoe';
        this.name = 'John';
        this.lastName = 'Doe';
        this.email = 'johndoe@example.com';
        this.phone = '123-456-7890';
        this.patente = 'AAA-AAA'
        this.Vehiculo = 'Toyota'
  }

  ngOnInit() {
  }

  onSalir() {
    this.router.navigate(['/login'])
  }

}
