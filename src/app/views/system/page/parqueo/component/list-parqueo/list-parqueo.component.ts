import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MethodComuns } from '../../../../utils/method';
import { ParqueoService } from '../../../../core/service/parqueo/parqueo.service';
@Component({
  selector: 'app-list-parqueo',
  templateUrl: './list-parqueo.component.html',
  styleUrls: ['./list-parqueo.component.scss']
})
export class ListParqueoComponent implements OnInit {

  constructor(private modalService: NgbModal, private parqueoService: ParqueoService) { }
  list: any[] = []
  ngOnInit(): void {
    this.getParqueo()
  }
  getParqueo() {
    this.parqueoService.getAll().subscribe(res => {
      this.list = res
    }, error => {
      MethodComuns.toastNotificacion('error', error.message)
    })
  }
  openModal(model: any) {
    this.modalService.open(model, {size: 'lg'})
  }

}
