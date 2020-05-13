import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServicesService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }



  async alertaInformativa( message: string ) {
    const alert = await this.alertCtrl.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async toastInformativo( message ) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      animated: true,
      color: 'tertiary',
      duration: 2000
    });
    toast.present();
  }

  async toastInformativoError( message ) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }
}
