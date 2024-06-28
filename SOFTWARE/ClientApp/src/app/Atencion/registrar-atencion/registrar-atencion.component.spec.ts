import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAtencionComponent } from './registrar-atencion.component';

describe('RegistrarAtencionComponent', () => {
  let component: RegistrarAtencionComponent;
  let fixture: ComponentFixture<RegistrarAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarAtencionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
