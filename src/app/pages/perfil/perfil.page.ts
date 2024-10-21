import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  constructor() {
    // Inicializa los datos del perfil
    this.username = 'johnDoe';
    this.name = 'John';
    this.lastName = 'Doe';
    this.email = 'johndoe@example.com';
    this.phone = '123-456-7890';
  }

  ngOnInit() {
  }

}




