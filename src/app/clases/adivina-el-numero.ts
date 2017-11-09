import {Juego} from './juego';
import {Jugador} from './jugador';

export class AdivinaElNumero extends Juego{

    // ATRIBUTOS
    numeroSecreto :number;
    numeroIngresado :number;

    // CONSTRUCTOR
    constructor(jugador :Jugador) {
        super("Adivina el Numero", jugador);
    }

    // METODOS
    public GenerarNuevo(puntaje :number) {
        this.gano = false;
        this.puntaje = puntaje;
        this.numeroSecreto = Math.floor((Math.random() * 100) + 1);
     }

     public Verificar() :boolean {
        if (this.numeroSecreto == this.numeroIngresado) {
            this.gano = true;
        } else {
            this.puntaje -= 500;
        }
        return this.gano;
    }

    public RetornarAyuda() {
        if (this.numeroIngresado < this.numeroSecreto) {
          return "Falta";
        }
        return "Te pasate";
      }
    
}