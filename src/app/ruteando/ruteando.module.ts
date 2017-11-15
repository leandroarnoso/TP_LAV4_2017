import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../componentes/home/home.component';
import { LoginComponent } from '../componentes/login/login.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { QuienSoyComponent } from '../componentes/quien-soy/quien-soy.component';
import { JuegosComponent } from '../componentes/juegos/juegos.component';
import { AdivinaElNumeroComponent } from '../componentes/adivina-el-numero/adivina-el-numero.component';
import { AgilidadAritmeticaComponent } from '../componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { PiedraPapelTijeraComponent } from '../componentes/piedra-papel-tijera/piedra-papel-tijera.component';
import { AnagramaComponent } from '../componentes/anagrama/anagrama.component';
import { AhorcadoComponent } from '../componentes/ahorcado/ahorcado.component';
import { ErrorComponent } from '../componentes/error/error.component';

// declaro donde quiero que se dirija
const MiRuteo = [
{path: '' , component: HomeComponent},
{path: 'login' , component: LoginComponent},
{path: 'registro' , component: RegistroComponent},
{path: 'quien-soy' , component: QuienSoyComponent},

{ path: 'juegos' ,
component: JuegosComponent ,
children: [
  {path: 'adivina-el-numero' , component: AdivinaElNumeroComponent},
  {path: 'agilidad-aritmetica' , component: AgilidadAritmeticaComponent},
  {path: 'piedra-papel-tijera' , component: PiedraPapelTijeraComponent},
  {path: 'anagrama' , component: AnagramaComponent},
  {path: 'ahorcado' , component: AhorcadoComponent}
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
