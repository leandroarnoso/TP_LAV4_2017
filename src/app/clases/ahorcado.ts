import {Juego} from './juego';
import {Jugador} from './jugador';

export class Ahorcado extends Juego{

    // ATRIBUTOS
    private palabras :Array<string> = [
        "AHORCADO", "ONOMATOPEYA", "ORNITORRINCO", "LANZACOHETES", "HEMOGLOBINA", "PALEONTOLOGIA",
        "ENTEREZA", "PIGMENTO", "CEFALOPODOS", "SALAMANDRA", "EPIDERMIS", "ANGLOSAJON", "CALABAZA",
        "REVISTA", "TERREMOTO", "PARABOLA", "ESCUDO", "ESTRIBILLO", "INVASION", "RASTRILLO"
    ];
    abecedario :Array<string> = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    letrasCorrectas :Array<string>;
    letrasErroneas :Array<string>;
    letraIngresada :string;
    palabraSecreta :string;
    aciertos :number;
    intentos :number;

    // CONSTRUCTOR
    constructor(nombre :string, jugador :Jugador) {
        super(nombre, jugador);
        this.jugador.gano = true;
    }

    // METODOS
    public GenerarNuevo(puntaje :number) {
        this.jugador.gano = false;
        this.letrasCorrectas = new Array();
        this.letrasErroneas = new Array();
        this.puntaje = puntaje;
        this.aciertos = 0;
        this.intentos = 6;
        this.ElegirPalabra();
        console.log("Palabra: " + this.palabraSecreta);
    }

    public Verificar() {
        let aciertosInstantanea = this.aciertos;
        this.VerAciertos(this.letraIngresada);
        if (this.aciertos > aciertosInstantanea) {
            this.letrasCorrectas.push(this.letraIngresada);
            if (this.aciertos == this.palabraSecreta.length) {
                this.jugador.gano = true;
                this.intentos = 0;
            }
        } else {
            this.letrasErroneas.push(this.letraIngresada);
            this.puntaje -= 2000;
            this.intentos--;
        }

        return this.jugador.gano;
    }

    private VerAciertos(letra :string) {
        for (let i = 0; i < this.palabraSecreta.length; i++) {
            if (this.palabraSecreta[i] == letra) {
                this.aciertos++;
            }
        }
    }

    private ElegirPalabra() {
        this.palabraSecreta = this.palabras[Math.floor(Math.random() * 12)];
    }
}
