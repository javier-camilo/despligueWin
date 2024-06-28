import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPoblacionComponent } from './registrar-poblacion.component';

describe('RegistrarPoblacionComponent', () => {
  let component: RegistrarPoblacionComponent;
  let fixture: ComponentFixture<RegistrarPoblacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPoblacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPoblacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
