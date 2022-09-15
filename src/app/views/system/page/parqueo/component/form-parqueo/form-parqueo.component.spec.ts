import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormParqueoComponent } from './form-parqueo.component';

describe('FormParqueoComponent', () => {
  let component: FormParqueoComponent;
  let fixture: ComponentFixture<FormParqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormParqueoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
