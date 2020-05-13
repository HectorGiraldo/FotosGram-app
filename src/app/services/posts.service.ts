import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post, RespuestaPost } from '../../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPost = 0;
  nuevoPost = new EventEmitter<Post>();
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private fileTransfer: FileTransfer
  ) { }


  getPost( pull: boolean = false) {

    if( pull ) {
      this.paginaPost = 0;
    }
    this.paginaPost ++;
    return this.http.get<RespuestaPosts>(`${URL}/post/?pagina=${this.paginaPost}`);
  }

  crearPost( post ) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve => {
      this.http.post<RespuestaPost>(`${URL}/post`, post, {headers} ).subscribe( resp => {
        console.log(resp);
        if ( resp.ok ) {
          this.nuevoPost.emit( resp.post );
          resolve( true );
        }
      }, err => {
        if ( err ) {
          resolve( false );
        }
      });

    });
  }

  subirImagen( img: string ) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload( img, `${URL}/post/upload`, options )
      .then( data => {
        console.log(data);
      }).catch( err => {
        console.log('error en carga', err);
      });
  }
}
