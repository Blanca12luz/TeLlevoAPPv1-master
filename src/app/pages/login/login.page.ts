import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



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

  constructor(
    private _alertSrv: AlertController,
    private _router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {}

  async login() {
    // Validar que los campos no estén vacíos
    if (!this.cred.email || !this.cred.password) {
      await this._showAlert('missing_data');
      return;
    }
  
    try {
      // Asegurarse de que email no sea null antes de usarlo
      if (this.cred.email) {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(this.cred.email, this.cred.password);
        
        // Si la autenticación es exitosa
        const user = userCredential.user;
        if (user && user.email) {  // Asegúrate de que user.email no sea null
          console.log('Usuario autenticado con éxito:', user.email);
  
          // Obtener información del usuario desde Firestore si es necesario
          const usuarioRef = this.firestore.collection('usuarios').doc(user.email);
          const usuarioDoc = await usuarioRef.get().toPromise();
          
          if (usuarioDoc && usuarioDoc.exists) {
            console.log('Datos del usuario:', usuarioDoc.data());
            localStorage.setItem('usuario', JSON.stringify(user.email));
            this._router.navigate(['/home']);
          } else {
            console.log('El usuario no se encuentra en la base de datos de Firestore');
          }
        } else {
          console.error('El correo del usuario es null o no está disponible');
        }
      }
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      // Manejo de errores
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        await this._showAlert('invalid_credential');
      } else {
        await this._showAlert('unknown_error');
      }
    }
  }
  private _showAlert(arg0: string) {
    throw new Error('Method not implemented.');
  }
}  