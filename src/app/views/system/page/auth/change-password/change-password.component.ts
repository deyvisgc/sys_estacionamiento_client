import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoginService } from '../../../core/service/auth/login.service';
import { MethodComuns } from '../../../utils/method';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup
  isChange = false
  token: string
  constructor( private fb: FormBuilder, private activateRouter: ActivatedRoute, private authService: LoginService, 
    private router: Router) {
    this.validarForm()
  }

  ngOnInit(): void {
    this.activateRouter.params.subscribe({
      next: (res: any) => {
        if(res && res.token) {
          this.token = res.token
        }
      }
    })
  }
  change() {
    if (this.form.valid) {
      this.isChange = true
      this.authService.changePassword(this.campoPassword.value, this.token)
         .subscribe(
          {
            next:(res) => {
              MethodComuns.toastNotificacion("success", res.message)
              this.isChange = false
              this.router.navigate(['/login'])
            },
            error:(err) => {
              MethodComuns.toastNotificacion("error", err.message)
              this.isChange = false
            }
          }
      )
    }
  }
  validarForm() {
    this.form = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmarPassword: [null, [Validators.required]],
    },
    {
      validators: this.validarQueSeanIguales
    })
  }
  validarQueSeanIguales(control: FormGroup): ValidationErrors | null {
    const password = control.get('password');
    const confirmarPassword = control.get('confirmarPassword');
    return password.value === confirmarPassword.value ? null : { 'noSonIguales': true };
  }
  checarSiSonIguales(): boolean {
    return this.form.hasError('noSonIguales')
  }
  get campoPassword () {
    return this.form.get("password")
  }
  get confirmarPassword () {
    return this.form.get("confirmarPassword")
  }
}
