import { environment } from "../../../../../environments/environment"
import { GruposPath } from "./grupos_path"
export class UriConstante {
  //Modulo Admin
  public static readonly LOGIN = "http://localhost:8085/galaxy-parqueo/api/" + 'login'

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

    // REPORTES

    public static readonly REPORTET_TOTAL_CLIENTES = environment.host + GruposPath.REPORTES + 'total-client'
    public static readonly REPORTET_TOTAL_USUARIO = environment.host + GruposPath.REPORTES + 'total-users'
    public static readonly REPORTET_TOTAL_GANANCIAS = environment.host + GruposPath.REPORTES + 'total-ganancia'
    public static readonly REPORTET_TOTAL_NUEVO_INGRESOS = environment.host + GruposPath.REPORTES + 'total-ingresos-dia'
    public static readonly REPORTET_TOTAL_COMPROBANTES = environment.host + GruposPath.REPORTES + 'total-comprobante'
    public static readonly REPORTET_TOTAL_CLIENTES_ALL_MES = environment.host + GruposPath.REPORTES + 'total-ingresos-all-mes'
    public static readonly REPORTET_TOTAL_GANANCIAS_ALL_MES = environment.host + GruposPath.REPORTES + 'total-ganancias-all-mes'
    public static readonly REPORTET_TOTAL_CLIENTES_X_MES = environment.host + GruposPath.REPORTES + 'total-ingresos-mes/' + '{mes}'
    public static readonly REPORTET_TOTAL_GANANCIAS_X_MES = environment.host + GruposPath.REPORTES + 'total-ganancias-mes/' + '{mes}'
}
