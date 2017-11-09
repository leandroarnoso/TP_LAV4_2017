import { Component, OnInit } from '@angular/core';
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
    Validators.minLength(6), 
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

  constructor(private formBuilder :FormBuilder, private miJugadorService :JugadorService) { }

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
    if (input.value.length && !input.value.match(/^[a-z0-9]+$/i)) {
      return { esAlfanumerico: true };
    }
    return null;
  }

  Registrar() {
    /*let jugador = {
      nombreUsuario: this.registroForm.get('nombreUsuario').value,
      email: this.registroForm.get('email').value,
      password: this.registroForm.get('password').value,
      sexo: this.registroForm.get('sexo').value
    };*/
    let jugador :Jugador = new Jugador(
      this.registroForm.get('nombreUsuario').value, 
      this.registroForm.get('email').value,
      this.registroForm.get('sexo').value,
      this.registroForm.get('password').value
    );
    this.miJugadorService.Crear("usuario/alta", jugador); 
  }
 
}
