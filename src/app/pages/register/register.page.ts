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
  db: any;

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
    let username = this.router.getCurrentNavigation()?.extras.state
    if (username !== undefined) {
      // Aquí puedes hacer algo con el username si es necesario
    }
  }

  async onRegister() {
    // 
    let buscado = this.db.leer(this.usuario.username);
    buscado.then(async (usuariobuscado: null) => {
      if (usuariobuscado === null) {
        this.db.guardar(this.usuario.username, this.usuario)
      }
      else {
        console.log("El usuario ya existe")
      }

      // Validación básica para asegurarnos de que los campos no estén vacíos
      if (this.usuario.username && this.usuario.password && this.usuario.nombre && this.usuario.apellido) {
        // Guardamos el objeto usuario en IonicStorage
        await this.storage.set('usuario', this.usuario);
        console.log('Usuario registrado con éxito');
        this.router.navigate(["/login"]);
      } else {
        console.log('Por favor, complete todos los campos');
      }
    })
  }
}

//prueba para el pull 