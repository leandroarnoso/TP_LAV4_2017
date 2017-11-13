import {Juego} from './juego';
import {Jugador} from './jugador';

export class AgilidadAritmetica extends Juego{

    // ATRIBUTOS
    resultado :number;
    numeroIngresado :number;
    numero1 :number;
    numero2 :number;
    operador :string;

    // CONSTRUCTOR
    constructor(nombre :string, jugador :Jugador) {
        super(nombre, jugador);
    }

    // METODOS 
    GenerarNuevo(puntaje :number) {
        this.numeroIngresado = null;
        this.jugador.gano = false;
        this.puntaje = puntaje;
        this.numero1 = Math.floor((Math.random() * 10) + 1);
        this.numero2 = Math.floor((Math.random() * 10) + 1);
        switch(Math.floor(Math.random() * 4)) {
            case 0:
                this.operador = "+";
                this.resultado = this.numero1 + this.numero2;
                break;
            case 1:
                this.operador = "-";
                this.resultado = this.numero1 - this.numero2;
                break;
            case 2:
                this.operador = "*";
                this.resultado = this.numero1 * this.numero2;
                break;
            default:
                this.operador = "/";
                this.resultado = Math.floor(this.numero1 / this.numero2);
                break;
        }
    }

    Verificar() :boolean {
        if (this.resultado == this.numeroIngresado) {
            this.jugador.gano = true;
        }
        return this.jugador.gano;
    }
}
