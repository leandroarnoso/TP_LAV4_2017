import {Juego} from './juego';
import {Jugador} from './jugador';

export class AdivinaElNumero extends Juego{

    // ATRIBUTOS
    numeroSecreto :number;
    numeroIngresado :number;

    // CONSTRUCTOR
    constructor(nombre :string, jugador :Jugador) {
        super(nombre, jugador);   
    }

    // METODOS
    GenerarNuevo() {
        this.gano = false;
        this.numeroSecreto = Math.round(Math.random() * 100);
     }

    Verificar() {
         this.gano = (this.numeroSecreto == this.numeroIngresado);
    }
    
}