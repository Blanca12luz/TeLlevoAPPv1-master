import { Tipocuenta } from "../enums/tipocuenta";

export interface Usuario{
    username:string,
    password:string,
    nombre:string,
    apellido:string
    email: string | undefined | null;
    img: string | undefined | null;
    tipo: Tipocuenta.CONDUCTOR | Tipocuenta.CLIENTE | undefined | null;
}