import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-rpass',
  templateUrl: './rpass.page.html',
  styleUrls: ['./rpass.page.scss'],
})
export class RpassPage implements OnInit {

  usuario = {
    username: ''
  }

  accion: string = ''

  alertButtons = [{
    text: 'Aceptar',
    cssClass:'btnAceptarStyle',
    handler: () => {
      this.accion = 'Presionó Aceptar';
    }
  },{
    text: 'Cancelar',
    cssClass:'btnCancelarStyle',
    handler: () => {
      this.accion = "Presionó Cancelar";
    }
}]

  constructor(private alertctrl: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async mostrarAlerta() {
    const alert = await this.alertctrl.create({
      header: 'Confirmaste recuperar tu contraseña',
      message: 'recuperaste tu contraseña, vuelve a iniciar sesion',
      buttons: [{
        text: 'Aceptar',
        handler:()=>{
          this.router.navigate(["/login"]);
        }
      },'Cancelar'],
    });

    await alert.present();
  }
}