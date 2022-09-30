import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { ReporteService } from './../system/core/service/reporte/reporte.service';
import { MethodComuns } from '../system/utils/method';
import { NavigationExtras, Router } from '@angular/router';
import { PaginancionRequest } from '../system/core/request/paginacion.request';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalesReport = {
    totalIngreso : 0,
    totalUsuario : 0,
    totalGanacia : 0.0,
    nuevosIngresos : 0,
    totalComprobantes : 0
  }
  porcentaje = {
    cliente : 0,
    usuario : 0,
    ganancia : 0.0,
    nuevosIngresos : 0,
    comprobantes : 0
  }
  limitTotales = {
    cliente : 200,
    usuario : 100,
    ganancia : 10000,
    nuevosIngresos : 100,
    comprobantes : 200
  }
  paginacion: PaginancionRequest = {
    page: 0,
    size: 10,
    order: 'id_vehicle',
    asc: true
   }
  ingresos: any
  ganancias: any
  mesesLabel: string[] = ['Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  constructor(private chartsData: DashboardChartsData, private reportService: ReporteService, private router: Router) {
  }

  public users: IUser[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/img/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/img/avatars/2.jpg',
      status: 'danger',
      color: 'info'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/img/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/img/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/img/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/img/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    }
  ];
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  ngOnInit(): void {
    this.getTotalClienteAllmes()
    this.getTotalGananciaAllmes()
    this.initCharts();
    this.getTotalCliente()
    this.getTotalUsuario()
    this.getTotalGanancias()
    this.getTotalNuevosIngresos()
    this.getTotalComprobantes()
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }

  getTotalCliente() {
    this.reportService.getTotalCliente().subscribe(res => {

      this.totalesReport.totalIngreso = res
      this.porcentaje.cliente = (res / this.limitTotales.cliente) * 100
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    }, () => {
    })
  }
  getTotalUsuario() {
    this.reportService.getTotalUsuario().subscribe(res => {
      this.totalesReport.totalUsuario = res
      this.porcentaje.usuario = (res / this.limitTotales.usuario) * 100
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    }, () => {
    })
  }
  getTotalGanancias() {
    this.reportService.getTotalGanancias().subscribe(res => {
      this.totalesReport.totalGanacia = res
      this.porcentaje.ganancia = Math.round((res / this.limitTotales.ganancia) * 100)
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    }, () => {
    })
  }
  getTotalNuevosIngresos() {
    this.reportService.getTotalNuevosIngresos().subscribe(res => {
      this.totalesReport.nuevosIngresos = res
      this.porcentaje.nuevosIngresos = (res / this.limitTotales.nuevosIngresos) * 100
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    }, () => {
    })
  }
  getTotalComprobantes() {
    this.reportService.getTotalComprobantes().subscribe(res => {
      this.totalesReport.totalComprobantes = res
      this.porcentaje.comprobantes = (res / this.limitTotales.comprobantes) * 100
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    }, () => {
    })
  }
  getTotalClienteAllmes() { 
    this.reportService.getTotalClienteAllmes().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.ingresos = {
            labels: this.mesesLabel,
            datasets: [
              {
                label: 'Ingresos',
                //backgroundColor: "#3399ff",
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)'
                ],
            
                borderWidth: 1,
                data: res
              },
            ]
          };
        }
      }, 
      error: (err) => {
        MethodComuns.toastNotificacion('error', err.message)
      },
      complete: () => {

      }
    })
  }
  getTotalGananciaAllmes() {
    this.reportService.getTotalGananciasAllMes().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.ganancias = {
            labels: this.mesesLabel,
            datasets: [
              {
                label: 'Ganancias',
                borderWidth: 1,
                backgroundColor: '#2eb85c',
                data: res
              }
            ]
          };
          // this.options = {
          //   responsive: true,
          //   onClick: (event: any) => {
          //     console.log(event)
          //     // let point = Chart.helpers.getRelativePosition(event, subPerf.chart);
          //     // let xIndex = subPerf.scales['x-axis-0'].getValueForPixel(point.x);
          //     // let label = subPerf.data.labels[xIndex];
          //     //console.log(label + ' at index ' + xIndex);
          //   },
          //   scales: {
          //     yAxes: [{
          //       ticks: {
          //         beginAtZero: true
          //       }
          //     }]
          //   }
          // }
          
        }
      },
      error: (err) => {
        MethodComuns.toastNotificacion('error', err.message)
      },
      complete: () => {
      }
    })
  }

  getIngresoXmes(e: any) {
    this.reportService.getTotalClienteXMes(this.mesesLabel[e[0].index], 
      this.paginacion.page, this.paginacion.size, this.paginacion.order,
      this.paginacion.asc
      ).subscribe({
      next: (res) => {
        const navigationExtras: NavigationExtras = {state: res}
        this.router.navigate(['/reporte/ingreso'], navigationExtras)
      }, 
      error: (err) => {
        MethodComuns.toastNotificacion('error', err.message)
      },
      complete: () => {

      }
    })
  }
  getGananciasXmes(e: any) {
    this.paginacion.order = "id_tarifa"
    this.reportService.getTotalGananciasXMes(this.mesesLabel[e[0].index],
      this.paginacion.page, this.paginacion.size, this.paginacion.order,
      this.paginacion.asc
      ).subscribe({
      next: (res) => {
        const navigationExtras: NavigationExtras = {state: res}
        this.router.navigate(['/reporte/ganancia'], navigationExtras)
      }, 
      error: (err) => {
        MethodComuns.toastNotificacion('error', err.message)
      },
      complete: () => {
      }
    })
  }
}
