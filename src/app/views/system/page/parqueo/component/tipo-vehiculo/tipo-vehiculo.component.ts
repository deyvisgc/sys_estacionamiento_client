import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/views/system/core/service/auth/login.service';
import {TipoVehiculoService} from 'src/app/views/system/core/service/parqueo/tipo-vehiculo.service'
import { MethodComuns } from 'src/app/views/system/utils/method';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html',
  styleUrls: ['./tipo-vehiculo.component.scss']
})
export class TipoVehiculoComponent implements OnInit {
  form: FormGroup
  textFind: any
  list: any[] = []
  isAdmin = false
  page = 0
  size = 10
  order = 'id'
  asc = true
  isFirst = false
  isLast = false
  totalPages: Array<number>
  displayPosition: boolean;
  isSave: false
  title: string
  constructor(private tokenService: LoginService, private tipoVehiculoService: TipoVehiculoService,  private fb: FormBuilder) {
    this.isAdmin = this.tokenService.isAdmin()
    this.validateForm()
  }

  ngOnInit(): void {
    this.fetch()
  }
  openModal() {
    this.title = 'Nuevo Registro'
    this.displayPosition = true;
  }
  closeModal() {
    this.displayPosition = false;
    this.form.reset()
  }
  validateForm () {
    this.form = this.fb.group({
      id: [null],
      descripcion: [null, Validators.required],
      precio: [null, [Validators.required, Validators.min(1)]]
    })
  }
  get campoDescripcion() {
    return this.form.get("descripcion")
  }
  get campoPrecio() {
    return this.form.get("precio")
  }
  fetch() {
    this.tipoVehiculoService.fetch(this.page, this.size, this.order, this.asc).subscribe({
      next: (res) => {
        this.list = res.content
        this.isFirst = res.first
        this.isLast = res.last
        this.totalPages = new Array(res["totalPages"])
      },
      error: (error) => {
        MethodComuns.toastNotificacion('error', error.message)
      }
    })
  }

  guardar () {
    if (this.form.valid) {
      if (!this.form.get("id").value) {
        this.create()
      } else {
        this.update()
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
  create() {
    this.tipoVehiculoService.save(this.campoDescripcion.value, this.campoPrecio.value)
       .subscribe({
        next: (res) => {
          this.fetch()
          this.closeModal()
          MethodComuns.toastNotificacion('success', res.message)
        },
        error: (err) => {
          MethodComuns.toastNotificacion('error', err.message)
        }
    })
    
  }
  update() {
    this.tipoVehiculoService.update( this.form.get("id").value, this.campoDescripcion.value, this.campoPrecio.value)
       .subscribe({
        next: (res) => {
          this.fetch()
          this.closeModal()
          MethodComuns.toastNotificacion('success', res.message)
        },
        error: (err) => {
          MethodComuns.toastNotificacion('error', err.message)
        }
    })
  }
  edit(id:number) {
    this.tipoVehiculoService.fetchById(id).subscribe({
      next: (res) => {
        this.form.patchValue({
          id: res.id,
          descripcion: res.descripcion,
          precio: res.precioHora
        })
        this.title = 'Actualizar Registro'
        this.displayPosition = true;
      },
      error: (error) => {
        MethodComuns.toastNotificacion('error', error.message)
      }
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
        title: "<h5>Seguro de Eliminar?</h5>",
        text:`¡No podrás revertir esto!?`,
        icon: 'warning',
        confirmButtonText: `<span style='color:white'>Si, Eliminar!</span>`,
        cancelButtonText:  `<span style='color:white'>No, cerrar!</span>`,
        showCancelButton: true,
      })
      .then(result => {
        if (result.value) {
          Swal.fire({
            text: 'Eliminando...',
            background: "#F3EAEA",
            allowOutsideClick: false,
            allowEscapeKey: false
          })
          Swal.showLoading()
          this.tipoVehiculoService.delete(id).subscribe({
            next: (res) => {
              Swal.close()
              if (res.success) {
                MethodComuns.toastNotificacion('success', res.message)
                this.fetch()
              }
            },
            error: (err) => {
              Swal.close()
              MethodComuns.toastNotificacion('error', err.message)
            }
          })
        }
      });
  }
  
  sort(): void {
    this.asc = !this.asc;
    this.fetch();
  }
  rewind(): void  {
    if (!this.isFirst) {
      this.page--
      this.fetch()
    }
  }
  setPage(page: number): void {
    this.page = page
    this.fetch()
  }
  forward (): void  {
    if (!this.isLast) {
      this.page++
      this.fetch()
    }
  }
  setOrder(order: string): void {
    this.order = order;
    this.fetch();
  }

}
