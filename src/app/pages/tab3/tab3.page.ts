import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { UiServicesService } from '../../services/ui-services.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};

  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiServicesService,
    private postService: PostsService
  ) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    console.log(this.usuario);
  }

  async actualizar( fActualizar: NgForm ) {

    if ( fActualizar.invalid ) { return; }

    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);

    if ( actualizado ) {
      this.uiService.toastInformativo('Se actualizo correctamente');
    } else {
      this.uiService.toastInformativoError('No se logro actualizar');
    }
  }


  logout() {
    this.postService.paginaPost = 0;
    this.usuarioService.logout();
  }

}
