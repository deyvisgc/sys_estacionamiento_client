import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketParqueoComponent } from './ticket-parqueo.component';

describe('TicketParqueoComponent', () => {
  let component: TicketParqueoComponent;
  let fixture: ComponentFixture<TicketParqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketParqueoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
