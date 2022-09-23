import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { ReporteService } from './../system/core/service/reporte/reporte.service';
import { MethodComuns } from '../system/utils/method';
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
  ingresosTotalesChart: number[] = []
  ingresos: any
  constructor(private chartsData: DashboardChartsData, private reportService: ReporteService) {
  }
  totales = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'GitHub Commits',
        borderWidth: 1,
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 80, 40]
      }
    ]
  };
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
    this.initCharts();
    this.getTotalCliente()
    this.getTotalUsuario()
    this.getTotalGanancias()
    this.getTotalNuevosIngresos()
    this.getTotalComprobantes()
    this.getTotalClienteXmes()
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
  getTotalClienteXmes() {
    this.reportService.getTotalClienteXmes().subscribe(res => {
      if (res && res.length > 0) {
        this.ingresosTotalesChart = res
        console.log(this.ingresosTotalesChart)
        this.ingresos = {
          labels: ['Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: [
            {
              label: 'Ingresos',
              backgroundColor: "#3399ff",
              borderWidth: 1,
              data: this.ingresosTotalesChart
            }
          ]
        };
      }
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    }, () => {
    })
  }
}
