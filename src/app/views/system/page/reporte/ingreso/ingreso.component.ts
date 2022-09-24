import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})
export class IngresoComponent implements OnInit {

  constructor() { }
  public isCollapsed = true;
  textFind: any
  page = 0
  size = 10
  order = 'id'
  asc = true
  isFirst = false
  isLast = false
  totalPages: Array<number>
  ingresos:any[] = []
  ngOnInit(): void {
  }
  fetchUsers(): void  {
    
  }
  sort(): void {
    this.asc = !this.asc;
    this.fetchUsers();
  }
  rewind(): void  {
    if (!this.isFirst) {
      this.page--
      this.fetchUsers()
    }
  }
  setPage(page: number): void {
    this.page = page
    this.fetchUsers()
  }
  forward (): void  {
    if (!this.isLast) {
      this.page++
      this.fetchUsers()
    }
  }
  setOrder(order: string): void {
    this.order = order;
    this.fetchUsers();
  }
}
