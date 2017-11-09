import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Modulos
import { RuteandoModule } from './ruteando/ruteando.module';
// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { ErrorComponent } from './componentes/error/error.component';
// Pipes
import { SexoPipe } from './pipes/sexo.pipe';
// Servicios
import { MiHttpService } from "./servicios/mi-http.service";
import { JugadorService } from "./servicios/jugador.service";
import { HeaderComponent } from './componentes/header/header.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { AdivinaElNumeroComponent } from './componentes/adivina-el-numero/adivina-el-numero.component';
import { AgilidadAritmeticaComponent } from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { PiedraPapelTijeraComponent } from './componentes/piedra-papel-tijera/piedra-papel-tijera.component';
import { AnagramaComponent } from './componentes/anagrama/anagrama.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    QuienSoyComponent,
    ErrorComponent,
    SexoPipe,
    HeaderComponent,
    NavBarComponent,
    JuegosComponent,
    AdivinaElNumeroComponent,
    AgilidadAritmeticaComponent,
    PiedraPapelTijeraComponent,
    AnagramaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFontAwesomeModule,
    RuteandoModule
  ],
  providers: [
    MiHttpService,
    JugadorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
