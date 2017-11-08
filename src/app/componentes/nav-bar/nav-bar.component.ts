import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  @Input()
  nombreUsuario :string;

  constructor(private route :ActivatedRoute, private router :Router) { }

  ngOnInit() {
  }

  Desloguear() {
    localStorage.removeItem("token");
    localStorage.removeItem("nombreUsuario");
    this.router.navigate(["/"]);
  }

}
