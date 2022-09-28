import { formatDate } from "@angular/common";
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export function trim(value: any): string {
  if (isEmpty(value)) {
    return '';
  }
  return value.toString().trim();
}

export function isEmpty(value: any): boolean {
  if (value == null || value == undefined) {
    return true;
  }
  if (value.__proto__.constructor === String) {
    return value.trim().length === 0;
  }
  if (value.__proto__.constructor === Array) {
    return value.length === 0;
  }
  if (value.__proto__.constructor === Object) {
    return Object.getOwnPropertyNames(value).length === 0;
  }
  return false;
}

export function isNotEmpty(value: any): boolean {
  return !isEmpty(value);
}

export function toNumber(value: any): any {
  if (isEmpty(value)) {
    return null;
  }
  return parseInt(value);
}

export function isNumber(value: any): value is number {
  return !isNaN(toNumber(value));
}

export function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

export function getFormatTraslate(es: any) {
  return es = {
    dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
    dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    today: 'Hoy',
    clear: 'Borrar',
    weekHeader: 'Wk'
  };
}


export function formattedDate(date: string): string {

  const format = 'dd/MM/yyyy';
  // const format = 'yyyy/MM/dd';
  const myDate = date;
  const locale = 'en-US';
  const formattedDate = formatDate(myDate, format, locale);

  return formattedDate;

}

export function restrictionMinMaxDate(): any {

  let today = new Date();
  let prevMonth = today.getMonth();
  let prevYear = today.getFullYear() - 1;

  let nextMonth = today.getMonth()
  let nextYear = today.getFullYear() + 1;

  let minDate = new Date();
  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  return { minDate, maxDate };
}

export function getDayAriaLabel(date: NgbDateStruct): string {
  return `${date.day}-${date.month}-${date.year}`;
}



export function toFormatDate(date: any, format: string): string {
  let resp:any = null
  switch (format) {
    case 'toDay':
      resp = Date.now();  /*la fecha es numero*/ 
      resp=resp.toString();
      break;

    case 'dd/MM/yyyy':

      break;

    case 'yyyy/MM/dd':

      break;

    case 'dd-MMM-YYYY':

      break;

    case 'YYYY-MMM-dd':

      break;

    case 'dd-MM-yyyy':

      break;

    case 'yyyy-MM-dd':
      let newDate = new Date(date);
      resp = formatDate(newDate, 'yyyy-MM-dd', 'en-US');
           
      break;

    default:
      break;
  }

  return resp;
}


