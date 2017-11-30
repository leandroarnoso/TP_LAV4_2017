import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// Clases
import { Jugador } from "../../clases/jugador";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  title :string = "SALA DE JUEGOS";
  nombreUsuario :string = "";

  constructor(private route :ActivatedRoute, private router :Router) { }

  ngOnInit() {
    this.Cargar();
  }

  Cargar(ev :any = null) {
    let jugador :Jugador = JSON.parse(localStorage.getItem("jugador"));
    if (jugador) {
      this.nombreUsuario = jugador.nombreUsuario;
    } else {
      this.nombreUsuario = "";
    }
  }

  GoTo(tipo: string) {
    switch (tipo) {
      case 'Adivina':
        this.router.navigate(['/juegos/adivina-el-numero']);
        break;
      case 'Agilidad':
        this.router.navigate(['/juegos/agilidad-aritmetica']);
        break;
      case 'PPT':
        this.router.navigate(['/juegos/piedra-papel-tijera']);
        break;
      case 'Anagrama':
        this.router.navigate(['/juegos/anagrama']);
        break;
      case 'Ahorcado':
        this.router.navigate(['/juegos/ahorcado']);
        break;
    }
  }

}
