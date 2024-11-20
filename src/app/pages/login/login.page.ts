import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  cred = {
    email: '',
    password: ''
  };
  private _authSrv: any;

  constructor(
    
    private _alertSrv: AlertController,
    private _router: Router,
    private storage: Storage
  ) { }

  async ngOnInit() {
    await this.storage.create(); // Inicializa Ionic Storage
  }

  async login() {
    // Validar que los campos no estén vacíos
    if (!this.cred.email || !this.cred.password) {
      await this._showAlert('missing_data');
      return;
    }

    // Intentar iniciar sesión
    const success = await this._authSrv.login(this.cred.email, this.cred.password);
    
    if (success.status === 'success') {
      // Guarda el usuario en el almacenamiento local si es necesario
      await this.storage.set('usuario', { email: this.cred.email });
      this._router.navigate(['/home']);
    } else if (success.status === 'error' && success.error === 'invalid-credential') {
      await this._showAlert('invalid_credential');
    } else {
      await this._showAlert('unknown_error'); // Manejo de errores desconocidos
    }
  }

  private async _showAlert(type: 'invalid_credential' | 'missing_data' | 'unknown_error') {
    const _alert = await this._alertSrv.create({
      header: type === 'invalid_credential' ? 'Error al Iniciar Sesión' : 'Datos faltantes',
      subHeader: 'Iniciar sesión',
      message: type === 'invalid_credential' 
        ? 'Tu correo o contraseña no existen o no son correctas. Por favor, inténtelo de nuevo.'
        : 'Por favor, complete todos los campos para poder iniciar sesión.',
      mode: 'ios',
      buttons: ['OK']
    });
    await _alert.present();
  }
}