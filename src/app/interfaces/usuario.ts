import { Tipocuenta } from "../enums/tipocuenta";

export interface Usuario {
    username: string;
    password: string;
    nombre: string;
    email: string | null; // Usamos `null` en lugar de múltiples opciones
    tipo: Tipocuenta | null; // Simplificado con la enum completa
}
