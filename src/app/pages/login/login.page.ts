import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
    // Inicializar el almacenamiento
    // Inicializar el almacenamiento
    this.storage['create']();
  }

  async onLogin() {
    // Recuperar el usuario de IonicStorage
    const usuarioGuardado = await this.storage['get']('usuario');
    
    if (usuarioGuardado) {
      // Validar las credenciales
      if (this.usuario.username === usuarioGuardado.username && this.usuario.password === usuarioGuardado.password) {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(["/home"]);
      } else {
        console.log('Credenciales incorrectas');
        // Aquí puedes agregar un mensaje para el usuario
      }
    } else {
      console.log('No hay usuario registrado');
      // Aquí puedes agregar un mensaje para el usuario
    }
  }
}