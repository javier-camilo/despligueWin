import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPoblacionComponent } from './consultar-poblacion.component';

describe('ConsultarPoblacionComponent', () => {
  let component: ConsultarPoblacionComponent;
  let fixture: ComponentFixture<ConsultarPoblacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarPoblacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarPoblacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
