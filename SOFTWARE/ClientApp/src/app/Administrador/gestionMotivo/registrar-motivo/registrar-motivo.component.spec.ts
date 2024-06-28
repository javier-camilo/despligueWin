import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMotivoComponent } from './registrar-motivo.component';

describe('RegistrarMotivoComponent', () => {
  let component: RegistrarMotivoComponent;
  let fixture: ComponentFixture<RegistrarMotivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarMotivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarMotivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
