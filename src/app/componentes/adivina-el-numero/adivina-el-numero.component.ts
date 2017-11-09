import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// Clases
import { AdivinaElNumero } from '../../clases/adivina-el-numero';
import { Jugador } from '../../clases/jugador';

// Constantes
const INTENTOS_INICIALES = 20;
const PUNTAJE_INICIAL = 10000;

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {
  /*@Output() 
  enviarJuego: EventEmitter<any> = new EventEmitter<any>();*/

  nuevoJuego: AdivinaElNumero;
  jugador :Jugador = JSON.parse(localStorage.getItem("jugador"));
  mensajes :string;
  intentos :number;
  ocultarVerificar :boolean;
 
  constructor(private router :Router) {
    this.nuevoJuego = new AdivinaElNumero(this.jugador);
    this.ocultarVerificar = false;
    this.GenerarNuevo();
  }

  ngOnInit() {
    if (!localStorage.getItem("token")) {
      this.router.navigate(["/error"]);
    }
    this.CambiarColorFondo();
  }

  GenerarNuevo() {
    this.nuevoJuego.GenerarNuevo(10000);
    console.info("numero Secreto:", this.nuevoJuego.numeroSecreto);  
    this.intentos = INTENTOS_INICIALES;
  }

  Verificar()
  {
    this.ocultarVerificar = true;
    console.info("puntaje:", this.nuevoJuego.puntaje);
    console.info("gano:", this.nuevoJuego.gano);    
    if (this.nuevoJuego.Verificar()) {      
      //this.enviarJuego.emit(this.nuevoJuego);
      this.MostrarMensaje("Sos un Genio!!!", true);
      this.nuevoJuego.numeroSecreto = 0;
    } else {
      this.intentos--;
      this.CambiarColorFondo();
      let mensaje :string = this.GenerarMensaje();
      this.MostrarMensaje(mensaje);
    }
    console.info("puntaje:",this.nuevoJuego.puntaje);
    console.info("gano:", this.nuevoJuego.gano);   
  }

  private GenerarMensaje() :string {
    let mensaje :string;
    switch (this.intentos) {
      case INTENTOS_INICIALES-1:
        mensaje = "No, intento fallido, animo.";
        break;
      case INTENTOS_INICIALES-2:
        mensaje = "No, ¿¿¿te estaras Acercando???";
        break;
      case INTENTOS_INICIALES-3:
        mensaje = "No es, Yo crei que la tercera era la vencida.";
        break;
      case INTENTOS_INICIALES-4:
        mensaje = "No era el  " + this.nuevoJuego.numeroIngresado + ".";
        break;
      case INTENTOS_INICIALES-5:
        mensaje = " intentos y nada.";
        break;
      case INTENTOS_INICIALES-6:
        mensaje = "Afortunado en el amor.";
        break;
      case 0:
        mensaje = "Has perdido."
      
      default:
        mensaje = "Ya le erraste " + (INTENTOS_INICIALES - this.intentos) + " veces";
        break;
    }
    return "Intento nro: " + (INTENTOS_INICIALES - this.intentos) + ". " + mensaje + " Ayuda: " + this.nuevoJuego.RetornarAyuda()
  }  

  private MostrarMensaje(mensaje :string = "este es el mensaje", ganador :boolean = false) {
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

  private CambiarColorFondo () {
    var y = document.getElementById("juego");
    if (this.nuevoJuego.puntaje == PUNTAJE_INICIAL) {
      y.className = "green";
    } else if (this.nuevoJuego.puntaje >= 7500) {
      y.className = "yellowgreen";
    } else if (this.nuevoJuego.puntaje >= 5000) {
      y.className = "yellow";
    } else if (this.nuevoJuego.puntaje >= 2500) {
      y.className = "orange";
    } else if (this.nuevoJuego.puntaje >= 0) {
      y.className = "orangered";
    } else {
      y.className = "red";
    }
  }

   private ValidarNumero(numero) :boolean {
     return !Number.isNaN(numero) && numero > 0 && numero < 101
   }

}