import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServicesService } from '../../services/ui-services.service';
import { Usuario } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal',{static: true}) slides: IonSlides;



  loginUser: Usuario = {
    email: '',
    password: ''
  };

  registerUser: Usuario = {
    email: '',
    password: '',
    nombre: '',
    avatar: ''
  };


  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServicesService
  ) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login( fLogin: NgForm ) {

    if (fLogin.invalid) { return; }

    console.log(fLogin.valid);
    console.log(this.loginUser);

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    if ( valido ) {
      console.log('inicio sesion');
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated : true});
    } else {
      console.log('error');
      this.uiService.alertaInformativa('Usuario o contraseña errados');

    }

  }

  async registro( fRegistro: NgForm ) {

    if (fRegistro.invalid) { return; }

    const valido = await this.usuarioService.registro(this.registerUser);

    if ( valido ) {
      console.log('inicio sesion');
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated : true});
    } else {
      console.log('error');
      this.uiService.alertaInformativa('Este correo electronico ya existe');

    }

  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
