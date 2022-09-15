import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MethodComuns} from "../../../../utils/method";
import {AdminService} from "../../../../core/service/admin/admin.service"
import { UsuarioRequest } from '../../../../core/request/usuario.request';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  textFind: any
  list: any[] = []
  title = ''
  response: UsuarioRequest
  constructor(private modalService: NgbModal, private serviceAdmin: AdminService) { }

  ngOnInit(): void {
    this.fetchUsers()
  }
  openModal(model: any) {
    this.response = null
    this.title = 'Nuevo Usuario'
    this.modalService.open(model, {size: 'lg'})
  }
  fetchUsers() {
    this.serviceAdmin.getUsuario().subscribe(res => {
      this.list = res
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    })
  }
  edit(model: any, id:number) {
    this.serviceAdmin.getById(id).subscribe(res => {
      this.response = res
      this.title = 'Actualizar Usuario'
      this.modalService.open(model, {size: 'lg'})
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    })
  }
  delete(id:number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons
      .fire({
        title: "<h5>Seguro de Eliminar Este Usuario?</h5>",
        text:`¡No podrás revertir esto!?`,
        icon: 'warning',
        confirmButtonText: `<span style='color:white'>Si, Eliminar!</span>`,
        cancelButtonText:  `<span style='color:white'>No, cerrar!</span>`,
        showCancelButton: true,
      })
      .then(result => {
        if (result.value) {
          Swal.fire({
            text: 'Eliminando usuario...',
            background: "#F3EAEA",
            allowOutsideClick: false,
            allowEscapeKey: false
          })
          Swal.showLoading()
          this.serviceAdmin.delete(id).subscribe(res => {
            Swal.close()
            if (res.success) {
              MethodComuns.toastNotificacion('success', res.message)
              this.fetchUsers()
            }
          }, error => {
            Swal.close()
            MethodComuns.toastNotificacion('error', error.message)
          })
        }
      });
  }
}
