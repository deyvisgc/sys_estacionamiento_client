import { PersonaRequest } from "./persona.request";

export interface UsuarioRequest {
    id?: number,
    email: string,
    password:string,
    role:string,
    person: PersonaRequest
}
