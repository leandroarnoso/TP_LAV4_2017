import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// Clases
import { Anagrama } from '../../clases/anagrama';
import { Jugador } from '../../clases/jugador';

// Constantes
const INTENTOS_INICIALES = 5;
const PUNTAJE_INICIAL = 10000;

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  listado :Array<any>;
  nuevoJuego: Anagrama;
  jugador :Jugador = JSON.parse(localStorage.getItem("jugador"));
  msjAnagrama :string;
  mensajes :string;
  intentos :number;
  ocultarVerificar :boolean;
 
  constructor(private router :Router) {
    this.nuevoJuego = new Anagrama("Anagrama", this.jugador);
    this.ocultarVerificar = true;
    this.intentos = 0;
    //this.GenerarNuevo();
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
    this.nuevoJuego.GenerarNuevo(10000);
    this.msjAnagrama = "Anagrama: " + this.nuevoJuego.anagrama;
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
      this.MostrarMensaje("Correctooooo!!!!", true);
    } else {
      this.intentos--;
      this.CambiarFontColor();
      let mensaje :string = this.GenerarMensaje();
      this.MostrarMensaje(mensaje);
      this.nuevoJuego.palabraIngresada = null;
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
        mensaje = "Has perdido. Esto no es lo tuyo.";
        break;
      case INTENTOS_INICIALES-1:
        mensaje = "No, esa no es la palabra.";
        break;
      case INTENTOS_INICIALES-2:
        mensaje = "No pasa nada, solo es el segundo error";
        break;
      case INTENTOS_INICIALES-3:
        mensaje = "No es, yo crei que la tercera era la vencida.";
        break;
      case INTENTOS_INICIALES-4:
        mensaje = "No era " + this.nuevoJuego.palabraIngresada + " la palabra correcta.";
        break;
      
      default:
        mensaje = "Ya te has equivocado " + (INTENTOS_INICIALES - this.intentos) + " veces";
        break;
    }
    document.getElementById("input").focus();
    return mensaje;
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

   private ValidarPalabra(palabra :string) : boolean {
    return palabra && palabra.length == this.nuevoJuego.palabraSecreta.length && !(!palabra.match(/^[a-zA-Z]+$/));
  }

}
