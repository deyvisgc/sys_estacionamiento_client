import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule,
  WidgetModule
} from '@coreui/angular';
import { ElModule } from 'element-angular';
import { IconModule } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbCollapse, NgbModal, NgbModalModule, NgbModule, NgbTimepicker, NgbToast, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
//import { FilterPipe } from '../utils/filter.pipe';
import { SoloNumeroDirective } from '../utils/solo-numero.directive';
import { NumberDecimalsDirective } from '../utils/number-decimals.directive';
import { NgxPrintModule } from 'ngx-print';
import {primeNgModule} from "src/app/views/system/app-primeng.module";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [SoloNumeroDirective, NumberDecimalsDirective],
  imports: [
    NgxPrintModule,
    NgSelectModule,
    CommonModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    NgbModalModule,
    WidgetModule,
    NgbModule,
    primeNgModule,
    TagModule,
    
    Ng2SearchPipeModule
  ],
  exports: [
    NgxPrintModule,
    SoloNumeroDirective,
    NumberDecimalsDirective,
    NgSelectModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    NgbModalModule,
    WidgetModule,
    NgbModule,
    primeNgModule,
    TagModule,
    Ng2SearchPipeModule
  ]
})
export class SharedSystemModule { }
