import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators }   from '@angular/forms';
// Clases 
import { Jugador } from '../../clases/jugador';
// Servicios
import { JugadorService } from '../../servicios/jugador.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  sexos = ["M", "F"];

  public nombreUsuario :FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3), 
    Validators.maxLength(20),
    this.ValidarAlfanumerico 
  ]);
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
  public pswRepeat :FormControl = new FormControl('', [
    Validators.required, 
    Validators.minLength(8), 
    Validators.maxLength(12),
    this.ValidarAlfanumerico,
    this.ValidarPassword
  ]);
  public sexo :FormControl = new FormControl('', [
    Validators.required
  ]);
  public condiciones :FormControl = new FormControl('', [
    Validators.required
  ]);

  public registroForm :FormGroup = this.formBuilder.group({
    nombreUsuario : this.nombreUsuario,
    email: this.email,
    password: this.password,
    pswRepeat: this.pswRepeat,
    sexo: this.sexo,
    condiciones: this.condiciones
  });

  constructor(private formBuilder :FormBuilder, private miJugadorService :JugadorService, private router :Router) { }

  ngOnInit() {
  }

  ValidarPassword(input: FormControl) {
      if (input.root.get('password') == null) {
        return null;
      }

      const verificar = input.root.get('password').value === input.value;
      return verificar ? null : { mismoPassword : true };
  }

  ValidarAlfanumerico(input: FormControl): { [key: string]: boolean } {
    if (input.value.length && !input.value.match(/^[a-zA-Z0-9]+$/i)) {
      return { esAlfanumerico: true };
    }
    return null;
  }

  Registrar() {
    let listaUsuarios :Array<Jugador> = JSON.parse(localStorage.getItem("usuarios"));
    let jugador :Jugador = new Jugador(
      this.registroForm.get('nombreUsuario').value, 
      this.registroForm.get('email').value,
      this.registroForm.get('sexo').value,
      this.registroForm.get('password').value
    );
    if (!listaUsuarios) {
      listaUsuarios = new Array();
    }
    listaUsuarios.push(jugador);
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    this.router.navigate(["/login"]);
  }
 
}
