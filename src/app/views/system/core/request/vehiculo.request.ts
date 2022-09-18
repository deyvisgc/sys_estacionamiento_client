import { PersonaRequest } from "./persona.request";
import { TipoVehiculoRequest } from "./tipoVehiculo.request";

export interface VehiculoRequest {
    id?: number,
    code?: string,
    license_plate: string, // placa
    cedula: string,
    fechaRegistro?: string,
    type_vehicle:TipoVehiculoRequest,
    check_in_time?: string, // hora entrada
    departure_time?: string, // hora salida
    person: PersonaRequest
}
