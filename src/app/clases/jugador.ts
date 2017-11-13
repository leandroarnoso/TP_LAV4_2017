export class Jugador {

    // ATRIBUTOS
    nombreUsuario :string;
    email :string;
    password :string;
    sexo :string;
    gano :boolean;

    // CONSTRUCTOR
    constructor(nombreUsuario :string, email :string, sexo :string, password? :string) {
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.sexo = sexo;
        this.password = password;
        this.gano = false;
    }

}
