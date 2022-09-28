import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ChipsModule } from 'primeng/chips';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [],
  exports: [
    TableModule,
    PanelMenuModule,
    ProgressSpinnerModule,
    DialogModule,
    AccordionModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FieldsetModule,
    CheckboxModule,
    ListboxModule,
    ToastModule,
    RadioButtonModule,
    PanelModule,
    InputTextModule,
    TabViewModule,
    SidebarModule,
    FileUploadModule,
    TooltipModule,
    PaginatorModule,
    MultiSelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChipsModule
  ],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class primeNgModule { }
