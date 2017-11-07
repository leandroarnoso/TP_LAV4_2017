import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {JugadorService} from '../../servicios/jugador.service';

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
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

  progreso :number;
  progresoMensaje :string ="esperando..."; 
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
    let datos = {
      email: this.loginForm.get("email").value,
      password: this.loginForm.get("password").value
    };
    this.miJugadorService.Login("usuario", datos)
    .subscribe( res => {
      if (res) {
        localStorage.setItem("nombreUsuario", JSON.stringify(res.nombre_usuario));
        localStorage.setItem("token", JSON.stringify(res.token));
        this.router.navigate(['']);
      } else {
        console.log("usuario no valido");
      }
    });
    /*if (this.email === 'admin' && this.password === 'admin') {
      this.router.navigate(['/']);
    }*/
  }
  MoverBarraDeProgreso() {
    
    this.logeando = true;
    this.clase = "progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje = "NSA spy..."; 
    let timer = TimerObservable.create(200, 50);
    this.subscription = timer.subscribe(t => {
      console.log("inicio");
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
    //this.logeando=true;
  }

}
