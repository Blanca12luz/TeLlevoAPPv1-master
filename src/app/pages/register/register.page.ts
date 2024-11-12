import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario'; 
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuario: Usuario = {
    username: '',
    password: '',
    nombre: '',
    apellido: ''
  };

  constructor(private router: Router, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create(); // Inicializa Ionic Storage

    const username = this.router.getCurrentNavigation()?.extras.state;
    if (username !== undefined) {
      // Aquí puedes hacer algo con el username si es necesario
    }
  }

  async onRegister() {
    // Simulamos los métodos `leer` y `guardar` usando Ionic Storage
    const usuarioBuscado = await this.storage.get(this.usuario.username);
    
    if (usuarioBuscado === null) {
      // Guardamos el usuario en Storage si no existe
      await this.storage.set(this.usuario.username, this.usuario);
      console.log('Usuario registrado con éxito');
      this.router.navigate(['/login']);
    } else {
      console.log('El usuario ya existe');
    }

    // Validación básica para asegurarnos de que los campos no estén vacíos
    if (this.usuario.username && this.usuario.password && this.usuario.nombre && this.usuario.apellido) {
      await this.storage.set('usuario', this.usuario);
    } else {
      console.log('Por favor, complete todos los campos');
    }
  }
}
