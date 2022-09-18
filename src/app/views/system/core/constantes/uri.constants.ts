import { environment } from "../../../../../environments/environment"
import { GruposPath } from "./grupos_path"
export class UriConstante {
  //Modulo Admin
  public static readonly LOGIN = environment.host + 'login'

  public static readonly USUARIO_BUSCAR_DNI = environment.host + GruposPath.USUARIO + 'search-reniec/{dni}'
  public static readonly USUARIO = environment.host + GruposPath.USUARIO
  public static readonly GETBYID = environment.host + GruposPath.USUARIO + '{id}'
  public static readonly DELETE = environment.host + GruposPath.USUARIO + '{id}'

    //Modulo Parqueo
    public static readonly PARQUEO = environment.host + GruposPath.PARQUEO
    public static readonly TIPOVEHICULO = environment.host + GruposPath.TIPOVEHICULO
    public static readonly GETBYIDPARQUEO = environment.host + GruposPath.PARQUEO + '{id}'
    public static readonly SALIDAPARQUEO = environment.host + GruposPath.PARQUEO + 'salida/{codigoOperacion}'

    public static readonly DELETEVEHICULO = environment.host + GruposPath.PARQUEO + '{id}'
    public static readonly BUSCARXCODIGOOPERACION = environment.host + GruposPath.PARQUEO + 'search-code-operacion'
}
