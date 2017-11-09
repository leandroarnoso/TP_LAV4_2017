import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';

//import { ListadoDeResultadosComponent } from '../componentes/listado-de-resultados/listado-de-resultados.component';
import { HomeComponent } from '../componentes/home/home.component';
import { LoginComponent } from '../componentes/login/login.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { QuienSoyComponent } from '../componentes/quien-soy/quien-soy.component';
import { JuegosComponent } from '../componentes/juegos/juegos.component';
import { AdivinaElNumeroComponent } from '../componentes/adivina-el-numero/adivina-el-numero.component';
import { AgilidadAritmeticaComponent } from '../componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { PiedraPapelTijeraComponent } from '../componentes/piedra-papel-tijera/piedra-papel-tijera.component';
import { AnagramaComponent } from '../componentes/anagrama/anagrama.component';
//import { MenuComponent } from '../componentes/menu/menu.component';
//import { AdivinaMasListadoComponent } from '../componentes/adivina-mas-listado/adivina-mas-listado.component';
//import { AgilidadMasListadoComponent } from '../componentes/agilidad-mas-listado/agilidad-mas-listado.component';
//import { ListadoComponent } from'../componentes/listado/listado.component'
//import { ListadosComponent } from '../componentes/listados/listados.component';
import { ErrorComponent } from '../componentes/error/error.component';
//import { JugadoresListadoComponent } from '../componentes/jugadores-listado/jugadores-listado.component';


// declaro donde quiero que se dirija
const MiRuteo = [
//{path: 'Jugadores' , component: JugadoresListadoComponent},
{path: '' , component: HomeComponent},
{path: 'login' , component: LoginComponent},
{path: 'registro' , component: RegistroComponent},
{path: 'quien-soy' , component: QuienSoyComponent},
//{path: 'Listado' , component: ListadoComponent},

{ path: 'juegos' ,
component: JuegosComponent ,
children: [
  {path: 'adivina-el-numero' , component: AdivinaElNumeroComponent},
  {path: 'agilidad-aritmetica' , component: AgilidadAritmeticaComponent},
  {path: 'piedra-papel-tijera' , component: PiedraPapelTijeraComponent},
  {path: 'anagrama' , component: AnagramaComponent}
]},
{path: '**' , component: ErrorComponent},
{path: 'error' , component: ErrorComponent}];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteandoModule { }
