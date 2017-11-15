import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
  @Input()
  listado :Array<any>;
  @Input()
  nombreJuego :String;
  @Input()
  nombreJugador :String;

  constructor() { }

  ngOnInit() {
    
  }

}
