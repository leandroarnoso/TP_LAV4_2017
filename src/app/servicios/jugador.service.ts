import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service'; 

@Injectable()
export class JugadorService {

  private api :string = "http://localhost/backendSalaDeJuegos/";
  //peticion:any;

  constructor( private miHttp: MiHttpService ) {
    
  }

  Crear(path :string, jugador :any)  {
    return this.miHttp.httpPost(this.api + path, jugador);
  }

  Login(path :string, datos :any){
    return this.miHttp.httpPost(this.api + path, datos);
}


  /*public traerJugadores(ruta) {
    return this.miHttp.httpGetO(this.api+ruta)
    .toPromise()
    .then( data => {
      console.log("Archivo jugadores");
     // console.log( data );
      return data;
    }, err => {
      console.log( err );
    })
  }*/



}
