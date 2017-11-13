import { Juego } from '../clases/juego';
import { Jugador } from '../clases/jugador';

export class Anagrama extends Juego {
    
    // ATRIBUTOS
    private palabras :Array<any> = [
        {anagrama: "sentido", palabra: "destino"}, {anagrama: "estilo", palabra: "islote"}, 
        {anagrama: "presiente", palabra: "serpiente"}, {anagrama: "despierten", palabra: "presidente"},
        {anagrama: "imagen", palabra: "enigma"}, {anagrama: "amagaran", palabra: "anagrama"}, 
        {anagrama: "talleres", palabra: "estrella"}, {anagrama: "gondola", palabra: "algodon"}, 
        {anagrama: "avenir", palabra: "enviar"}, {anagrama: "posaren", palabra: "persona"}, 
        {anagrama: "transpire", palabra: "esprintar"}, {anagrama: "cientos", palabra: "insecto"},
        {anagrama: "tediosa", palabra: "estadio"}, {anagrama: "boca", palabra: "cabo"}, 
        {anagrama: "timadas", palabra: "amistad"}, {anagrama: "semejan", palabra: "mensaje"},
        {anagrama: "sorteen", palabra: "estreno"}, {anagrama: "deporto", palabra: "torpedo"}, 
        {anagrama: "afoscar", palabra: "fracaso"}, {anagrama: "camaras", palabra: "mascara"}
    ]
    palabraSecreta :string;
    anagrama :string;
    palabraIngresada :string;

    // CONSTRUCTOR
    constructor(nombre :string, jugador :Jugador) {
        super(nombre, jugador);
    }

    // METODOS
    public GenerarNuevo(puntaje :number) {
        this.jugador.gano = false;
        let indice = Math.floor((Math.random() * 20));
        this.palabraSecreta = this.palabras[indice]['palabra'];
        this.anagrama = this.palabras[indice]['anagrama'];
        this.puntaje = puntaje;
        console.log("palabra: " + this.palabraSecreta);
    }

    public Verificar() {
        if (this.palabraSecreta == this.palabraIngresada.toLowerCase()) {
            this.jugador.gano = true;
        } else {
            this.puntaje -= 2000;
        }
        return this.jugador.gano;
    }

}
