import {Jugador} from './jugador';

export  abstract class Juego {

    // ATRIBUTOS
    nombre :string;
    jugador :Jugador;
    gano :boolean;
    
    // CONSTRUCTOR
    constructor(nombre :string, jugador :Jugador){
        this.nombre = nombre;
        this.jugador = jugador;
        this.gano = false;
    }

    // METODOS
    public abstract GenerarNuevo();
    public abstract  Verificar();
}