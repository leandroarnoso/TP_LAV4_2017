import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// Clases
import { PiedraPapelTijera } from '../../clases/piedra-papel-tijera';
import { Jugador } from '../../clases/jugador';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {
  /*@Output() 
  enviarJuego: EventEmitter<any> = new EventEmitter<any>();*/

  nuevoJuego: PiedraPapelTijera;
  jugador :Jugador = JSON.parse(localStorage.getItem("jugador"));
  mensajes :string;
  ronda :number;
  ocultarVerificar :boolean;
 
  constructor(private router :Router) {
    this.nuevoJuego = new PiedraPapelTijera("Piedra, Papel o Tijera", this.jugador);
    this.ocultarVerificar = true;
    this.ronda = 0;
  }

  ngOnInit() {
    if (!localStorage.getItem("jugador")) {
      this.router.navigate(["/error"]);
    }
    this.CambiarFontColor();
  }

  GenerarNuevo() {
    this.nuevoJuego.GenerarNuevo(0);
    this.ronda = 1;
    this.ocultarVerificar = false;
    this.CambiarFontColor();
  }

  Verificar(opc :number)
  {
    this.nuevoJuego.opcJugador = opc;
    this.ocultarVerificar = true;
    if (this.nuevoJuego.Verificar()) {      
      //this.enviarJuego.emit(this.nuevoJuego);
      if (this.nuevoJuego.derrotas == 0) {
          this.nuevoJuego.puntaje += 4000;
      } else if (this.nuevoJuego.derrotas == 1) {
          this.nuevoJuego.puntaje += 2000;
      }
      this.MostrarMensaje("Ganaste " + this.nuevoJuego.victorias + " a " + this.nuevoJuego.derrotas + ".", 1);
    } else if (this.nuevoJuego.derrotas == 3) {
      this.MostrarMensaje("Perdiste " + this.nuevoJuego.victorias + " a " + this.nuevoJuego.derrotas + ".", -1);
    } else {
      this.ronda++;
      let mensaje :string = this.GenerarMensaje();
      this.MostrarMensaje(mensaje, this.nuevoJuego.resultado);
      this.nuevoJuego.NuevaOpcMaquina();
    }
    this.CambiarFontColor(); 
  }

  private GenerarMensaje() :string {
    let mensaje :string;
    switch (this.nuevoJuego.resultado) {
      case 0:
        mensaje = "Empate.";
        break;
      case -1:
        mensaje = "Derrota.";
        break;
      case 1:
        mensaje = "Victoria.";
        break;
    }

    return mensaje;
  }  

  private MostrarMensaje(mensaje :string = "este es el mensaje", ganador :number) {
    this.mensajes = mensaje;    
    var x = document.getElementById("snackbar");
    if (ganador > 0)
    {
      x.className = "show Ganador";
    } else if (ganador < 0) {
      x.className = "show Perdedor";
    } else {
       x.className = "show Empate";
    }
    var modelo = this;
    setTimeout(function() { 
      x.className = x.className.replace("show", "");
      modelo.ocultarVerificar = false;
    }, 3000);
  }  

  private CambiarFontColor() {
    let puntaje = document.getElementById("puntaje");
    if (this.nuevoJuego.puntaje == 10000) {
      puntaje.className = "green";
    } else if (this.nuevoJuego.puntaje >= 8000) {
      puntaje.className = "yellowgreen";
    } else if (this.nuevoJuego.puntaje >= 6000) {
      puntaje.className = "yellow";
    } else if (this.nuevoJuego.puntaje >= 4000) {
      puntaje.className = "orange";
    } else if (this.nuevoJuego.puntaje >= 2000) {
      puntaje.className = "orangered";
    } else {
      puntaje.className = "red";
    }
  }

}
