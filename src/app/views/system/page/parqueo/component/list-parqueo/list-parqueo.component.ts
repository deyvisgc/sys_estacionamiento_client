import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MethodComuns } from '../../../../utils/method';
import { ParqueoService } from '../../../../core/service/parqueo/parqueo.service';
import { VehiculoRequest } from 'src/app/views/system/core/request/vehiculo.request';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-parqueo',
  templateUrl: './list-parqueo.component.html',
  styleUrls: ['./list-parqueo.component.scss']
})
export class ListParqueoComponent implements OnInit {

  constructor(private modalService: NgbModal, private parqueoService: ParqueoService) { }
  list: any[] = []
  vehiculo: VehiculoRequest
  ngOnInit(): void {
    this.getParqueo()
  }
  getParqueo() {
    this.parqueoService.getAll().subscribe(res => {
      this.list = res
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    })
  }
  openModal(model: any) {
    this.modalService.open(model, {size: 'lg'})
  }
  getDetalle (model: any, id: number) {
    Swal.fire({
      text: 'Cosntruyento ticket...',
      background: "#F3EAEA",
      allowOutsideClick: false,
      allowEscapeKey: false
    })
    Swal.showLoading()
    this.parqueoService.getById(id).subscribe(res => {
      Swal.close()
      this.vehiculo = res
      this.modalService.open(model, {size: 'sm'})
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    })
  }
  salida(code: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons
      .fire({
        title: "<h5>Seguro de realizar el Pago?</h5>",
        text:`¡No podrás revertir esto!?`,
        icon: 'warning',
        // customClass: 'swal-wide',
        confirmButtonText: `<span style='color:white'>Si, pagar!</span>`,
        cancelButtonText:  `<span style='color:white'>No, cerrar!</span>`,
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          Swal.fire({
            text: 'Procesando el pago...',
            background: "#F3EAEA",
            allowOutsideClick: false,
            allowEscapeKey: false
          })
          Swal.showLoading()
          this.parqueoService.salida(code).subscribe(res => {
            if (res.success) {
              this.exportarBoleta(res.data.vehiculo.id)
              this.getParqueo()
            } else {
              MethodComuns.toastNotificacion('error', res.message)
            }
            Swal.close()
          }, error => {
            Swal.close()
            MethodComuns.toastNotificacion('error', error.message)
          })
        }
      });
    
  }
  exportarBoleta (id: number) {
    Swal.fire({
      text: 'Cosntruyento boleta de pago...',
      background: "#F3EAEA",
      allowOutsideClick: false,
      allowEscapeKey: false
    })
    Swal.showLoading()
    this.parqueoService.export(id).subscribe(res => {
      Swal.close()
      const fileName = "Boleta" + "-" + new Date().getTime() + '.pdf'
      console.log("res" + res)
      MethodComuns.descargarArchivos(res, fileName, 'application/pdf')
    }, error => {
      console.log("error" + error)
      MethodComuns.toastNotificacion('error', error.message)
    })
  }

}
