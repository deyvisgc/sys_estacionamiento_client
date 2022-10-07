import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { LoginService } from '../../../core/service/auth/login.service';
import { MethodComuns } from '../../../utils/method';

@Component({
  selector: 'app-page-change-password',
  templateUrl: './page-change-password.component.html',
  styleUrls: ['./page-change-password.component.scss']
})
export class PageChangePasswordComponent implements OnInit {
  form: FormGroup
  msgs1: Message[];
  isSend = false
  constructor(private fb: FormBuilder, private authService: LoginService) {
    this.form = this.fb.group({
      correo: [null, [Validators.email, Validators.required]],
    })
  }
  ngOnInit(): void {

  }
  get campoCorreo() {
    return this.form.get("correo")
  }
  send() {
    if (this.form.valid) {
      this.isSend = true
      this.msgs1 = [];
      this.authService.sendEmail(this.campoCorreo.value)
         .subscribe(
          {
            next:(res) => {
              this.msgs1 = [ {severity:'success', detail:res.message}];
              this.isSend = false
            },
            error:(err) => {
              MethodComuns.toastNotificacion("error", err.message)
              this.isSend = false
            }
          }
      )
    }
  }
}
