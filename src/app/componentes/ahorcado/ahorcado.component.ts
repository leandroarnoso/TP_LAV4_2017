import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// Clases
import { Ahorcado } from '../../clases/ahorcado';
import { Jugador } from '../../clases/jugador';

// Constantes
const PUNTAJE_INICIAL = 12000;

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  listado :Array<any>;
  nuevoJuego: Ahorcado;
  jugador :Jugador = JSON.parse(localStorage.getItem("jugador"));
  mensajes :string;
  pathAhorcado :string;
  ocultarVerificar :boolean;
  aciertos : number;
 
  constructor(private router :Router) {
    if(this.jugador) {
      this.nuevoJuego = new Ahorcado("Ahorcado", this.jugador);
      this.ocultarVerificar = true;
    }
  }

  ngOnInit() {
    if (!localStorage.getItem("jugador")) {
      this.router.navigate(["/error"]);
    }
    this.listado = JSON.parse(localStorage.getItem("resultados"));
    if (!this.listado) {
      this.listado = new Array();
    }
    this.CambiarFontColor();
  }

  GenerarNuevo() {
    this.aciertos = 0;
    this.nuevoJuego.GenerarNuevo(PUNTAJE_INICIAL);
    this.ocultarVerificar = false;
    this.CambiarFontColor();
    this.pathAhorcado = "./assets/imagenes/ahorcado" + this.nuevoJuego.intentos + ".png";
  }

  Verificar(letra :string)
  {
    this.nuevoJuego.letraIngresada = letra;
    this.ocultarVerificar = true; 
    if (this.nuevoJuego.Verificar()) {      
      this.MostrarMensaje("Has sobrevivido.", true);
    } else {
      this.CambiarFontColor();
      let mensaje :string = this.GenerarMensaje();
      this.MostrarMensaje(mensaje);
      this.pathAhorcado = "./assets/imagenes/ahorcado" + this.nuevoJuego.intentos + ".png";
    }
    if (!this.nuevoJuego.intentos) {
      this.GuardarJuego();  
    }
  }

  private GuardarJuego() {
    let resultado = {
      juego: this.nuevoJuego.nombre,
      jugador: this.nuevoJuego.jugador.nombreUsuario,
      puntaje: this.nuevoJuego.puntaje,
      fecha: new Date()
    }
    this.listado.push(resultado);
    localStorage.setItem("resultados", JSON.stringify(this.listado));
  }

  private GenerarMensaje() :string {
    let mensaje :string;
    if (this.aciertos == this.nuevoJuego.letrasCorrectas.length) {
      switch (this.nuevoJuego.intentos) {
        case 0:
          mensaje = "R.I.P.";
          break;
        case 1:
          mensaje = "Un solo intento mas, estas al horno.";
          break;
        case 2:
          mensaje = "Solo dos intentos mas y se acabo.";
          break;
        case 3:
          mensaje = "Bueno empeza a ponerle onda porque asi vamos mal.";
          break;
        case 4:
          mensaje = "No te desanimes, segui intentando.";
          break;
        case 5:
          mensaje = "No pasa nada, solo es un error, vos podes.";
          break;
        
      }
    } else {
      mensaje = "Bien, segui asi.";
      this.aciertos++;
    }
    return mensaje;
  }  

  private MostrarMensaje(mensaje :string, ganador :boolean = false) {
    this.mensajes = mensaje;    
    var x = document.getElementById("snackbar");
    if (ganador)
    {
      x.className = "show Ganador";
    } else {
      x.className = "show Perdedor";
    }
    var modelo = this;
    setTimeout(function() { 
      x.className = x.className.replace("show", "");
      modelo.ocultarVerificar = false;
    }, 3000);
    console.info("objeto", x);
  }  

  private CambiarFontColor() {
    let puntaje = document.getElementById("puntaje");
    let intentos = document.getElementById("intentos");
    if (this.nuevoJuego.puntaje == PUNTAJE_INICIAL) {
      puntaje.className = "green";
      intentos.className = "green";
    } else if (this.nuevoJuego.puntaje >= 9000) {
      puntaje.className = "yellowgreen";
      intentos.className = "yellowgreen";
    } else if (this.nuevoJuego.puntaje >= 6000) {
      puntaje.className = "yellow";
      intentos.className = "yellow";
    } else if (this.nuevoJuego.puntaje >= 3000) {
      puntaje.className = "orange";
      intentos.className = "orange";
    } else if (this.nuevoJuego.puntaje > 0) {
      puntaje.className = "orangered";
      intentos.className = "orangered";
    } else {
      puntaje.className = "red";
      intentos.className = "red";
    }
  }

}
