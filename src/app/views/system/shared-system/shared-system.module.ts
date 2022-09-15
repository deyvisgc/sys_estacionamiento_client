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
import { NgbModal, NgbModalModule, NgbTimepicker, NgbToast, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from '../utils/filter.pipe';
import { SoloNumeroDirective } from '../utils/solo-numero.directive';
@NgModule({
  declarations: [SoloNumeroDirective, FilterPipe],
  imports: [
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
    WidgetModule
  ],
  exports: [
    FilterPipe,
    SoloNumeroDirective,
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
    WidgetModule
  ]
})
export class SharedSystemModule { }
