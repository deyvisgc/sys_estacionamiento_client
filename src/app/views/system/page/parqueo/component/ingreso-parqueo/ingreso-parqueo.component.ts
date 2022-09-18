import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { PersonaRequest } from 'src/app/views/system/core/request/persona.request';
import { TipoVehiculoRequest } from 'src/app/views/system/core/request/tipoVehiculo.request';
import { UsuarioRequest } from 'src/app/views/system/core/request/usuario.request';
import { VehiculoRequest } from 'src/app/views/system/core/request/vehiculo.request';
import { AdminService } from 'src/app/views/system/core/service/admin/admin.service';
import { ParqueoService } from 'src/app/views/system/core/service/parqueo/parqueo.service';
import { TipoVehiculoService } from 'src/app/views/system/core/service/parqueo/tipo-vehiculo.service';
import { MethodComuns } from 'src/app/views/system/utils/method';

@Component({
  selector: 'app-form-parqueo',
  templateUrl: './ingreso-parqueo.component.html',
  styleUrls: ['./ingreso-parqueo.component.scss']
})
export class IngresoParqueoComponent implements OnInit {
  @Output() list = new EventEmitter()
  @Input() parqueo: VehiculoRequest
  @Input() title: string
  form: FormGroup
  isSave = false
  tipoVehiculo: any[] = []
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 30};
  seconds = true;
  isSearch = false
  isEdit = false
  constructor(public modalService: NgbModal, private parqueoService: ParqueoService, private tipoVehiService: TipoVehiculoService,
    private fb: FormBuilder, private serviceAdmin: AdminService) {
      this.validateForm()
    }

  ngOnInit(): void {
    this.getipoVehiculo()
    if (this.parqueo && Object.keys(this.parqueo).length > 0) {
      this.edit()
      this.isEdit = true
    }
  }
  edit() {
    this.form.patchValue({
      dni: this.parqueo.person.number,
      telefono: this.parqueo.person.phone,
      nombre: this.parqueo.person.name,
      placa: this.parqueo.license_plate,
      cedula: this.parqueo.cedula,
      tipoVehiculo: this.parqueo.type_vehicle.id,
      horaIngreso: this.parqueo.check_in_time,
      type_person: "1",
    })
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
       request.license_plate = request.license_plate.toUpperCase()
       request.cedula = request.cedula.toUpperCase()
      this.isSave = true
      this.parqueoService.ingreso(request).subscribe(res => {
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
  update () {
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
        id: this.parqueo.id,
        license_plate: this.canpoPlaca.value,
        cedula: this.canpoCedula.value,
        type_vehicle: tipo,
        code: this.parqueo.code,
        person: persona,
        check_in_time: this.canpoHoraIngreso.value
      }
       request.license_plate = request.license_plate.toUpperCase()
       request.cedula = request.cedula.toUpperCase()
      this.isSave = true
      this.parqueoService.update(request).subscribe(res => {
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
