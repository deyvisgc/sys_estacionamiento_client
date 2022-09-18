import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoParqueoComponent } from './ingreso-parqueo.component';

describe('FormParqueoComponent', () => {
  let component: IngresoParqueoComponent;
  let fixture: ComponentFixture<IngresoParqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoParqueoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
