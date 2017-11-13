import {Jugador} from './jugador';

export  abstract class Juego {

    // ATRIBUTOS
    nombre :string;
    jugador :Jugador;
    puntaje :number;
    
    // CONSTRUCTOR
    constructor(nombre :string, jugador :Jugador) {
        this.nombre = nombre;
        this.jugador = jugador;
    }

    // METODOS
    public abstract GenerarNuevo(puntaje? :number);
    public abstract  Verificar() :boolean;
}