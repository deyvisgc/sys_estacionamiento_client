import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {MethodComuns} from "../../../../utils/method";
import {AdminService} from "../../../../core/service/admin/admin.service"
import { UsuarioRequest } from '../../../../core/request/usuario.request';
import { PersonaRequest } from '../../../../core/request/persona.request';
@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {
  form: FormGroup
  @Input() title:string
  @Input() isRol: boolean
  @Input() usuario: UsuarioRequest
  @Output() list = new EventEmitter()
  isSearch = false
  isSave = false
  value = ''
  text: ''
  count = 0
  limit = 9
  isEdit = false
  rol: any[] = []
  rol2: any[] = []
  constructor(public modalService: NgbModal, private fb: FormBuilder, private serviceAdmin: AdminService) {
    this.validateForm()
  }
  ngOnInit(): void {
    this.getRol()
    if (this.usuario && Object.keys(this.usuario).length > 0 && this.usuario.id) {
      this.edit()
      this.isEdit = true
    }
  }
  getRol() {
    this.serviceAdmin.getRol().subscribe(res => {
      this.rol = res
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    }, () => {
    })
  }
  edit() {
    const rol = this.usuario.role.map((e: any) => {
      return e.id
    });
    console.log("rol", rol)
    this.form.patchValue({
      id: this.usuario.id,
      user_name: this.usuario.user_name,
      dni: this.usuario.person.number,
      nombre: this.usuario.person.name,
      telefono: this.usuario.person.phone,
      direccion: this.usuario.person.addres,
      rol: rol,
      type_person: "1",
    })
  }
  validateForm () {
    this.form = this.fb.group({
      id: [null],
      user_name: [null, Validators.required],
      //password: [null, [Validators.required]],
      password: [null, Validators.required],
      rol: [null, [Validators.required]],
      dni: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nombre: [null, [Validators.required]],
      telefono: [null, [Validators.minLength(9), Validators.maxLength(9)]],
      direccion: [null],
    })
    this.form.valueChanges.subscribe(res => {
      if (res.id) {
        this.canpoPassword.setValidators(null)
      } else {
        this.canpoPassword.setValidators(Validators.required)
      }
      
      this.canpoPassword.updateValueAndValidity({ emitEvent: false })
    })
  }
  get canpoUsername() {
    return this.form.get("user_name")
  }
  get canpoCorreo() {
    return this.form.get("correo")
  }
  get canpoPassword() {
    return this.form.get("password")
  }
  get canpoRol() {
    return this.form.get("rol")
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
  guardar () {
    const persona: PersonaRequest = {
      name: this.canpoNombre.value,
      number: this.canpoDni.value,
      phone: this.canpoTelefono.value,
      addres: this.form.get("direccion").value,
      type_person: '0'
    }
    let rol = []
    if(this.canpoRol.value) {
       rol = this.canpoRol.value.map((e: any) => {
        return { id: e}
      });
    }
    const request : UsuarioRequest = {
      user_name: this.canpoUsername.value,
      password: this.canpoPassword.value,
      person: persona,
      role: rol
    }
    if(this.form.valid) {
      this.isSave = true
      if (this.usuario && Object.keys(this.usuario).length > 0 && this.usuario.id) {
        request.id = this.usuario.id
        this.update(request)
      } else {
        this.create(request)
      }
    }
    this.form.markAllAsTouched()
  }
  create(usuario: UsuarioRequest) {
    this.serviceAdmin.save(usuario).subscribe(res => {
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
  update(usuario: UsuarioRequest) {
    this.serviceAdmin.update(usuario).subscribe(res => {
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
