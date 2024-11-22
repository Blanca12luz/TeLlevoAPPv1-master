import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
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

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    // Inicializa Ionic Storage
    await this.storage.create();
  }

  async onRegister() {
    try {
      // Validar que los campos requeridos no estén vacíos
      if (this.usuario.username && this.usuario.password && this.usuario.nombre) {
        // Verifica si el usuario ya existe en Firestore
        const usuarioRef = this.firestore.collection('usuarios').doc(this.usuario.username);
        const usuarioBuscado = await usuarioRef.get().toPromise();

        if (usuarioBuscado?.exists) {
          // Guarda en Firestore
          await usuarioRef.set({
            username: this.usuario.username,
            password: this.usuario.password, // Recuerda encriptar la contraseña
            nombre: this.usuario.nombre,
            email: this.usuario.email,
            tipo: this.usuario.tipo
          });

          // Guarda en Ionic Storage
          await this.storage.set(this.usuario.username, {
            username: this.usuario.username,
            password: this.usuario.password, // Considera no guardar contraseñas sin cifrar localmente
            nombre: this.usuario.nombre,
            email: this.usuario.email,
            tipo: this.usuario.tipo
          });

          console.log('Usuario registrado con éxito en Firestore e Ionic Storage');
          this.router.navigate(['/login']);
        } else {
          // Usuario ya existe
          await this.showAlert('Error', 'El usuario ya existe');
        }
      } else {
        // Campos vacíos
        await this.showAlert('Error', 'Por favor, complete todos los campos');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      await this.showAlert('Error', 'Hubo un problema al registrar el usuario');
    }
  }

  // Método auxiliar para mostrar alertas
  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}