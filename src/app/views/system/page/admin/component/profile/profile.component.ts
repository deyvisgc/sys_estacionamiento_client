import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { LoginService } from './../../../../core/service/auth/login.service';
import { AdminService } from './../../../../core/service/admin/admin.service';
import { MethodComuns } from './../../../../utils/method';
import { PersonaRequest } from './../../../../core/request/persona.request';
import { UsuarioRequest } from './../../../../core/request/usuario.request';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup
  formPassword: FormGroup
  active = 'top';
  values1: string[];
  info: any
  rol: any[] = []
  isSave = false
  userName = ''
  idUsers = this.loginService.getUsers()
  isChange = false
  constructor( private fb:FormBuilder, private loginService: LoginService, private adminService: AdminService) {
    this.validateForm()
    this.validateChangePassword()
  }
  validateForm() {
    this.form = this.fb.group({
      nombre: [ null ,[Validators.required]],
      telefono: [ null ,[Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      dni: [ null ,[Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      correo: [ null ,[Validators.required, Validators.email]],
      direccion: [null],
      rol:[{value: null, disabled: true}, [Validators.required]],
      username: [null, [Validators.required]]
    })
  }
  validateChangePassword() {
    this.formPassword = this.fb.group({
      oldPassword: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmarPassword: [null, [Validators.required]],
    },
    {
      validators: this.validarQueSeanIguales
    })
  }
  change() {
    if (this.formPassword.valid) {
      this.isChange = true
      this.loginService.changePasswordProfile(this.campoOldPassword.value, this.campoPassword.value, this.idUsers.username)
         .subscribe(
          {
            next:(res) => {
              MethodComuns.toastNotificacion("success", res.message)
              this.isChange = false
              this.formPassword.reset()
            },
            error:(err) => {
              MethodComuns.toastNotificacion("error", err.message)
              this.isChange = false
            }
          }
      )
    } else {
      this.formPassword.markAllAsTouched()
    }
  }
  validarQueSeanIguales(control: FormGroup): ValidationErrors | null {
    const password = control.get('password');
    const confirmarPassword = control.get('confirmarPassword');
    return password.value === confirmarPassword.value ? null : { 'noSonIguales': true };
  }
  checarSiSonIguales(): boolean {
    return this.formPassword.hasError('noSonIguales')
  }
  get campoOldPassword () {
    return this.formPassword.get("oldPassword")
  }
  get campoPassword () {
    return this.formPassword.get("password")
  }
  get confirmarPassword () {
    return this.formPassword.get("confirmarPassword")
  }

  ngOnInit(): void {
    this.getRol()
    this.profile()
  }

 get campoNombre() {
  return this.form.get("nombre")
 }
 get campoTelefono() {
  return this.form.get("telefono")
 }
 get campoDni() {
  return this.form.get("dni")
 }
 get campoCorreo() {
  return this.form.get("correo")
 }
 get campoDireccion() {
  return this.form.get("direccion")
 }
 get campoRol() {
  return this.form.get("rol")
 }
 get campoUsername() {
  return this.form.get("username")
 }
 getRol() {
  this.adminService.getRol().subscribe(res => {
    this.rol = res
  }, error => {
    MethodComuns.toastNotificacion('error', error.message)
  }, () => {
  })
}
  profile() {
    this.adminService.getById(this.idUsers.id_users).subscribe({
      next: (res) => {
        this.userName = res.user_name
        this.form.patchValue({
          nombre: res.person.name,
          telefono: res.person.phone,
          dni: res.person.number,
          correo: res.person.gmail,
          direccion: res.person.addres,
          rol: res.role.map((r: any) => r.id),
          username: res.user_name
        })
      }, 
      error: (err) => {
        MethodComuns.toastNotificacion('error', err.message)
      }
    })
  }
  guardar () {
    const persona: PersonaRequest = {
      name: this.campoNombre.value,
      number: this.campoDni.value,
      phone: this.campoTelefono.value,
      addres: this.campoDireccion.value,
      type_person: '0',
      gmail: this.campoCorreo.value
    }
    const request : UsuarioRequest = {
      user_name: this.campoUsername.value,
      person: persona,
      id: this.idUsers.id_users
    }
    if(this.form.valid) {
      this.isSave = true
      this.adminService.update(request).subscribe(res => {
        if (res.success) {
          MethodComuns.toastNotificacion('success', res.message)
          this.isSave = false
          this.profile()
        } else {
          MethodComuns.toastNotificacion('error', res.message)
          this.isSave = false
        }
      }, error => {
        MethodComuns.toastNotificacion('error', error.message)
        this.isSave = false
      })
    }
    this.form.markAllAsTouched()
  }
}
