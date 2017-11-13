import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  @Input()
  nombreUsuario :string;

  @Output() 
  EventDeslogueo: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route :ActivatedRoute, private router :Router) { }

  ngOnInit() {
  }

  Desloguear() {
    localStorage.removeItem("jugador");
    this.nombreUsuario = "";
    this.EventDeslogueo.emit(this.EventDeslogueo);
  }

}
