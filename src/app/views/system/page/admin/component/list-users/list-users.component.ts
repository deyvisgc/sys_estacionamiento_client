import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MethodComuns} from "../../../../utils/method";
import {AdminService} from "../../../../core/service/admin/admin.service"
import { UsuarioRequest } from '../../../../core/request/usuario.request';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/views/system/core/service/auth/login.service';
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
  isRol = false 
  rol: any[] = []
  page = 0
  size = 10
  order = 'id'
  asc = true
  isFirst = false
  isLast = false
  totalPages: Array<number>
  isAdmin = false
  constructor(private modalService: NgbModal, private serviceAdmin: AdminService, private tokenService: LoginService) { }

  ngOnInit(): void {
    this.fetchUsers()
    this.isAdmin = this.tokenService.isAdmin()
  }
  openModal(model: any): void  {
    this.response = null
    this.title = 'Nuevo Usuario'
    this.modalService.open(model, {size: 'lg'})
  }
  fetchUsers(): void  {
    this.serviceAdmin.getUsuario(this.page, this.size, this.order, this.asc).subscribe(res => {
      this.list = res.content
      this.isFirst = res.first
      this.isLast = res.last
      this.totalPages = new Array(res["totalPages"])
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    })
  }
  edit(model: any, id:number): void  {
    this.serviceAdmin.getById(id).subscribe(res => {
      this.response = res
      this.title = 'Actualizar Usuario'
      this.modalService.open(model, {size: 'lg'})
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    })
  }
  verRol(id:number): void  {
    this.serviceAdmin.getRolByIdUsers(id).subscribe(res => {
      this.rol = res
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    }, () => {
    })
  }
  delete(id:number): void  {
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
  
  sort(): void {
    this.asc = !this.asc;
    this.fetchUsers();
  }
  rewind(): void  {
    if (!this.isFirst) {
      this.page--
      this.fetchUsers()
    }
  }
  setPage(page: number): void {
    this.page = page
    this.fetchUsers()
  }
  forward (): void  {
    if (!this.isLast) {
      this.page++
      this.fetchUsers()
    }
  }
  setOrder(order: string): void {
    this.order = order;
    this.fetchUsers();
  }
}
