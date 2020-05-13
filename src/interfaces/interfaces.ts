export interface RespuestaPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
}

export interface Post {
  imgs?: string[];
  _id?: string;
  mensaje?: string;
  coords?: string;
  usuario?: Usuario;
  created?: string;
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;  
  password?: string;
}

export interface RespuestaUsuario {
  ok: boolean;
  usuario: Usuario;
  token: string;
}


export interface RespuestaPost {
  ok: boolean;
  post: Post;
}



