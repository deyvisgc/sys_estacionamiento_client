import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehiculoRequest } from 'src/app/views/system/core/request/vehiculo.request';
import { ParqueoService } from 'src/app/views/system/core/service/parqueo/parqueo.service';
@Component({
  selector: 'app-ticket-parqueo',
  templateUrl: './ticket-parqueo.component.html',
  styleUrls: ['./ticket-parqueo.component.scss']
})
export class TicketParqueoComponent implements OnInit {
  @Input() vehiculo: VehiculoRequest
  constructor(public modalService: NgbModal, private parqueoService: ParqueoService) { }

  ngOnInit(): void {
  }
}
