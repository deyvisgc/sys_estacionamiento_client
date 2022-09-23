import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/views/system/core/service/auth/login.service';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit  {

  public navItems = navItems;
  usuario: any
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private loginService: LoginService) {}
  ngOnInit(): void {
    const token = this.loginService.getUsers()
    this.usuario = token.username
  }


}
