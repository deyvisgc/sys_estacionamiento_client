import Swal from "sweetalert2";
export class MethodComuns {
  static toastNotificacion (type: any, message: string) {
    const Toast = Swal.mixin({
      toast: true,
      //background: 'red',
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: type,
      title: message
    })
  }
  static descargarArchivos(contenido: any, nombre : any, type: any) {
    const a = document.createElement("a");
    const archivo = new Blob([contenido], { type: type });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = nombre;
    a.click();
    URL.revokeObjectURL(url);
  }
  static decodeToken(token: string): any {
    if (token === null || token === '') {
      return { upn: '' };
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT debe tener 3 partes');
    }
    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('No se puede decodificar el token');
    }
    return JSON.parse(decoded);
  }
  static urlBase64Decode(str: string) {
    var output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }
    return decodeURIComponent(escape(window.atob(output)));
  }
}
