import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// Clases
import { AdivinaElNumero } from '../../clases/adivina-el-numero';
import { Jugador } from '../../clases/jugador';

// Constantes
const INTENTOS_INICIALES = 10;
const PUNTAJE_INICIAL = 10000;

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {

  listado :Array<any>;
  nuevoJuego: AdivinaElNumero;
  jugador :Jugador = JSON.parse(localStorage.getItem("jugador"));
  mensajes :string;
  intentos :number;
  ocultarVerificar :boolean;
 
  constructor(private router :Router) {
    if (this.jugador) {
      this.nuevoJuego = new AdivinaElNumero("Adivina el Número", this.jugador);
      this.ocultarVerificar = true;
      this.intentos = 0;
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
    this.nuevoJuego.GenerarNuevo(PUNTAJE_INICIAL);
    console.info("numero Secreto:", this.nuevoJuego.numeroSecreto);  
    this.intentos = INTENTOS_INICIALES;
    this.ocultarVerificar = false;
    document.getElementById("input").focus();
    this.CambiarFontColor();
  }

  Verificar()
  {
    this.ocultarVerificar = true; 
    if (this.nuevoJuego.Verificar()) {      
      this.intentos = 0;
      this.MostrarMensaje("Acertaste, te ganaste un flynn paff", true);
    } else {
      this.intentos--;
      this.CambiarFontColor();
      let mensaje :string = this.GenerarMensaje();
      this.MostrarMensaje(mensaje);
      this.nuevoJuego.numeroIngresado = null;
    }
    if (!this.intentos) {
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
    switch (this.intentos) {
      case 0:
        mensaje = "Has perdido. Mejor dedicate a la bolita.";
        break;
      case INTENTOS_INICIALES-1:
        mensaje = "No, intento fallido, animo.";
        break;
      case INTENTOS_INICIALES-2:
        mensaje = "No, ¿¿¿te estaras accercando???";
        break;
      case INTENTOS_INICIALES-3:
        mensaje = "No es, yo crei que la tercera era la vencida.";
        break;
      case INTENTOS_INICIALES-4:
        mensaje = "No era " + this.nuevoJuego.numeroIngresado + ".";
        break;
      case INTENTOS_INICIALES-5:
        mensaje = INTENTOS_INICIALES-5 + " intentos y nada.";
        break;
      case INTENTOS_INICIALES-6:
        mensaje = "Afortunado en el amor.";
        break;
      
      default:
        mensaje = "Ya te has equivocado " + (INTENTOS_INICIALES - this.intentos) + " veces";
        break;
    }
    document.getElementById("input").focus();
    return mensaje + " Ayuda: " + this.nuevoJuego.RetornarAyuda()
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

  private CambiarFontColor() {
    let puntaje = document.getElementById("puntaje");
    let intentos = document.getElementById("intentos");
    if (this.nuevoJuego.puntaje == PUNTAJE_INICIAL) {
      puntaje.className = "green";
      intentos.className = "green";
    } else if (this.nuevoJuego.puntaje >= 8000) {
      puntaje.className = "yellowgreen";
      intentos.className = "yellowgreen";
    } else if (this.nuevoJuego.puntaje >= 6000) {
      puntaje.className = "yellow";
      intentos.className = "yellow";
    } else if (this.nuevoJuego.puntaje >= 4000) {
      puntaje.className = "orange";
      intentos.className = "orange";
    } else if (this.nuevoJuego.puntaje >= 2000) {
      puntaje.className = "orangered";
      intentos.className = "orangered";
    } else {
      puntaje.className = "red";
      intentos.className = "red";
    }
  }

   private ValidarNumero(numero) :boolean {
     return !Number.isNaN(numero) && numero > 0 && numero < 101
   }

}