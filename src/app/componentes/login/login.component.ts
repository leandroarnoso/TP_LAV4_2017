import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
// Clases
import { Jugador } from "../../clases/jugador";
// Servicios
import {JugadorService} from '../../servicios/jugador.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  public email :FormControl = new FormControl('', [
    Validators.required, 
    Validators.minLength(5), 
    Validators.maxLength(30), 
    Validators.email
  ]);
  public password :FormControl = new FormControl('', [
    Validators.required, 
    Validators.minLength(8), 
    Validators.maxLength(12),
    this.ValidarAlfanumerico
  ]);

  mostrarError :boolean = false;
  progreso :number;
  progresoMensaje :string = "esperando..."; 
  mensajeError :string;
  logeando :boolean = false;
  ProgresoDeAncho :string;

  clase :string = "progress-bar progress-bar-info progress-bar-striped ";

  public loginForm :FormGroup = this.formBuilder.group({
    email: this.email,
    password: this.password
  });

  constructor( private formBuilder :FormBuilder, private route :ActivatedRoute, 
    private router :Router, private miJugadorService :JugadorService) {
      this.progreso = 0;
      this.ProgresoDeAncho = "0%";
  }

  ngOnInit() {
  }

  ValidarAlfanumerico(input: FormControl): { [key: string]: boolean } {
    if (input.value.length && !input.value.match(/^[a-z0-9]+$/i)) {
        return { esAlfanumerico: true };
    }
    return null;
  }

  Loguear() {
    this.mostrarError = false;
    let listaUsuarios :Array<Jugador> = JSON.parse(localStorage.getItem("usuarios"));
    if (listaUsuarios) {
      listaUsuarios.forEach(usuario => {
        if (usuario.email == this.loginForm.get("email").value && usuario.password == this.loginForm.get("password").value) {
          localStorage.setItem("jugador", JSON.stringify(usuario));
          this.router.navigate(['']);
        } else {
        this.mensajeError = "Email y/o Contraseña erronea";
        this.mostrarError = true;
        }
      });
    } else {
      this.mensajeError = "No se pudo conectar al servidor";
      this.mostrarError = true;
    }
    this.logeando = false;
    this.progreso = 0;
    this.ProgresoDeAncho = "0%";
  }

  CompletarForm() {
    this.mostrarError = false;
    this.loginForm.setValue({email: "admin@admin.com", password: "12345678"});
  }

  MoverBarraDeProgreso() {
    console.log("inicio");
    this.logeando = true;
    this.clase = "progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje = "NSA spy..."; 
    let timer = TimerObservable.create(200, 50);
    this.subscription = timer.subscribe(t => {
      this.progreso = this.progreso + 1;
      this.ProgresoDeAncho = this.progreso + 20 + "%";
      switch (this.progreso) {
        case 15:
        this.clase = "progress-bar progress-bar-warning progress-bar-striped active";
        this.progresoMensaje = "Verificando ADN..."; 
          break;
        case 30:
          this.clase = "progress-bar progress-bar-Info progress-bar-striped active";
          this.progresoMensaje = "Adjustando encriptación.."; 
          break;
        case 60:
          this.clase = "progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje = "Recompilando Info del dispositivo..";
          break;
        case 75:
          this.clase = "progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Recompilando claves facebook, gmail, chats..";
          break;
        case 85:
          this.clase = "progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Instalando KeyLogger..";
          break;
        case 100:
          console.log("final");
          this.subscription.unsubscribe();
          this.Loguear();
          break;
      }     
    });
  }


  private CargarDatos() {
    let usuarios :Array<any> = [
      {nombreUsuario: "Leandro", email: "admin@admin.com", password: "12345678", sexo: "M"},
      {nombreUsuario: "Loser123", email: "loser@loser.com", password: "12345678", sexo: "M"},
      {nombreUsuario: "Pepe_Rascanuca", email: "pepe@rascanuca.com", password: "12345678", sexo: "M"},
      {nombreUsuario: "Filomena", email: "filo@hotmail.com", password: "12345678", sexo: "F"}
    ];
    let fecha = new Date();
    let resultados :Array<any> = [
      {juego: "Adivina el Número", jugador: "Leandro", puntaje: 9000, fecha: fecha},
      {juego: "Adivina el Número", jugador: "Leandro", puntaje: 4000, fecha: fecha},
      {juego: "Ahorcado", jugador: "Leandro", puntaje: 14000, fecha: fecha},
      {juego: "Ahorcado", jugador: "Leandro", puntaje: 10000, fecha: fecha},
      {juego: "Agilidad Aritmetica", jugador: "Leandro", puntaje: 8000, fecha: fecha},
      {juego: "Agilidad Aritmetica", jugador: "Leandro", puntaje: 8000, fecha: fecha},
      {juego: "Piedra, Papel o Tijera", jugador: "Leandro", puntaje: 8000, fecha: fecha},
      {juego: "Piedra, Papel o Tijera", jugador: "Leandro", puntaje: 10000, fecha: fecha},
      {juego: "Anagrama", jugador: "Leandro", puntaje: 6000, fecha: fecha},
      {juego: "Anagrama", jugador: "Leandro", puntaje: 4000, fecha: fecha},

      {juego: "Adivina el Número", jugador: "Looser123", puntaje: 9000, fecha: fecha},
      {juego: "Adivina el Número", jugador: "Looser123", puntaje: 4000, fecha: fecha},
      {juego: "Ahorcado", jugador: "Looser123", puntaje: 14000, fecha: fecha},
      {juego: "Ahorcado", jugador: "Looser123", puntaje: 10000, fecha: fecha},
      {juego: "Agilidad Aritmetica", jugador: "Looser123", puntaje: 8000, fecha: fecha},
      {juego: "Agilidad Aritmetica", jugador: "Looser123", puntaje: 8000, fecha: fecha},
      {juego: "Piedra, Papel o Tijera", jugador: "Looser123", puntaje: 8000, fecha: fecha},
      {juego: "Piedra, Papel o Tijera", jugador: "Looser123", puntaje: 10000, fecha: fecha},
      {juego: "Anagrama", jugador: "Looser123", puntaje: 6000, fecha: fecha},
      {juego: "Anagrama", jugador: "Looser123", puntaje: 4000, fecha: fecha},

      {juego: "Adivina el Número", jugador: "Pepe_Rascanuca", puntaje: 8000, fecha: fecha},
      {juego: "Adivina el Número", jugador: "Pepe_Rascanuca", puntaje: 2000, fecha: fecha},
      {juego: "Ahorcado", jugador: "Pepe_Rascanuca", puntaje: 2000, fecha: fecha},
      {juego: "Ahorcado", jugador: "Pepe_Rascanuca", puntaje: 10000, fecha: fecha},
      {juego: "Agilidad Aritmetica", jugador: "Pepe_Rascanuca", puntaje: 10000, fecha: fecha},
      {juego: "Agilidad Aritmetica", jugador: "Pepe_Rascanuca", puntaje: 4000, fecha: fecha},
      {juego: "Piedra, Papel o Tijera", jugador: "Pepe_Rascanuca", puntaje: 2000, fecha: fecha},
      {juego: "Piedra, Papel o Tijera", jugador: "Pepe_Rascanuca", puntaje: 8000, fecha: fecha},
      {juego: "Anagrama", jugador: "Pepe_Rascanuca", puntaje: 8000, fecha: fecha},
      {juego: "Anagrama", jugador: "Pepe_Rascanuca", puntaje: 4000, fecha: fecha},
      
      {juego: "Adivina el Número", jugador: "Filomena", puntaje: 3000, fecha: fecha},
      {juego: "Adivina el Número", jugador: "Filomena", puntaje: 10000, fecha: fecha},
      {juego: "Ahorcado", jugador: "Filomena", puntaje: 8000, fecha: fecha},
      {juego: "Ahorcado", jugador: "Filomena", puntaje: 8000, fecha: fecha},
      {juego: "Agilidad Aritmetica", jugador: "Filomena", puntaje: 6000, fecha: fecha},
      {juego: "Agilidad Aritmetica", jugador: "Filomena", puntaje: 8000, fecha: fecha},
      {juego: "Piedra, Papel o Tijera", jugador: "Filomena", puntaje: 8000, fecha: fecha},
      {juego: "Piedra, Papel o Tijera", jugador: "Filomena", puntaje: 4000, fecha: fecha},
      {juego: "Anagrama", jugador: "Filomena", puntaje: 6000, fecha: fecha},
      {juego: "Anagrama", jugador: "Filomena", puntaje: 8000, fecha: fecha}
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("resultados", JSON.stringify(resultados));
    console.log("datos cargados");
  }

}
