import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  cred = { email: '', password: '' };
  user: Usuario = {
    nombre: '',
    email: '',
    img: null,
    tipo: null,
    username: '',
    apellido: '',
    password: ''
  };
  
  @ViewChild('Registrarse') private _registerForm!: NgForm;
  data: any;
  private _authSrv: any;

  constructor(
    
    private _alertSrv: AlertController,
    private _router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create(); // Inicializa Ionic Storage
  }

  async register() {
    if (this._registerForm.valid) {
      // Asigna el email y password al usuario
      this.user.email = this.cred.email;
      this.user.password = this.cred.password;

      try {
        // Registro de usuario en Firebase Authentication
        const success = await this._authSrv.register(this.cred.email, this.cred.password, this.data.username);
        
        if (success) {
          // Guardar datos adicionales del usuario en Firebase Firestore
          const userSaved = await this._authSrv.saveUserDataToFirestore(this.user);

          if (userSaved) {
            // Guarda el usuario en Ionic Storage
            await this.storage.set('user', this.user);
            this._router.navigate(['/tipocuenta']);
            console.log('Registro exitoso y datos guardados.');
          } else {
            throw new Error('Error al guardar los datos del usuario en Firebase');
          }
        } else {
          throw new Error('Error al registrar el usuario en Firebase Authentication');
        }
      } catch (error) {
        console.error(error);
        await this._showAlert('error_register');
      }
    } else {
      await this._showAlert('missing_data');
    }
  }

  private async _showAlert(type: 'error_register' | 'missing_data') {
    const _alert = await this._alertSrv.create({
      header: type === 'error_register' ? 'Error en el registro' : 'Datos faltantes',
      subHeader: 'Registro',
      message: type === 'error_register' 
        ? 'Ha ocurrido un error al intentar registrarse. Por favor, inténtelo de nuevo.' 
        : 'Por favor, complete todos los campos para poder registrarse.',
      mode: 'ios',
      buttons: ['OK']
    });
    await _alert.present();
  }

  async xd() {
    this._authSrv.deRegister();
  }
}
