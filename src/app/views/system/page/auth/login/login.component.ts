import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../../core/request/login.request';
import { MethodComuns } from '../../../utils/method';
import {LoginService} from './../../../core/service/auth/login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  isLogin = false
  constructor(private fb: FormBuilder, private authService: LoginService) {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  ngOnInit(): void {

  }

  login() {
    if (this.form.valid) {
      const request: LoginRequest = {
       usuario: this.campoUserName.value,
       clave: this.campoPassword.value 
      }
      this.isLogin = true
      this.authService.login(request).subscribe( res =>
        {},
        () => {
          this.isLogin = false
        })
    } else {
      this.form.markAllAsTouched()
    }
  }
  get campoUserName() {
    return this.form.get("username")
  }
  get campoPassword() {
    return this.form.get("password")
  }

}
