import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  nombreUsuario :string = localStorage.getItem("nombreUsuario");
  title :string = "Sala de Juegos";

  constructor(private route :ActivatedRoute, private router :Router) { }

  ngOnInit() {
    if (localStorage.getItem("token")) {
      console.log("Hola " + this.nombreUsuario);
    }
    else {
      console.log ("quien sos vos?");
    }
  }

  Juego(tipo: string) {
    switch (tipo) {
      case 'Adivina':
        this.router.navigate(['/juegos/adivina-el-numero']);
        break;
      case 'Agilidad':
        this.router.navigate(['/juegos/agilidad-aritmetica']);
        break;
    }
  }

}
