import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
// Clases
import { AgilidadAritmetica } from '../../clases/agilidad-aritmetica';
import { Jugador } from '../../clases/jugador';

// Constantes
const TIEMPO_INICIAL = 10;

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
  //@Output() 
  //enviarJuego :EventEmitter<any> = new EventEmitter<any>();

  nuevoJuego :AgilidadAritmetica;
  jugador :Jugador = JSON.parse(localStorage.getItem("jugador"));
  mensajes :string;
  tiempo :number;
  repetidor :any;
  ocultarVerificar :boolean;

  constructor(private router :Router) {
    this.nuevoJuego = new AgilidadAritmetica(this.jugador);
    this.ocultarVerificar = true;
    this.tiempo = TIEMPO_INICIAL;
    console.info("Inicio agilidad");  
  }

  ngOnInit() {
    if (!localStorage.getItem("token")) {
      this.router.navigate(["/error"]);
    }
    this.CambiarColorFondo();
  }

  GenerarNuevo() {
    this.ocultarVerificar = false;
    this.nuevoJuego.numeroIngresado = null;
    document.getElementById("input").focus();
    this.tiempo = TIEMPO_INICIAL;
    this.CambiarColorFondo();
    this.nuevoJuego.GenerarNuevo(0);
    this.repetidor = setInterval( () => {
      console.log("tiempo: " + this.tiempo);
      this.tiempo--;
      this.CambiarColorFondo();
      if (this.tiempo == 0 ) {
        this.Verificar();
      }
    }, 900);
  }

  Verificar() {
    this.ocultarVerificar = true;
    clearInterval(this.repetidor);
    if (this.nuevoJuego.Verificar()) {      
      //this.enviarJuego.emit(this.nuevoJuego);
      this.nuevoJuego.puntaje = this.tiempo * 1000;
      //this.tiempo = TIEMPO_INICIAL;
      this.MostrarMensaje("Sos un Genio!!!", true);
    } else {
      this.tiempo = 0;
      let mensaje :string = this.nuevoJuego.numero1 + this.nuevoJuego.operador + this.nuevoJuego.numero2 + " = " + this.nuevoJuego.resultado + "."; 
      this.MostrarMensaje("Sos un Nabo!!! " + mensaje, false);
      //let mensaje :string = this.GenerarMensaje();
      //this.MostarMensaje(mensaje);
    }
    this.CambiarColorFondo();
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
      //modelo.tiempo = TIEMPO_INICIAL;
    }, 3000);
    console.info("objeto", x);
  }  

  private CambiarColorFondo () {
    var y = document.getElementById("juego");
    if (this.tiempo == TIEMPO_INICIAL) {
      y.className = "green";
    } else if (this.tiempo > 7) {
      y.className = "yellowgreen";
    } else if (this.tiempo > 5) {
      y.className = "yellow";
    } else if (this.tiempo > 3) {
      y.className = "orange";
    } else if (this.tiempo >= 1) {
      y.className = "orangered";
    } else {
      y.className = "red";
    }
  }

  private ValidarNumero(numero) :boolean {
     return !Number.isNaN(numero) && numero > -1001 && numero < 1001
   }

}
