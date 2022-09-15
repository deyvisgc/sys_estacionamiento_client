import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParqueoComponent } from './list-parqueo.component';

describe('ListParqueoComponent', () => {
  let component: ListParqueoComponent;
  let fixture: ComponentFixture<ListParqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParqueoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
