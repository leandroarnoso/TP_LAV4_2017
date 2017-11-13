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
  operacion :string;
  repetidor :any;
  ocultarVerificar :boolean;

  constructor(private router :Router) {
    this.nuevoJuego = new AgilidadAritmetica("Agilidad Aritmetica", this.jugador);
    this.ocultarVerificar = true;
    this.tiempo;
    console.info("Inicio agilidad");  
  }

  ngOnInit() {
    if (!localStorage.getItem("jugador")) {
      this.router.navigate(["/error"]);
    }
    this.CambiarColorFont();
  }

  GenerarNuevo() {
    this.ocultarVerificar = false;
    document.getElementById("input").focus();
    this.tiempo = TIEMPO_INICIAL;
    this.nuevoJuego.GenerarNuevo(0);
    this.CambiarColorFont();
    this.operacion = this.nuevoJuego.numero1 + " " + this.nuevoJuego.operador + " " + this.nuevoJuego.numero2 + " = ";
    this.repetidor = setInterval( () => {
      console.log("tiempo: " + this.tiempo);
      this.tiempo--;
      this.CambiarColorFont();
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
      this.MostrarMensaje("Estas echo todo un Alan Turing", true);
    } else {
      this.tiempo = 0;
      let mensaje :string = this.nuevoJuego.numero1 + this.nuevoJuego.operador + this.nuevoJuego.numero2 + " = " + this.nuevoJuego.resultado + "."; 
      this.MostrarMensaje("Matematicas nivel Chavo del 8. " + mensaje, false);
    }
    this.CambiarColorFont();
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

  private CambiarColorFont () {
    let puntaje = document.getElementById("puntaje");
    let tiempo = document.getElementById("tiempo");
    if (this.tiempo == TIEMPO_INICIAL) {
      puntaje.className = "green";
      tiempo.className = "green";
    } else if (this.tiempo > 7) {
      puntaje.className = "yellowgreen";
      tiempo.className = "yellowgreen";
    } else if (this.tiempo > 5) {
      puntaje.className = "yellow";
      tiempo.className = "yellow";
    } else if (this.tiempo > 3) {
      puntaje.className = "orange";
      tiempo.className = "orange";
    } else if (this.tiempo >= 1) {
      puntaje.className = "orangered";
      tiempo.className = "orangered";
    } else {
      puntaje.className = "red";
      tiempo.className = "red";
    }
  }

  private ValidarNumero(numero) :boolean {
     return numero !== null && !Number.isNaN(numero) && numero > -1001 && numero < 1001
   }

}
