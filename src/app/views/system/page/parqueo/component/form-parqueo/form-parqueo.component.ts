import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { PersonaRequest } from 'src/app/views/system/core/request/persona.request';
import { TipoVehiculoRequest } from 'src/app/views/system/core/request/tipoVehiculo.request';
import { VehiculoRequest } from 'src/app/views/system/core/request/vehiculo.request';
import { AdminService } from 'src/app/views/system/core/service/admin/admin.service';
import { ParqueoService } from 'src/app/views/system/core/service/parqueo/parqueo.service';
import { TipoVehiculoService } from 'src/app/views/system/core/service/parqueo/tipo-vehiculo.service';
import { MethodComuns } from 'src/app/views/system/utils/method';

@Component({
  selector: 'app-form-parqueo',
  templateUrl: './form-parqueo.component.html',
  styleUrls: ['./form-parqueo.component.scss']
})
export class FormParqueoComponent implements OnInit {
  @Output() list = new EventEmitter()
  form: FormGroup
  isSave = false
  tipoVehiculo: any[] = []
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 30};
  seconds = true;
  isSearch = false
  constructor(public modalService: NgbModal, private parqueoService: ParqueoService, private tipoVehiService: TipoVehiculoService,
    private fb: FormBuilder, private serviceAdmin: AdminService) {
      this.validateForm()
    }

  ngOnInit(): void {
    this.getipoVehiculo()
  }
  ingresar () {
    if (this.form.valid) {
      const persona: PersonaRequest = {
        name: this.canpoNombre.value,
        number: this.canpoDni.value,
        phone: this.canpoTelefono.value,
        addres: this.form.get("direccion").value,
        type_person: '1'
      }
      const tipo : TipoVehiculoRequest = {
        id: this.canpoTipoVehiculo.value
      }
      const request : VehiculoRequest = {
        license_plate: this.canpoPlaca.value,
        cedula: this.canpoCedula.value,
        type_vehicle: tipo,
        person: persona,
        check_in_time: this.canpoHoraIngreso.value
      }
      this.isSave = true
      this.parqueoService.save(request).subscribe(res => {
        if (res.success) {
          MethodComuns.toastNotificacion('success', res.message)
          this.isSave = false
          this.modalService.dismissAll()
          this.form.reset()
          this.list.emit()
        } else {
          MethodComuns.toastNotificacion('error', res.message)
          this.isSave = false
        }
      }, error => {
        MethodComuns.toastNotificacion('error', error.message)
        this.isSave = false
      })
    }
  }

  getipoVehiculo() {
    this.tipoVehiService.getAll().subscribe(res => {
      this.tipoVehiculo = res
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    })
  }
  validateForm () {
    this.form = this.fb.group({
      dni: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nombre: [null, [Validators.required]],
      telefono: [null, [Validators.minLength(9), Validators.maxLength(9)]],
      direccion: [null],
      placa: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      cedula: [null, [Validators.required]],
      tipoVehiculo: [null, [Validators.required]],
      horaIngreso: [null, [Validators.required]],
    })
  }
  get canpoPlaca() {
    return this.form.get("placa")
  }
  get canpoCedula() {
    return this.form.get("cedula")
  }
  get canpoTipoVehiculo() {
    return this.form.get("tipoVehiculo")
  }
  get canpoHoraIngreso() {
    return this.form.get("horaIngreso")
  }
  get canpoDni() {
    return this.form.get("dni")
  }
  get canpoNombre() {
    return this.form.get("nombre")
  }
  get canpoTelefono() {
    return this.form.get("telefono")
  }
  search () {
    if (this.canpoDni.value && this.canpoDni.value.length >= 8) {
      this.isSearch = true
      this.serviceAdmin.buscarReniec(this.canpoDni.value).subscribe(res => {
        if (res.success) {
          this.canpoNombre.setValue(res.data.nombre_completo)
          MethodComuns.toastNotificacion('success', "Datos encontrados")
        } else {
          MethodComuns.toastNotificacion('error', res.message)
        }
      }, error => {
        MethodComuns.toastNotificacion('error', error.message)
      }, () => {
        this.isSearch = false
      })
    } else {
      MethodComuns.toastNotificacion('error', "El campo dni es requerido, debe tener minimo y maximo 8 digitos")
    }
  }
}
