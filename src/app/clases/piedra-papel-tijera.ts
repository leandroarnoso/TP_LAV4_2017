import { Juego } from '../clases/juego';
import { Jugador } from '../clases/jugador';

export class PiedraPapelTijera extends Juego {

    // ATRIBUTOS
    opcJugador :number;
    opcMaquina :number;
    resultado :number;
    victorias :number;
    empates :number;
    derrotas :number

    // CONSTRUCTOR
    constructor(nombre :string, jugador :Jugador) {
        super(nombre, jugador);
    }

    // METODOS
    public GenerarNuevo(puntaje :number) {
        this.jugador.gano = false;
        this.victorias = 0;
        this.empates = 0;
        this.derrotas = 0;
        this.puntaje = puntaje;
        this.NuevaOpcMaquina();
    }

    public Verificar() {
        // 1 PIEDRA, 2 PAPEL, 3 TIJERA
        // -1 DERROTA, 0 EMPATE, 1 VICTORIA
        if (this.opcJugador == 1) {
            switch(this.opcMaquina) {
                case 1:
                    this.resultado = 0;
                    this.empates++;
                    break;
                case 2:
                    this.resultado = -1;
                    this.derrotas++;
                    break;
                case 3:
                    this.resultado = 1;
                    this.victorias++;
                    this.puntaje += 2000;
                    break;
            }
        } else if (this.opcJugador == 2) {
            switch(this.opcMaquina) {
                case 1:
                    this.resultado = 1;
                    this.victorias++;
                    this.puntaje += 2000;
                    break;
                case 2:
                    this.resultado = 0;
                    this.empates++;
                    break;
                case 3:
                    this.resultado = -1;
                    this.derrotas++;
                    break;
            }
        } else {
            switch(this.opcMaquina) {
                case 1:
                    this.resultado = -1;
                    this.derrotas++;
                    break;
                case 2:
                    this.resultado = 1;
                    this.victorias++;
                    this.puntaje += 2000;
                    break;
                case 3:
                    this.resultado = 0;
                    this.empates++;
                    break;
            }
        }
        if (this.victorias == 3) {
            this.jugador.gano = true;
        }
        return this.jugador.gano;
    }

    public NuevaOpcMaquina() {
        this.opcMaquina = Math.floor((Math.random() * 3) + 1);
        console.log(this.opcMaquina);
    }

}
