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
    public GenerarNuevo(puntaje :number) {
        this.jugador.gano = false;
        this.puntaje = puntaje;
        this.numeroSecreto = Math.floor((Math.random() * 100) + 1);
        this.numeroIngresado = null;
     }

     public Verificar() :boolean {
        if (this.numeroSecreto == this.numeroIngresado) {
            this.jugador.gano = true;
        } else {
            this.puntaje -= 1000;
        }
        return this.jugador.gano;
    }

    public RetornarAyuda() {
        if (this.numeroIngresado < this.numeroSecreto) {
          return "Falta";
        }
        return "Te pasate";
      }
    
}