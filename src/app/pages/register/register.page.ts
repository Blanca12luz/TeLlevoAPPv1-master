import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario'; 


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
    email: null,
    tipo: null,
  };

  constructor(private router: Router, private firestore: AngularFirestore) { }

  ngOnInit() {}

  async onRegister() {
    try {
      if (this.usuario.username && this.usuario.password && this.usuario.nombre) {
        // Referencia a la colección de usuarios en Firestore
        const usuarioRef = this.firestore.collection('usuarios').doc(this.usuario.username);
        const usuarioBuscado = await usuarioRef.get().toPromise();

        if (usuarioBuscado?.exists) {
          // Agregar el usuario a la base de datos Firestore
          await usuarioRef.set({
            username: this.usuario.username,
            password: this.usuario.password, // Recuerda encriptar la contraseña
            nombre: this.usuario.nombre,
            email: this.usuario.email,
            tipo: this.usuario.tipo
          });
          console.log('Usuario registrado con éxito');
          this.router.navigate(['/login']);
        } else {
          console.log('El usuario ya existe');
        }
      } else {
        console.log('Por favor, complete todos los campos');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }
}
