import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaParqueoComponent } from './salida-parqueo.component';

describe('SalidaParqueoComponent', () => {
  let component: SalidaParqueoComponent;
  let fixture: ComponentFixture<SalidaParqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidaParqueoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidaParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
