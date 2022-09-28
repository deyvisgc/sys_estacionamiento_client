import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import {PrimeNGConfig} from "primeng/api";
import {getFormatTraslate} from 'src/app/views/system/utils/utilitarios';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'CoreUI Free Angular Admin Template';
  es = {};
  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private config: PrimeNGConfig
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.es = getFormatTraslate(this.es);
    this.config.setTranslation(
      this.es
    );
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
