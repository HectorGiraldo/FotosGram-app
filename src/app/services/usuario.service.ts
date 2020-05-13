import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { RespuestaUsuario, Usuario } from '../../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  login( email: string, password: string) {
    const data = { email, password };

    return new Promise( resolve => {

      this.http.post<RespuestaUsuario>(`${URL}/user/login`, data).subscribe( async resp => {

        if ( resp.ok ) {
          await this.guardarToken(resp.token);
          resolve(true);

        }
      }, err => {
        if ( err ) {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });

  }

  logout() {
    this.token   = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', {animated: true});
  }

  registro( usuario: Usuario) {
    return new Promise( resolve => {
      this.http.post<RespuestaUsuario>(`${URL}/user/create`, usuario).subscribe( async resp => {

        console.log(resp);

        if ( resp.ok ) {
          await this.guardarToken(resp.token);
          resolve(true);
        }

      }, err => {
        if ( err ) {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      }
      );
    });
  }

  getUsuario() {
    if (!this.usuario._id) {
      this.validaToken();
    }
    return {...this.usuario};
  }

  async guardarToken( token ) {
    this.token = token;
    await this.storage.set( 'token', token );
    await this.validaToken();
  }

  async cargarStorage() {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean> {

    await this.cargarStorage();

    if ( !this.token ) {
      this.navCtrl.navigateRoot('/login', {animated: true});
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get<RespuestaUsuario>( `${URL}/user/`, {headers} ).subscribe( resp => {
        if ( resp.ok ) {
          this.usuario = resp.usuario;
          resolve(true);
        }
      }, err => {
        if ( err ) {
          this.navCtrl.navigateRoot('/login', {animated: true});
          resolve(false);
        }
      }
      );
    });
  }

  actualizarUsuario( usuario: Usuario ) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise( resolve => {
      this.http.put<RespuestaUsuario>(`${URL}/user/update`, usuario, {headers}).subscribe( resp => {
        console.log('respuesta', resp);

        if ( resp.ok ) {
          console.log('ok');
          this.guardarToken(resp.token);
          resolve(true);
        }
      }, err => {
        if ( err ) {
          console.log('error');
          resolve(false);
        }
      });
    });




  }





}
