import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarMotivoComponent } from './consultar-motivo.component';

describe('ConsultarMotivoComponent', () => {
  let component: ConsultarMotivoComponent;
  let fixture: ComponentFixture<ConsultarMotivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarMotivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarMotivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
