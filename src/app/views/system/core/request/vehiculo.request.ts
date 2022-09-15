import { PersonaRequest } from "./persona.request";
import { TipoVehiculoRequest } from "./tipoVehiculo.request";

export interface VehiculoRequest {
    id?: number,
    license_plate: string, // placa
    cedula: string,
    type_vehicle:TipoVehiculoRequest,
    check_in_time?: string, // hora entrada
    departure_time?: string, // hora salida
    person: PersonaRequest
}
