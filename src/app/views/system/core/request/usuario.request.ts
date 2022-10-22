import { PersonaRequest } from "./persona.request";
import { RoleRequest } from "./role.request";
export interface UsuarioRequest {
    id?: number,
    user_name: string,
    password?:string,
    person: PersonaRequest,
    role?: any
}
