import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MethodComuns} from "../../../utils/method"
import {AdminService} from "../../../core/service/admin/admin.service"
import { UsuarioRequest } from '../../../core/request/usuario.request';
import { PersonaRequest } from '../../../core/request/persona.request';
@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {
  form: FormGroup
  @Input() title:string
  @Input() usuario: UsuarioRequest
  @Output() list = new EventEmitter()
  isSearch = false
  isSave = false
  value = ''
  text: ''
  count = 0
  limit = 9
  isEdit = false
  perfil = [
    {
      name: "Administrador",
      id: "1"
    },
    {
      name: "Empleado",
      id: "2"
    }
  ]
  constructor(public modalService: NgbModal, private fb: FormBuilder, private serviceAdmin: AdminService) {
    this.validateForm()
  }
  ngOnInit(): void {
    if (this.usuario && Object.keys(this.usuario).length > 0 && this.usuario.id) {
      this.edit()
      this.isEdit = true
    }
  }
  edit() {
    this.form.patchValue({
      correo: this.usuario.email,
      perfil: this.usuario.role.toString(),
      dni: this.usuario.person.number,
      nombre: this.usuario.person.name,
      telefono: this.usuario.person.phone,
      direccion: this.usuario.person.addres,
      type_person: "1",
    })
  }
  validateForm () {
    this.form = this.fb.group({
      correo: [null, [Validators.required, Validators.email]],
      //password: [null, [Validators.required]],
      password: [null],
      perfil: [null, [Validators.required]],
      dni: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nombre: [null, [Validators.required]],
      telefono: [null, [Validators.minLength(9), Validators.maxLength(9)]],
      direccion: [null],
    })
  }
  get canpoCorreo() {
    return this.form.get("correo")
  }
  get canpoPassword() {
    return this.form.get("password")
  }
  get canpoPerfil() {
    return this.form.get("perfil")
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
    const request : UsuarioRequest = {
      email: this.canpoCorreo.value,
      password: this.canpoPassword.value,
      role: this.canpoPerfil.value,
      person: persona
    }
    this.isSave = true
    if(this.form.valid) {
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
