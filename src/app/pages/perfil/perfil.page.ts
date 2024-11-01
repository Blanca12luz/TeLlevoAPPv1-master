import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

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

  constructor(private storage: Storage) {
    // Inicializa las variables
    this.username = '';
    this.name = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
  }

  async ngOnInit() {
    // Inicializar el almacenamiento
    await this.storage.create();

    // Recuperar el usuario de IonicStorage
    const usuarioGuardado = await this.storage.get('usuario');

    if (usuarioGuardado) {
      // Asignar los valores del usuario a las variables del perfil
      this.username = usuarioGuardado.username;
      this.name = usuarioGuardado.nombre; // Asegúrate de que el campo 'nombre' existe en el registro
      this.lastName = usuarioGuardado.apellido; // Asegúrate de que el campo 'apellido' existe en el registro
      // Si tienes otros campos como email y phone, asegúrate de que también se guarden durante el registro
    } else {
      console.log('No hay usuario registrado');
      // Aquí puedes agregar un mensaje para el usuario
    }
  }
}