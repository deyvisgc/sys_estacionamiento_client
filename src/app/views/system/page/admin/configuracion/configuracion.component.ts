import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../core/service/auth/login.service';
import { TipoVehiculoService } from '../../../core/service/parqueo/tipo-vehiculo.service';
import { MethodComuns } from '../../../utils/method';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  form: FormGroup
  textFind: any
  list: any[] = []
  isAdmin = false
  displayPosition: boolean;
  isSave: false
  title: string
  constructor(private tokenService: LoginService, private fb: FormBuilder) {
    this.isAdmin = this.tokenService.isAdmin()
    this.validateForm()
  }

  ngOnInit(): void {
    this.fetch()
  }
  openModal() {
    this.campoUrl.enable()
    this.campoTipoApi.enable()
    this.title = 'Nueva Configuración'
    this.displayPosition = true;
  }
  closeModal() {
    this.displayPosition = false;
    this.form.reset()
  }
  validateForm () {
    this.form = this.fb.group({
      id: [null],
      url: [null, Validators.required],
      api_token: [null, [Validators.required]],
      typeApi: ["documento", [Validators.required]]
    })
  }
  get campoUrl() {
    return this.form.get("url")
  }
  get campoToken() {
    return this.form.get("api_token")
  }
  get campoTipoApi() {
    return this.form.get("typeApi")
  }
  fetch() {
    this.tokenService.fetchConfiguracion().subscribe({
      next: (res) => {
        this.list = res
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
    this.tokenService.saveConfiguracion(this.campoUrl.value, this.campoToken.value, this.campoTipoApi.value)
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
    this.tokenService.updateConfiguracion( this.form.get("id").value, this.campoUrl.value, this.campoToken.value, this.campoTipoApi.value)
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
    this.campoUrl.disable()
    this.campoTipoApi.disable()
    this.tokenService.fetchById(id).subscribe({
      next: (res) => {
        this.form.patchValue({
          id: res.id,
          url: res.urlApi,
          api_token: res.token,
          typeApi: res.typeApi
        })
        this.title = 'Actualizar Configuración'
        this.displayPosition = true;
      },
      error: (error) => {
        MethodComuns.toastNotificacion('error', error.message)
      }
    })
  }
}
